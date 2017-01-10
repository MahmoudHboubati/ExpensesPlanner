import {Component} from '@angular/core';
import {ModalController, NavController} from 'ionic-angular';
import {AuthProviders, AuthMethods, FirebaseAuthState, FirebaseListObservable} from 'angularfire2';
import {ExpensesService} from '../../app/core/services/expenses.service';
import {UserSettingsService} from '../../app/core/services/userSettings.service';

import {FormGroup, FormControl, Validators} from '@angular/forms';

import {LoginPage} from '../login/login';
import {PlanDistribution} from '../planDistribution/planDistribution';
import {AuthService} from '../../app/core/services/auth.service';

import {IChartData, ChartData, LineChart, ChartDataSet, IChartPoint} from '../../app/components/charts/chartjs.data';
import {ChartOptions} from '../../app/components/charts/chartjs.options';

import {Observable} from 'rxjs';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/map';
import {GeneralPage} from '../base/base.page';

@Component({
  templateUrl: 'planInitialize.html',
  providers: [ExpensesService, UserSettingsService, AuthService]
})
export class PlanInitialize extends GeneralPage {

  // Doughnut
  public doughnutChartLabels: string[] = ['Expenses', 'Keeps'];
  public doughnutChartData: number[] = [];
  public doughnutChartType: string = 'pie';
  public lineChartLegend:boolean = true;

  form: FormGroup;
  data: any;

  public chartColors: Array<any> = [
    {
      backgroundColor: ['rgba(255,0,0,.48)', 'rgba(49,153,0,.59)'],
    }];

  lineChart: Observable<LineChart>;
  cOptions: Observable<ChartOptions>;

  constructor(public navCtrl: NavController, private modal: ModalController,
    private expensesService: ExpensesService, private userSettings: UserSettingsService,
    authService: AuthService) {

    super("Initilization", authService);

    this.form = this.buildControls();

    this.buildChart();
  }

  buildChart() {
    this.form.valueChanges
      .debounceTime(500)
      .map(next => {
        this.doughnutChartData = [this.expenses, this.incomes - this.expenses];
      }).subscribe();
  }

  incomes: number = 0;
  expenses: number = 0;

  buildControls(): FormGroup {
    return new FormGroup({
      incomes: new FormControl(0, Validators.required),
      expenses: new FormControl(0, Validators.required)
    });
  }

  next() {
    if (this.save()) {
      this.navCtrl.push(PlanDistribution);
    }
  }

  save() {
    //saved
    // if (this.authService.isAuthenticated()) {
    this.userSettings.addOrUpdate({
      id: '',
      createdAt: new Date(),
      expenses: this.expenses,
      income: this.incomes,
      createdBy: this.user.uid,
      isActive: true
    });
    // } else {
    //   this.broadCastAuthStatus();
    // }

    return true;
  }
}

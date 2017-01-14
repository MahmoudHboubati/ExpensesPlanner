import {Component, OnInit} from '@angular/core';
import {NavController} from 'ionic-angular';
import {FirebaseListObservable} from 'angularfire2';
import {MainHeaderNavbarComponent} from '../../app/components/headerNavbar/mainHeaderNavbar.component';
import {PlannedExpensesService} from '../../app/core/services/plannedExpenses.service';
import {IPlannedExpenses} from '../../app/core/domain/plannedExpenses.entity';
import {GeneralPage} from '../base/base.page';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import {AuthService} from '../../app/core/services/auth.service';

@Component({
  templateUrl: 'planDistribution.html',
  providers: [PlannedExpensesService]
})
export class PlanDistribution extends GeneralPage implements OnInit {

  amount: number;
  description: string;
  form: FormGroup;
  data: any;
  keeps: number;

  plannedExpenses: FirebaseListObservable<any[]>;

  months: any[] = ["Expenses"];
  backgroundColor: string[] = [];
  chartDDD: any;

  // Doughnut
  public doughnutChartLabels: string[] = ['Expenses', 'Keeps'];
  public doughnutChartData: number[] = [];
  public doughnutChartType: string = 'bar';
  public doughnutChartLegend:boolean = true;

  constructor(public navCtrl: NavController,
    authService: AuthService,
    private plannedExpensesService: PlannedExpensesService) {

    super("Plan Distribution", authService);

    this.form = this.buildControls();

  }

  ngOnInit() {
    this.buildChart();
  }

  buildControls(): FormGroup {
    return new FormGroup({
      amount: new FormControl(0, Validators.required),
      description: new FormControl(0, Validators.required)
    });
  }

  add() {
    this.plannedExpensesService.add({
      createdAt: new Date(),
      amount: this.amount,
      description: this.description,
      createdBy: this.user.uid,
      startDate: new Date(),
      endDate: null,
      isActive: true,
      repeateEveryId: ''
    })
  }

  buildChart() {

    this.plannedExpenses = this.plannedExpensesService.get();

    let expensesInfo = this.plannedExpensesService.getObject().subscribe(x=>{

      this.keeps = x.incomes - x.expenses;
      this.doughnutChartLabels.push('Keep')
      this.doughnutChartData.push(this.keeps)

    });

    this.plannedExpenses.subscribe((x: any) => {

      this.doughnutChartLabels = []
      this.doughnutChartData = []

      for (let i of x) {
        this.doughnutChartLabels.push(i.description);
        this.doughnutChartData.push(i.amount);
      }
      console.log('x1:')
      console.log(x)
    });
  }
}

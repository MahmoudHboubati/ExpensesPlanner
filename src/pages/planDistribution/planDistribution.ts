import {Component, OnInit} from '@angular/core';
import {ModalController, NavController} from 'ionic-angular';
import {FirebaseListObservable} from 'angularfire2';
import {MainHeaderNavbarComponent} from '../../app/components/headerNavbar/mainHeaderNavbar.component';
import {FormGroup} from '@angular/forms';
import {UserSettingsService} from '../../app/core/services/userSettings.service';
import {PlannedExpensesService} from '../../app/core/services/plannedExpenses.service';
import {IPlannedExpenses} from '../../app/core/domain/plannedExpenses.entity';
import {GeneralPage} from '../base/base.page';

import {AuthService} from '../../app/core/services/auth.service';

import {ChartDirective} from '../../app/components/charts/ChartJS.directive';
import {ChartData, DoughnutChart, ChartDataSet} from '../../app/components/charts/chartjs.data';
import {ChartOptions, ChartOptionsScales, ChartAxe} from '../../app/components/charts/chartjs.options';
import {Observable} from 'rxjs';

@Component({
  templateUrl: 'planDistribution.html',
  //directives: [MainHeaderNavbarComponent, ChartDirective],
  providers: [UserSettingsService, PlannedExpensesService]
})
export class PlanDistribution extends GeneralPage implements OnInit {

  amount: number;
  // form: FormGroup;
  data: any;
  userSettings: any;
  plannedExpenses: FirebaseListObservable<any[]>;

  months: any[] = ["Expenses"];
  backgroundColor: string[] = [];
  doughnutChartObs: Observable<DoughnutChart>;
  cOptions: Observable<ChartOptions>;
  doughnutChart: DoughnutChart;
  chartDDD: any;

  // lineChart
  public lineChartData: Array<any> = [
    { data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A' },
    { data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B' },
    { data: [18, 48, 77, 9, 100, 27, 40], label: 'Series C' }
  ];
  public lineChartLabels: Array<any> = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
  public lineChartOptions: any = {
    animation: false,
    responsive: true
  };
  public lineChartLegend: boolean = true;
  public lineChartType: string = 'line';

  constructor(public navCtrl: NavController, private modal: ModalController,
    private userSettingsService: UserSettingsService, authService: AuthService, private plannedExpensesService: PlannedExpensesService) {

    super("Plan Distribution", authService);

    this.userSettingsService.getUserSettings(this.user).subscribe((snap) => {
      this.userSettings = snap;
    });

    this.InitializeChartOptions();

    this.buildChart();
  }

  InitializeChartOptions() {
    var cOptions = new ChartOptions();
    cOptions.scales = new ChartOptionsScales();
    cOptions.scales.yAxes = [new ChartAxe()];

    this.cOptions = Observable.of(cOptions);

    this.doughnutChart = new DoughnutChart(cOptions);

    this.doughnutChartObs = Observable.of(this.doughnutChart);
  }

  ngOnInit() {
  }

  changeChart() {
    console.log('clicked')
    this.doughnutChart = undefined;
  }

  // buildChart() {
  //
  //   var o = new ChartOptions();
  //   o.scales = new ChartOptionsScales();
  //   o.scales.yAxes = [new ChartAxe()];
  //
  //   this.cOptions = Observable.of(o);
  //
  //   this.lineChart = this.form.valueChanges
  //     .debounceTime(500)
  //     .map(next => {
  //
  //       var lc = new LineChart(o);
  //
  //       var incomesData: ChartDataSet = new ChartDataSet();
  //       incomesData.data = [];
  //       incomesData.backgroundColor = "rgba(33, 3, 140,0.2)";
  //       incomesData.label = "incomes";
  //
  //       var expensesData: ChartDataSet = new ChartDataSet();
  //       expensesData.data = [];
  //       expensesData.backgroundColor = "rgba(191, 27, 27,0.6)";
  //       expensesData.label = "expenses";
  //
  //       var keptData: ChartDataSet = new ChartDataSet();
  //       keptData.data = [];
  //       keptData.backgroundColor = "rgba(58, 174, 50,0.6)";
  //       keptData.label = "keep";
  //
  //       var acumData: ChartDataSet = new ChartDataSet();
  //       acumData.data = [];
  //       acumData.backgroundColor = "rgba(58, 174, 50,0.4)";
  //       acumData.label = "keep (acum)";
  //
  //       let acum: number = 0;
  //
  //       this.months.forEach((e) => {
  //         incomesData.data.push({ x: e, y: this.incomes });
  //         expensesData.data.push({ x: e, y: this.expenses });
  //         keptData.data.push({ x: e, y: this.incomes - this.expenses });
  //
  //         if (this.months[new Date().getMonth()] == e) {
  //           acum += +this.initial;
  //         }
  //
  //         acum += +this.incomes - +this.expenses;
  //         acumData.data.push({ x: e, y: acum });
  //       });
  //
  //       var total = [incomesData, expensesData, keptData, acumData];
  //
  //       var chartData: ChartData = new ChartData(total, this.months);
  //
  //       lc.data = chartData;
  //
  //       return lc;
  //
  //     });
  // }

  buildChart() {

    this.plannedExpenses = this.plannedExpensesService.get();

    var expensesData: ChartDataSet = new ChartDataSet();
    expensesData.data = [];
    expensesData.backgroundColor = [];
    expensesData.hoverBackgroundColor = [];

    var labelesOfExpenses = [];
    this.months = [];

    this.plannedExpenses.subscribe((v) => {

      this.months = [];

      v.forEach((obj: IPlannedExpenses, index) => {
        expensesData.data.push(obj.amount);
        (<string[]>expensesData.backgroundColor).push("rgba(12,12,12,0." + index + ")");
        (<string[]>expensesData.hoverBackgroundColor).push("rgba(12,12,12,0." + index + 4 + ")");
        this.months.push(obj.description);
      });

      var total: ChartDataSet[] = [];
      total.push(expensesData);
      this.chartDDD = new ChartData(total, this.months);
      this.doughnutChart.data = this.chartDDD;

      console.log('doughnutChart changed');
      console.log(total);
    });
  }

  BuildChartDatasets(): ChartDataSet[] {
    return [];
  }

  public randomize(): void {
    let _lineChartData: Array<any> = new Array(this.lineChartData.length);
    for (let i = 0; i < this.lineChartData.length; i++) {
      _lineChartData[i] = { data: new Array(this.lineChartData[i].data.length), label: this.lineChartData[i].label };
      for (let j = 0; j < this.lineChartData[i].data.length; j++) {
        _lineChartData[i].data[j] = Math.floor((Math.random() * 100) + 1);
      }
    }
    this.lineChartData = _lineChartData;
  }
}

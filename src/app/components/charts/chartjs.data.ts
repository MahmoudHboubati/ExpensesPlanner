import {ChartOptions} from './chartjs.options';
import {Observable} from 'rxjs/Observable';

export interface IChartData {
  datasets: ChartDataSet[];
  labels: any[];
}

export class MultipleDataSetsChartData {
  constructor(public dataSets: ChartDataSet, public labels: any[]) {
  }
}

export abstract class ChartDataBasic {
  public abstract type(): string;
  public data: ChartData;
}

export class LineChart extends ChartDataBasic {
  constructor(public options: ChartOptions) {
    super();
  }

  type(): string {
    return "line";
  }
}

export class DoughnutChart extends ChartDataBasic {
  constructor(public options: ChartOptions) {
    super();
  }

  type(): string {
    return "doughnut";
  }
}

export class PieChart extends ChartDataBasic {
  constructor(public options: ChartOptions) {
    super();
  }

  type(): string {
    return "pie";
  }
}

export class ChartData implements IChartData {
  constructor(public datasets: ChartDataSet[], public labels: any[]) {
  }
}

export class ChartDataSet {
  label: string;
  backgroundColor: string[] | string;
  hoverBackgroundColor: string[] | string;
  data: (IChartPoint| number)[];
}

export interface IChartPoint {
  x: any;
  y?: any;
}

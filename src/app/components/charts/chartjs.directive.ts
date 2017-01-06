import * as Chart from 'chart.js';
import {Directive, ElementRef, Renderer, Input} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {IChartData, ChartDataBasic} from './chartjs.data';
import {AfterViewInit} from '@angular/core';
import {ChartOptions} from './chartjs.options';

@Directive({
  selector: '[chart]'
})
export class ChartDirective implements AfterViewInit {

  @Input()
  chartObservable: Observable<ChartDataBasic>;

  @Input()
  optionsObservable: Observable<ChartOptions>;

  chartData: ChartDataBasic;
  chartOptions: ChartOptions;
  chart: any;

  el: ElementRef;

  constructor(el: ElementRef, renderer: Renderer) {
    this.el = el;
  }

  destroy() {
    if (this.chart) {
      this.chart.destroy();
    }
  }

  ngAfterViewInit() {
    this.chartObservable.subscribe((data: ChartDataBasic) => {
      this.destroy();
      this.renderTheChartOptions(data, this.chartOptions);
    });

    this.optionsObservable.subscribe((options) => {
      this.destroy();
      this.renderTheChartOptions(this.chartData, options);
    });
  }

  renderTheChart() {
    if (this.isDataDefined()) {

      console.log('typeof: ' + typeof this.chartData.data);

      var ctx: any = this.el.nativeElement.getContext("2d");

      console.log(this.chartData.data);

      this.chart = new Chart(ctx, {
        type: this.isDataDefined() ? this.chartData.type() : 'line',
        data: this.isDataDefined() ? this.chartData.data : {},
        options: this.isOptionsDefined() ?  this.chartOptions : {}
      });
    }
  }

  isDataDefined(): boolean {
    return this.chartData ? true : false;
  }
  isOptionsDefined(): boolean {
    return this.chartOptions ? true : false;
  }

  renderTheChartOptions(data, options: ChartOptions): void {
    this.chartOptions = options;
    this.chartData = data;
    this.renderTheChart();
  }
}

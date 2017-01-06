export class ChartOptions {
  scales: ChartOptionsScales;
}

export class ChartOptionsScales {
  yAxes: [ChartAxe]
}

export class ChartAxe {
  beginAtZero: boolean = true;
}

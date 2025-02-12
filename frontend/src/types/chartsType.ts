export interface DonutChartProps {
  data: number[];
  colors: string[];
  centerLabel: string;
}

export interface BarChartProps {
  data: number[];
  labels: string[];
  colors: string[];
  formatLabel?: (value: number) => string;
  maxValue?: number;
}

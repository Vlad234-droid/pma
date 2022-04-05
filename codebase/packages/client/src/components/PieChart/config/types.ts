import { ReportPage } from 'config/enum';

export enum View {
  CHART = 'chart',
  QUANTITY = 'quantity',
}

export type Obj = {
  percent: number;
  title?: string;
};

export type PieChartProps = {
  title?: string;
  data: ReportPage | Array<Obj> | '';
  display: View;
  percentId?: string;
  titleId?: string;
  link?: string;
  readonly Wrapper?: keyof JSX.IntrinsicElements;
  params?: Record<string, string>;
  type?: string;
};

export type PieChartContentProps = Omit<PieChartProps, 'link' | 'Wrapper' | 'params' | 'type'>;

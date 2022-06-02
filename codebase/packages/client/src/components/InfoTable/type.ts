import { ReportPage } from 'config/enum';

export type Obj = {
  percent: number;
  quantity: number;
  title: string;
};

export type InfoTableProps = {
  mainTitle: string;
  data: ReportPage | Array<Obj> | '';
  type?: string;
  preTitle?: string;
  params?: Record<string, string>;
  link?: string;
  readonly Wrapper?: keyof JSX.IntrinsicElements;
  hoverMessage?: string;
  hoverVisibility?: boolean;
};

export type TableContent = Omit<
  InfoTableProps,
  'link' | 'Wrapper' | 'type' | 'params' | 'hoverMessage' | 'hoverVisibility'
>;

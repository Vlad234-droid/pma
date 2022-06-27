export type Item = {
  id: string;
  img: string;
  title: string;
  description: string;
  imgDescription: string;
  link?: string;
  type?: string;
};

export enum DataType {
  MANAGERS = 'managers',
  COLLEAGUES = 'colleagues',
}

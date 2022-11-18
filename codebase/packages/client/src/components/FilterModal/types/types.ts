import { defaultValues } from '../config';

export enum FilterType {
  SELECT_ALL = 'Select All',
}

export type defValuesType = typeof defaultValues;

export type Props = {
  onClose: () => void;
  defaultValues: defValuesType;
  onSubmit: (data) => void;
  savedFilter?: defValuesType;
  loading?: boolean;
};
export type SelectAllProps = {
  onChange: (e: any, value?: string) => any;
  name: string;
  type: string;
  index: string | number;
};

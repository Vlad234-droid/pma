import { Rule, Styles } from 'styles';

export interface FormItem {
  placeholder?: string;
  styles?: Styles | Rule;
}

export type InputProps = FormItem;

export interface TextareaProps extends FormItem {
  rows?: number;
}

import { Rule, Styles } from 'styles';

export interface FormItem {
  placeholder?: string;
  styles?: Styles | Rule;
}

export interface InputProps extends FormItem {}

export interface TextareaProps extends FormItem {
  rows?: number;
}

import { Rule, Styles } from '@dex-ddl/core';

export interface FormItem {
  disabled?: boolean;
  value?: string;
  name?: string;
  placeholder?: string;
  styles?: Styles | Rule;
  onChange?: (e: any) => any;
}

export type InputProps = FormItem

export interface SelectProps extends FormItem {
  options: { value: string; label: string }[] | [];
}

export interface TextareaProps extends FormItem {
  rows?: number;
}

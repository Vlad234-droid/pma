import { Rule, Styles } from '@dex-ddl/core';

export interface FormItem {
  placeholder?: string;
  styles?: Styles | Rule;
  onChange?: (e: any) => any;
}

export type InputProps = FormItem;

export interface TextareaProps extends FormItem {
  rows?: number;
}

import { RefObject } from 'react';
import { Rule, Styles } from '@dex-ddl/core';
import { Ref } from 'react-hook-form';

export interface FormItemProps {
  disabled?: boolean;
  value?: string;
  name?: string;
  placeholder?: string;
  styles?: Styles | Rule;
  onChange?: (e: any, value?: string) => any;
  domRef?: Ref | RefObject<any>;
  isValid?: boolean;
  type?: string;
  id?: string;
  customStyles?: Rule | Styles;
  onFocus?: () => any;
  readonly?: boolean;
}

export type InputProps = FormItemProps;

export interface SelectProps extends FormItemProps {
  options: { value: string; label: string }[] | [];
  getSelected?: (option: any) => void;
}

export interface TextareaProps extends FormItemProps {
  rows?: number;
}

export interface RadioProps extends FormItemProps {
  checked?: boolean;
}

export interface CheckboxProps extends FormItemProps {
  indeterminate?: boolean;
  checked?: boolean;
  disabled?: boolean;
}

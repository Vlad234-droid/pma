import { ChangeEvent, RefObject, SyntheticEvent } from 'react';
import { Rule, Styles } from '@dex-ddl/core';

export interface FormField {
  styles?: Styles | Rule;
  domRef?: RefObject<any>;
  isValid?: boolean;
  customStyles?: Rule | Styles;
  readonly?: boolean;
  onFocus?: () => void;
  placeholder?: string;
  name?: string;
  id?: string;
  disabled?: boolean;
  readOnly?: boolean;
  type?: string;
}

export interface InputField extends FormField {
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: SyntheticEvent<HTMLInputElement>) => void;
  value?: string;
  min?: number;
  defaultValue?: string;
}

export type Option = {
  value: string;
  label: string;
};

export interface SelectField extends FormField {
  name: string;
  options: Array<Option>;
  placeholder: string;
  value?: string;
  onChange: (value: string) => void;
}

export interface TextareaField extends FormField {
  rows?: number;
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  value?: string;
}

export interface RadioField extends InputField {
  checked?: boolean;
}

export interface CheckboxField extends InputField {
  indeterminate?: boolean;
  checked?: boolean;
}

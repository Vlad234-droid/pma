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
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  onChangeDate?: (value) => void;
  onBlur?: (e: SyntheticEvent<HTMLInputElement>) => void;
  value?: string;
  min?: number;
  minDate?: number | string;
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
  //TODO: change any to ChangeEvent when all dropdonwns will be fixed
  onChange: (value: any) => void;
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

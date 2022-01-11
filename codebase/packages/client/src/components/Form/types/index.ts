import { RefObject, SyntheticEvent, ChangeEvent } from 'react';
import { Rule, Styles } from '@dex-ddl/core';
import { Ref } from 'react-hook-form';

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
}

export interface InputField extends FormField {
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: SyntheticEvent<HTMLInputElement>) => void;
  value?: string;
}

export interface SelectField extends FormField {
  options: Array<{ value: string; label: string }>;
  getSelected?: (option: any) => void;
  onChange: (e: SyntheticEvent<HTMLInputElement>) => void;
  value?: string;
}

export interface TextareaField extends FormField {
  rows?: number;
  onChange: (e: SyntheticEvent<HTMLTextAreaElement>) => void;
  value?: string;
}

export interface RadioField extends InputField {
  checked?: boolean;
}

export interface CheckboxField extends InputField {
  indeterminate?: boolean;
  checked?: boolean;
}

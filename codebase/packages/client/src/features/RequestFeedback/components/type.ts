import { RefObject, ChangeEvent } from 'react';
import { Rule, Styles } from '@dex-ddl/core';
import { Ref } from 'react-hook-form';

export interface FormItemProps {
  disabled?: boolean;
  value?: string | undefined;
  name?: string;
  placeholder?: string;
  styles?: Styles | Rule;
  onChange?: (e: any) => void;
  onSearch: (e: ChangeEvent<HTMLInputElement>) => void;
  domRef?: Ref | RefObject<any>;
  isValid?: boolean;
  type?: string;
  id?: string;
  options: Array<any>;
}

export type InputProps = FormItemProps;

import { ChangeEvent, RefObject } from 'react';
import { Rule, Styles } from '@dex-ddl/core';

export interface SearchInputProps<T> {
  disabled?: boolean;
  value?: string;
  name?: string;
  placeholder?: string;
  styles?: Styles | Rule;
  onSearch: (e: ChangeEvent<HTMLInputElement>) => void;
  onChange: (e: any) => void;
  renderOption: (item: any) => JSX.Element;
  domRef?: RefObject<any>;
  isValid?: boolean;
  id?: string;
  options?: Array<T>;
  searchValue?: string;
  selected?: T | null;
  multiple?: boolean;
}

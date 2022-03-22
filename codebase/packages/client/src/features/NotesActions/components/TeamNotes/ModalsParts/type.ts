import { RefObject } from 'react';
import { Rule, Styles } from '@dex-ddl/core';
import { Ref } from 'react-hook-form';

export interface FormItemProps {
  disabled?: boolean;
  value?: string;
  name?: string;
  placeholder?: string;
  styles?: Styles | Rule;

  onChange: (item: any) => void;

  domRef?: Ref | RefObject<any>;
  isValid?: boolean;
  type?: string;
  id?: string;
  options: Array<any>;
  setSelectedPerson?: any;
  setSearchValue?: any;
  searchValue?: string;
  selectedPerson?: PeopleTypes | null;
  multiple?: boolean | undefined;
}
export type PeopleTypes = any;
export type InputProps = FormItemProps;

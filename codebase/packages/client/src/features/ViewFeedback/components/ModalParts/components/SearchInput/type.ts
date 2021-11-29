import { RefObject } from 'react';
import { Rule, Styles } from '@dex-ddl/core';
import { Ref } from 'react-hook-form';
import { PeopleTypes } from '../../type';

export interface FormItemProps {
  disabled?: boolean;
  value?: string;
  name?: string;
  placeholder?: string;
  styles?: Styles | Rule;
  onChange?: (e: any) => any;
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

export type InputProps = FormItemProps;

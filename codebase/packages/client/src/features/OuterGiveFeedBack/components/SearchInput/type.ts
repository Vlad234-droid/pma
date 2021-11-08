import { RefObject } from 'react';
import { Rule, Styles } from '@dex-ddl/core';
import { Ref } from 'react-hook-form';
import { PeopleTypes } from '../../../../features/Feedback/type';

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
  options: { id: number; f_name: string; l_name: string; img: string }[];
  setSelectedPerson?: any;
  setSearchValue?: any;
  searchValue?: string;
  setPeopleFiltered?: any;
  selectedPerson?: PeopleTypes | null;
  multiple?: boolean | undefined;
}

export type InputProps = FormItemProps;

import { RefObject, SetStateAction, Dispatch } from 'react';
import { Rule, Styles } from '@dex-ddl/core';
import { Ref } from 'react-hook-form';
import { PeopleTypes } from '../../../features/Feedback/type';

export interface FormItemProps {
  disabled?: boolean;
  value?: string | undefined;
  name?: string;
  placeholder?: string;
  styles?: Styles | Rule;
  onChange?: (e: any) => any;
  domRef?: Ref | RefObject<any>;
  isValid?: boolean;
  type?: string;
  id?: string;
  options: { id: number; f_name: string; l_name: string; img: string }[];
  setSelectedPersons?: any;
  setSearchValue?: any;
  searchValue?: string;
  setPeopleFiltered?: any;
  selectedPersons?: PeopleTypes[] | null;
  multiple?: boolean | undefined;
  setInputValue?: Dispatch<SetStateAction<string>>;
  setPeople?: Dispatch<SetStateAction<any>>;
}

export interface ButtonsComponentProps {
  isValid: boolean;
  setShowSuccesModal: Dispatch<SetStateAction<boolean>>;
}

export type InputProps = FormItemProps;

import { RefObject, SetStateAction, Dispatch } from 'react';
import { Rule, Styles } from '@dex-ddl/core';
import { Ref, UseFormReturn } from 'react-hook-form';
import { PeopleTypes } from '../type';

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
  setSelectedPersons?: any;
  setInputValue: Dispatch<SetStateAction<string | ''>>;
  options: Array<PeopleTypes>;
}

export interface ButtonsComponentProps {
  isValid: boolean;
  onSubmit: () => void;
  setShowSuccesModal: Dispatch<SetStateAction<boolean>>;
  methods: UseFormReturn;
}

export type InputProps = FormItemProps;

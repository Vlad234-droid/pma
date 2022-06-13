import { PeopleTypes } from '../type';
import { UseFormReturn } from 'react-hook-form';

export type SearchPartProps = {
  setSelectedPerson: any;
  setSearchValue?: any;
  searchValue?: string;
  selectedPerson: PeopleTypes | null;
  methods: UseFormReturn;
  setSearchDate?: (date) => void;
  searchDate?: any;
};

export type SubmitPartProps = {
  selectedPerson: PeopleTypes;
  onChange?: (items) => void;
  searchDate?: any;
};

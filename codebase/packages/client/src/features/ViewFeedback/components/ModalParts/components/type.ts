import { PeopleTypes } from '../type';
import { UseFormReturn } from 'react-hook-form';

export type SearchPartProps = {
  setSelectedPerson: any;
  setSearchValue?: any;
  searchValue?: string;
  selectedPerson: PeopleTypes | null;
  methods: UseFormReturn;
};

export type SubmitPartProps = {
  selectedPerson: PeopleTypes;
};

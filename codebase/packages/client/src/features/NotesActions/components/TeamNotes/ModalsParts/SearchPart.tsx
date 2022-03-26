import React, { FC, Dispatch, SetStateAction, useEffect } from 'react';
import { Item } from 'components/Form';
import { useStyle } from '@dex-ddl/core';
import { UseFormReturn } from 'react-hook-form';
import { SearchInput } from './SearchInput';
import { PeopleTypes } from './type';
import { useSelector } from 'react-redux';
import { ColleaguesActions, colleagueUUIDSelector } from '@pma/store';
import useSearchColleagues from 'hooks/useSearchColleagues';

type SearchPartProps = {
  teamMethods: UseFormReturn;
  selectedPerson: PeopleTypes | null;
  setSelectedPerson: Dispatch<SetStateAction<PeopleTypes | null>>;
  searchValue: string;
  setSearchValue: Dispatch<SetStateAction<string>>;
};

export const SearchPart: FC<SearchPartProps> = ({
  teamMethods,
  selectedPerson,
  setSelectedPerson,
  searchValue,
  setSearchValue,
}) => {
  const { css } = useStyle();

  const colleagueUuid = useSelector(colleagueUUIDSelector);

  const { colleagues, handleSearchColleagues } = useSearchColleagues({
    'manager-uuid_eq': colleagueUuid,
  });

  const {
    formState: { errors },
    register,
  } = teamMethods;

  return (
    <div className={css({ marginTop: '32px' })}>
      <Item
        errormessage={
          errors['search_option'] && errors['search_option'].type === 'required' ? 'Search option is required' : ''
        }
      >
        <SearchInput
          isValid={!errors[`search_option`]}
          name={`search_option`}
          onChange={(e) => {
            handleSearchColleagues(e.target.value);
            register(`search_option`).onChange(e);
          }}
          setSelectedPerson={setSelectedPerson}
          domRef={register(`search_option`).ref}
          placeholder={'Search'}
          options={colleagues}
          setSearchValue={setSearchValue}
          searchValue={searchValue}
          selectedPerson={selectedPerson}
        />
      </Item>
    </div>
  );
};

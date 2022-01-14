import React, { FC, Dispatch, SetStateAction } from 'react';
import { Item } from 'components/Form';
import { useStyle } from '@dex-ddl/core';
import { UseFormReturn } from 'react-hook-form';
import { SearchInput } from './SearchInput';
import { PeopleTypes } from './type';
import { useDispatch, useSelector } from 'react-redux';
import { ColleaguesActions, getFindedColleaguesSelector, colleagueUUIDSelector } from '@pma/store';

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
  const dispatch = useDispatch();

  const findedCollegues = useSelector(getFindedColleaguesSelector) || [];
  const colleagueUuid = useSelector(colleagueUUIDSelector);

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
            if (e.target.value === '' || e.target.value.length <= 1) {
              dispatch(ColleaguesActions.clearGettedColleagues());
            }
            if (e.target.value !== '' && e.target.value.length > 1) {
              dispatch(
                ColleaguesActions.getColleagues({
                  'first-name_like': e.target.value,
                  'last-name_like': e.target.value,
                  'manager-uuid_eq': colleagueUuid,
                }),
              );
            }
            register(`search_option`).onChange(e);
          }}
          setSelectedPerson={setSelectedPerson}
          domRef={register(`search_option`).ref}
          placeholder={'Search'}
          options={findedCollegues}
          setSearchValue={setSearchValue}
          searchValue={searchValue}
          selectedPerson={selectedPerson}
        />
      </Item>
    </div>
  );
};

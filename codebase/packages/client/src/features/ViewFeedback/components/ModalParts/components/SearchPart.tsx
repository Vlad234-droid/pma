import React, { FC, useState } from 'react';
import { SearchPartProps } from './type';
import { useStyle } from '@dex-ddl/core';
import { Item } from 'components/Form';
import { SearchInput } from './SearchInput';
import { ColleaguesActions, getFindedColleguesS } from '@pma/store';
import { useSelector, useDispatch } from 'react-redux';

const SearchPart: FC<SearchPartProps> = ({
  setSelectedPerson,
  setSearchValue,
  searchValue,
  selectedPerson,
  methods,
}) => {
  const [inputValue, setInputValue] = useState('');
  const { css } = useStyle();
  const dispatch = useDispatch();

  const {
    formState: { errors },
  } = methods;

  const { register } = methods;
  const findedCollegues = useSelector(getFindedColleguesS) || [];

  return (
    <div className={css({ marginTop: '32px' })}>
      <Item
        errormessage={
          errors['search_option'] && errors['search_option'].type === 'required' ? errors['search_option'].message : ''
        }
      >
        <SearchInput
          isValid={!errors[`search_option`]}
          name={`search_option`}
          onChange={(e) => {
            setInputValue(() => e.target.value);
            if (e.target.value !== '' && e.target.value.length > 1) {
              dispatch(
                ColleaguesActions.getColleagues({ firstName_like: e.target.value, lastName_like: e.target.value }),
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
          value={inputValue}
        />
      </Item>
    </div>
  );
};

export default SearchPart;

import React, { FC, useEffect, useState } from 'react';
import { SearchPartProps } from './type';
import { useStyle } from '@dex-ddl/core';
import { Item, Input } from 'components/Form';
import { SearchInput } from './SearchInput';
import { ColleaguesActions, getColleaguesSelector } from '@pma/store';
import { useSelector, useDispatch } from 'react-redux';
import { GenericItemField } from 'components/GenericForm';

const SearchPart: FC<SearchPartProps> = ({
  setSelectedPerson,
  setSearchValue,
  searchValue,
  selectedPerson,
  searchDate = '',
  setSearchDate,
  methods,
}) => {
  const [inputValue, setInputValue] = useState('');
  const { css } = useStyle();
  const dispatch = useDispatch();

  const {
    getValues,
    setValue,
    formState: { errors },
  } = methods;

  const { date } = getValues();

  useEffect(() => {
    if (setSearchDate) {
      date ? setSearchDate(new Date(date).toISOString()) : setSearchDate('');
    }
  }, [date]);

  useEffect(() => {
    setValue('date', searchDate);
  }, [searchDate]);

  const { register } = methods;
  const findedCollegues = useSelector(getColleaguesSelector) || [];

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
            if (e.target.value !== '' && e.target.value.length >= 3) {
              dispatch(
                ColleaguesActions.getColleagues({
                  'first-name_like': e.target.value,
                  'last-name_like': e.target.value,
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
          value={inputValue}
        />
      </Item>
      <GenericItemField
        name={`date`}
        methods={methods}
        Wrapper={({ children }) => (
          <Item label='Date' withIcon={false}>
            {children}
          </Item>
        )}
        Element={(props) => (
          <Input value={searchDate} customStyles={{ borderRadius: '50px' }} type={'date'} readonly={true} {...props} />
        )}
      />
    </div>
  );
};

export default SearchPart;

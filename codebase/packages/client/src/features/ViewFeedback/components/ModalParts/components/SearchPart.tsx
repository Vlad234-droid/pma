import React, { FC } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { useStyle } from '@dex-ddl/core';
import { Item, Input, Field } from 'components/Form';
import { ColleaguesFinder } from 'features/GiveFeedBack/components';

const getColleagueName = (data) => {
  if (!data) return '';
  const {
    profile: { firstName, lastName },
  } = data.colleague;

  return `${firstName} ${lastName}`;
};

type Props = Pick<UseFormReturn, 'setValue'> & {
  selectedColleague: any;
  date: string;
};

const SearchPart: FC<Props> = ({ setValue, selectedColleague, date }) => {
  const { css } = useStyle();

  return (
    <div className={css({ marginTop: '32px' })}>
      <ColleaguesFinder
        onSelect={(targetColleagueUuid) => {
          setValue('targetColleagueUuid', targetColleagueUuid, { shouldValidate: true });
        }}
        selected={null}
        value={getColleagueName(selectedColleague)}
      />
      <Field
        name={'date'}
        Wrapper={({ children }) => (
          <Item label='Date' withIcon={false}>
            {children}
          </Item>
        )}
        Element={(props) => <Input customStyles={{ borderRadius: '50px' }} {...props} value={date} type={'date'} />}
        setValue={setValue}
      />
    </div>
  );
};

export default SearchPart;

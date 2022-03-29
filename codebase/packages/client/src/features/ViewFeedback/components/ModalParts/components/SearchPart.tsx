import React, { FC } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { useStyle } from '@dex-ddl/core';
import { Item, Input, Field } from 'components/Form';
import { ColleaguesFinder } from 'features/GiveFeedBack/components';

export const WRAPPER = 'search-wrapper';

const getColleagueName = (data) => {
  if (!data) return '';

  return `${data?.colleague?.profile?.firstName} ${data?.colleague?.profile?.lastName}`;
};

type Props = Pick<UseFormReturn, 'setValue'> & {
  selectedColleague: any;
  date: string;
};

const SearchPart: FC<Props> = ({ setValue, selectedColleague, date }) => {
  const { css } = useStyle();

  return (
    <div className={css({ marginTop: '32px' })} data-test-id={WRAPPER}>
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

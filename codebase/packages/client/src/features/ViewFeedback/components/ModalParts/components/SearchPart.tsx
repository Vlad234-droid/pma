import React, { FC } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { useStyle } from '@pma/dex-wrapper';
import { Item, Field } from 'components/Form';
import { ColleaguesFinder } from 'features/GiveFeedBack/components';
import Datepicker from 'components/Datepicker';

export const WRAPPER = 'search-wrapper';

const getColleagueName = (data) => {
  if (!data) return '';

  return `${data?.colleague?.profile?.firstName} ${data?.colleague?.profile?.lastName}`;
};

type Props = Pick<UseFormReturn, 'setValue' | 'setError' | 'formState'> & {
  selectedColleague: any;
  date: string;
};

const SearchPart: FC<Props> = ({ setValue, selectedColleague, date, setError, formState }) => {
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
        isOnTop={false}
        Element={Datepicker}
        Wrapper={Item}
        setValue={setValue}
        setError={setError}
        value={date}
        error={formState?.errors?.message}
      />
    </div>
  );
};

export default SearchPart;

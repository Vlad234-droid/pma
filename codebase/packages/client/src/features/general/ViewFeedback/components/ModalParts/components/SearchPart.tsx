import React, { FC } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { useStyle } from '@pma/dex-wrapper';
import { ColleaguesActions } from '@pma/store';
import { useDispatch } from 'react-redux';

import { Item, Field } from 'components/Form';
import { ColleaguesFinder } from 'components/ColleaguesFinder';
import Datepicker from 'components/Datepicker';
import { useTranslation } from 'components/Translation';
import { InputWithDropdown } from 'components/InputWithDropdown';
import { SearchOption } from 'config/enum';

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
  const dispatch = useDispatch();
  const { t } = useTranslation();

  return (
    <div className={css({ marginTop: '32px' })} data-test-id={WRAPPER}>
      <InputWithDropdown
        onChange={() => dispatch(ColleaguesActions.clearColleagueList())}
        visible={true}
        options={[
          { value: SearchOption.NAME, label: t('by_name', 'By name') },
          { value: SearchOption.EMAIL, label: t('by_email_address', 'By email address') },
        ]}
        dropDownStyles={{
          borderRadius: '0px 25px 25px 0px',
        }}
      >
        {({ active }) => (
          <ColleaguesFinder
            onSelect={(targetColleagueUuid) => {
              setValue('targetColleagueUuid', targetColleagueUuid, { shouldValidate: true });
            }}
            selected={[]}
            value={getColleagueName(selectedColleague)}
            searchOption={active}
            customStyles={{ marginTop: '0px', width: '100%' }}
            inputStyles={{
              borderRadius: '25px 0px 0px 25px !important',
            }}
          />
        )}
      </InputWithDropdown>
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

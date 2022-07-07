import React, { FC, useState } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { Rule, Styles, useStyle } from '@pma/dex-wrapper';
import { ColleaguesActions } from '@pma/store';
import { useDispatch } from 'react-redux';

import { Item, Field } from 'components/Form';
import { ColleaguesFinder } from 'components/ColleaguesFinder';
import Datepicker from 'components/Datepicker';
import { Icon, RoundIcon } from 'components/Icon';
import { useTranslation } from 'components/Translation';
import DrawerModal from 'components/DrawerModal';
import { SearchOption } from 'config/enum';

export const WRAPPER = 'search-wrapper';

const getColleagueName = (data) => {
  if (!data) return '';

  return `${data?.colleague?.profile?.firstName} ${data?.colleague?.profile?.lastName}`;
};

type Props = Pick<UseFormReturn, 'setValue' | 'setError' | 'formState'> & {
  selectedColleague: any;
  date: string;
  setSelected: (T) => void;
};

const SearchPart: FC<Props> = ({ setValue, selectedColleague, date, setError, formState, setSelected }) => {
  const { css } = useStyle();
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const [open, setOpen] = useState<boolean>(false);
  const [active, setActive] = useState<SearchOption>(SearchOption.NAME);

  return (
    <div className={css({ marginTop: '32px' })} data-test-id={WRAPPER}>
      <div className={css(roundIconStyle)} onClick={() => setOpen((prev) => !prev)}>
        <RoundIcon strokeWidth={7}>
          <Icon graphic='settings' invertColors={false} iconStyles={modalCloseOptionStyle} />
        </RoundIcon>
      </div>
      <ColleaguesFinder
        onSelect={(targetColleagueUuid) => {
          setValue('targetColleagueUuid', targetColleagueUuid, { shouldValidate: true });
        }}
        selected={[]}
        value={getColleagueName(selectedColleague)}
        searchOption={active}
        customStyles={{ marginTop: '0px', width: '100%' }}
        inputStyles={{
          marginTop: '20px',
        }}
      />
      {open && (
        <DrawerModal
          active={active}
          setOpen={setOpen}
          title={t('filter', 'Filter')}
          onSelect={(filter) => {
            setSelected([]);
            setActive(filter);
            dispatch(ColleaguesActions.clearColleagueList());
            setOpen(false);
          }}
        />
      )}
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

const roundIconStyle: Rule = {
  '& > div': {
    marginLeft: 'calc(100% - 31px)',
  },
} as Styles;

const modalCloseOptionStyle: Rule = () => ({
  display: 'inline-block',
  height: '20px',
  paddingLeft: '0px',
  paddingRight: '0px',
  textDecoration: 'none',
  border: 'none',
  cursor: 'pointer',
});

export default SearchPart;

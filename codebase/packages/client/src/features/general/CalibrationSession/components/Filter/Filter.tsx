import React, { FC } from 'react';
import { CreateRule, Rule, useStyle } from '@pma/dex-wrapper';

import { Filters, SortBy } from 'features/general/Filters';
import { Option, RadioGroup } from 'components/Form';

type Props = {
  setStatus: (value: string) => void;
};

const Filter: FC<Props> = ({ setStatus }) => {
  const { css, matchMedia } = useStyle();
  const mobileScreen = matchMedia({ xSmall: true, small: true }) || false;

  const fieldOptions: Option[] = [
    { value: 'ACTIVE', label: 'Active' },
    { value: 'COMPLETED', label: 'Completed' },
  ];
  return (
    <div className={css(headStyle({ mobileScreen }))}>
      <div>
        <RadioGroup
          options={fieldOptions}
          name={'targetStatus'}
          placeholder={''}
          value={'PENDING'}
          onChange={({ target: { value } }) => setStatus(value)}
          customStyles={selectStyle}
        />
      </div>
      <div className={css(filtersStyle)}>
        <Filters
          sortValue={SortBy.AZ}
          onSort={console.log}
          searchValue={''}
          onSearch={console.log}
          sortingOptions={[]}
        />
      </div>
    </div>
  );
};

const headStyle: CreateRule<{ mobileScreen: boolean }> = ({ mobileScreen }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  paddingTop: '20px',
  paddingBottom: '20px',
  ...(mobileScreen && {
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: '10px',
  }),
});

const selectStyle: Rule = { minWidth: '350px' };
const filtersStyle: Rule = {
  display: 'flex',
  alignItems: 'center',
};

export default Filter;

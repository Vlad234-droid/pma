import React, { FC } from 'react';
import { CreateRule, Rule, useStyle } from '@pma/dex-wrapper';

import { Filters, SortBy } from 'features/general/Filters';
import { Option, Select } from 'components/Form';

type WithDateProps = {
  withDateFilter: boolean;
  period: string;
  onChangePeriod: (value: string) => void;
};

type WithoutDateProps = {
  withDateFilter?: never;
  onChangePeriod?: never;
  period?: never;
};

type Props = WithDateProps | WithoutDateProps;

const Filter: FC<Props> = ({ withDateFilter, onChangePeriod, period = '' }) => {
  const { css, matchMedia } = useStyle();
  const mobileScreen = matchMedia({ xSmall: true, small: true }) || false;

  const fieldOptions: Option[] = [
    { value: '2021', label: '2021 - 2022' },
    { value: '2022', label: '2022 - 2023' },
  ];

  return (
    <div className={css(headStyle({ mobileScreen }))}>
      <div>
        {withDateFilter && onChangePeriod && (
          <Select
            options={fieldOptions}
            name={'targetType'}
            placeholder={''}
            value={period}
            onChange={({ target: { value } }) => onChangePeriod(value)}
            customStyles={selectStyle}
          />
        )}
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

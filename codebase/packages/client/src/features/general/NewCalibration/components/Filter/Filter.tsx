import React, { FC } from 'react';
import { Rule, useStyle } from '@pma/dex-wrapper';

import { Filters, SortBy } from 'features/general/Filters';
import { Option, Select } from 'components/Form';

const Filter: FC = () => {
  const { css } = useStyle();
  const fieldOptions: Option[] = [
    { value: '2021 - 2022', label: '2021 - 2022' },
    { value: '2022 - 2023', label: '2022 - 2023' },
  ];
  return (
    <div className={css(headStyle)}>
      <div>
        <Select
          options={fieldOptions}
          name={'targetType'}
          placeholder={''}
          value={'2021 - 2022'}
          onChange={console.log}
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

const headStyle: Rule = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  paddingTop: '20px',
  paddingBottom: '20px',
};

const selectStyle: Rule = { minWidth: '350px' };
const filtersStyle: Rule = {
  display: 'flex',
  alignItems: 'center',
};

export default Filter;

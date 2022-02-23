import React, { FC, useState } from 'react';
import { Rule, useStyle } from '@dex-ddl/core';

import Filters, { getEmployeesSortingOptions, useSearch, useSorting } from 'features/Filters';
import { useTranslation } from 'components/Translation';

import ViewFilters from '../ViewFilters';
import { View } from '../../config/types';
import TeamWidgets from '../TeamWidgets';

const MyTeam: FC = () => {
  const { css } = useStyle();
  const { t } = useTranslation();
  const options = getEmployeesSortingOptions(t);
  const [view, setView] = useState<View>(View.DIRECT_REPORTS);
  const [sortValue, setSortValue] = useSorting();
  const [searchValue, setSearchValue] = useSearch();

  const handleViewChange = (view: View) => {
    setView(view);
  };

  return (
    <div data-test-id='my-team'>
      <div className={css(filtersWrapperStyles)}>
        <ViewFilters view={view} onChange={handleViewChange} />
        <div className={css(filtersStyles)}>
          <Filters
            sortValue={sortValue}
            onSort={setSortValue}
            searchValue={searchValue}
            onSearch={setSearchValue}
            sortingOptions={options}
          />
        </div>
      </div>
      <TeamWidgets view={view} searchValue={searchValue} sortValue={sortValue} />
    </div>
  );
};

const filtersWrapperStyles: Rule = {
  display: 'flex',
  justifyContent: 'space-between',
};

const filtersStyles: Rule = {
  display: 'flex',
  alignItems: 'center',
};

export default MyTeam;

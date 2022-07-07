import React, { FC, useState } from 'react';
import { Link } from 'react-router-dom';
// TODO: move PendingApprovals to Actions feature to widgets
import MyTeam, { View, ViewFilters, YourActions, TeamReporting, PendingApprovals } from 'features/general/MyTeam';
import ViewNavigation from 'features/general/ViewNavigation';
import { Filters, getEmployeesSortingOptions, useSearch, useSorting } from 'features/general/Filters';
import { Rule, useStyle } from '@pma/dex-wrapper';
import { CanPerform, role } from 'features/general/Permission';
import { useTranslation } from 'components/Translation';
import { buildPath } from 'features/general/Routes';
import { Page } from 'pages/general/types';

export const TEST_ID = 'my-team';

const MyTeamPage: FC = () => {
  const { css } = useStyle();
  const { t } = useTranslation();
  const options = getEmployeesSortingOptions(t);
  const [view, setView] = useState<View>(View.DIRECT_REPORTS);
  const [sortValue, setSortValue] = useSorting();
  const [searchValue, setSearchValue] = useSearch();

  const handleChangeView = (view: View) => {
    setView(view);
  };
  const showActions = view === View.DIRECT_REPORTS;

  return (
    <div>
      <ViewNavigation />
      <div className={css(filtersWrapperStyles)}>
        <CanPerform
          perform={[role.EXECUTIVE]}
          yes={() => <ViewFilters view={view} onChange={handleChangeView} />}
          no={() => <div className={css(emptyBlock)} />}
        />
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
      <div className={css(wrapperStyles)}>
        <div className={css(listWrapperStyles)}>
          {showActions && (
            <Link to={buildPath(Page.MY_ACTIONS)}>
              <PendingApprovals />
            </Link>
          )}
          <MyTeam view={view} searchValue={searchValue} sortValue={sortValue} />
        </div>
        <div className={css(actionsStyles)}>
          {showActions && (
            <>
              <YourActions />
              <TeamReporting />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

const emptyBlock: Rule = {
  display: 'flex',
  flexDirection: 'row',
};

const filtersWrapperStyles: Rule = {
  display: 'flex',
  justifyContent: 'space-between',
};

const filtersStyles: Rule = {
  display: 'flex',
  alignItems: 'center',
};

const wrapperStyles: Rule = {
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'stretch',
  gap: '8px',
};

const listWrapperStyles: Rule = {
  flex: '3 1 375px',
  display: 'flex',
  flexDirection: 'column',
  gap: '8px',
};

const actionsStyles: Rule = { flex: '1 0 216px' };

export default MyTeamPage;

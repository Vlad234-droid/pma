import React, { FC, useMemo, useState } from 'react';
import { CreateRule, Rule, useStyle } from '@pma/dex-wrapper';

import { default as MyTeam, View, ViewFilters } from 'features/general/MyTeam';
import {
  ActionCountWidget,
  CalibrationCount,
  OutstandingActionsWidget,
  PendingApprovalsWidget,
} from 'features/general/MyActions';
import ViewNavigation from 'features/general/ViewNavigation';
import { Filters, getEmployeesSortingOptions, SortBy, useSearch, useSorting } from 'features/general/Filters';
import { CanPerform, role, useTenant } from 'features/general/Permission';

import { useTranslation } from 'components/Translation';
import { type Location, useLocation } from 'react-router-dom';

export const TEST_ID = 'my-team';

interface LocationWithState extends Location {
  state: {
    view?: View;
  };
}

const MyTeamPage: FC = () => {
  const { css, matchMedia } = useStyle();
  const { t } = useTranslation();
  const tenant = useTenant();
  const mobileScreen = matchMedia({ xSmall: true, small: true }) || false;

  const options = getEmployeesSortingOptions(t);
  const { state } = useLocation() as LocationWithState;
  const [view, setView] = useState<View>(state?.view ?? View.DIRECT_REPORTS);
  const [sortValue, setSortValue] = useSorting();
  const [searchValue, setSearchValue] = useSearch();

  const handleChangeView = (view: View) => {
    setView(view);
    setSearchValue('');
    setSortValue(SortBy.AZ);
  };
  const showActions = view === View.DIRECT_REPORTS;

  const TeamReporting = useMemo(
    () => React.lazy(() => import(`features/${tenant}/MyTeam`).then((module) => ({ default: module.TeamReporting }))),
    [],
  );

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
            infoIcon={false}
            sortValue={sortValue}
            onSort={setSortValue}
            searchValue={searchValue}
            onSearch={setSearchValue}
            sortingOptions={options}
          />
        </div>
      </div>
      <div className={css(wrapperStyles({ mobileScreen }))}>
        <div className={css(listWrapperStyles)}>
          {showActions && (
            <>
              <PendingApprovalsWidget />
              <OutstandingActionsWidget />
            </>
          )}
          <MyTeam view={view} searchValue={searchValue} sortValue={sortValue} />
        </div>
        <div className={css(actionsStyles)}>
          {showActions && (
            <div className={css(actionBlock)}>
              <ActionCountWidget />
              <CalibrationCount />
              <TeamReporting />
            </div>
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

const actionBlock: Rule = {
  display: 'flex',
  flexDirection: 'column',
  gap: '8px',
};

const filtersWrapperStyles: Rule = {
  display: 'flex',
  justifyContent: 'space-between',
  marginBottom: '24px',
};

const filtersStyles: Rule = {
  display: 'flex',
  alignItems: 'center',
};

const wrapperStyles: CreateRule<{ mobileScreen: boolean }> = ({ mobileScreen }) => ({
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'stretch',
  gap: '8px',
  flexDirection: mobileScreen ? 'column-reverse' : 'row',
});

const listWrapperStyles: Rule = {
  flex: '3 1 375px',
  display: 'flex',
  flexDirection: 'column',
  gap: '8px',
};

const actionsStyles: Rule = { flex: '1 0 216px' };

export default MyTeamPage;

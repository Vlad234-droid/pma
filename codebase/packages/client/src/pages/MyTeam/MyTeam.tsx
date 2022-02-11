import React, { FC, useEffect, useState } from 'react';
import { shallowEqual, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Rule, useStyle } from '@dex-ddl/core';
import {
  colleagueUUIDSelector,
  getAllEmployees,
  getAllEmployeesWithManagerSearch,
  getPendingEmployees,
  ManagersActions,
  getManagersMetaSelector,
} from '@pma/store';

import {
  View,
  ViewFilters,
  WidgetPending,
  WidgetTeamMateProfile,
  YourActions,
  getLastTimelineStatus,
} from 'features/MyTeam';
import useDispatch from 'hooks/useDispatch';
import { buildPath } from 'features/Routes';
import { Page } from 'pages';
import Filters, { getEmployeesSortingOptions, useSearch, useSorting } from 'features/Filters';
import { useTranslation } from 'components/Translation';
import { Employee } from 'config/types';
import ViewNavigation from 'features/ViewNavigation';

export const TEST_ID = 'my-team';

const MyTeam: FC = () => {
  const { css } = useStyle();
  const [sortValue, setSortValue] = useSorting();
  const [searchValue, setSearchValue] = useSearch();
  const { t } = useTranslation();
  const options = getEmployeesSortingOptions(t);
  const [view, setView] = useState<View>(View.DIRECT_REPORTS);
  const isFullTeamView = view === View.FULL_TEAM;
  const currentSelector = isFullTeamView ? getAllEmployeesWithManagerSearch : getAllEmployees;
  const { loaded } = useSelector(getManagersMetaSelector) || {};

  const handleViewChange = (view: View) => {
    setView(view);
  };

  // @ts-ignore
  const colleagues = useSelector((state) => currentSelector(state, searchValue, sortValue), shallowEqual) || [];

  const { employeeWithPendingApprovals, employeePendingApprovals } =
    useSelector((state) => getPendingEmployees(state), shallowEqual) || {};

  const waitingForApprovalCount = employeeWithPendingApprovals?.length;
  const colleaguesWithStatusDraftCount = employeePendingApprovals?.length;

  const colleagueUuid = useSelector(colleagueUUIDSelector);
  const dispatch = useDispatch();

  useEffect(() => {
    if (colleagueUuid) dispatch(ManagersActions.getManagers({ colleagueUuid, fullTeam: view === View.FULL_TEAM }));
  }, [colleagueUuid, view]);

  return (
    <div>
      <ViewNavigation />
      <div className={css({ display: 'flex', justifyContent: 'space-between' })}>
        <ViewFilters view={view} onChange={handleViewChange} />
        <div
          className={css({
            display: 'flex',
            alignItems: 'center',
          })}
        >
          <Filters
            sortValue={sortValue}
            onSort={setSortValue}
            searchValue={searchValue}
            onSearch={setSearchValue}
            sortingOptions={options}
          />
        </div>
      </div>
      <div
        className={css({
          display: 'flex',
          flexWrap: 'wrap-reverse',
          gridGap: '8px',
          marginTop: '8px',
          alignItems: 'stretch',
        })}
      >
        <div className={css({ flex: '3 1 375px', display: 'flex', flexDirection: 'column', gap: '8px' })}>
          <div>
            {view === View.DIRECT_REPORTS && (
              <Link to={buildPath(Page.MY_ACTIONS)}>
                <WidgetPending count={waitingForApprovalCount} />
              </Link>
            )}
            <div className={css(allColleagues)}>
              {loaded &&
                colleagues.map((employee: Employee) => (
                  <WidgetTeamMateProfile
                    fullTeamView={isFullTeamView}
                    key={employee.uuid}
                    uuid={employee.uuid}
                    status={getLastTimelineStatus(employee)}
                    employee={employee}
                  />
                ))}
            </div>
          </div>
        </div>
        <div data-test-id='more' className={css({ flex: '1 0 216px' })}>
          {view === View.DIRECT_REPORTS && (
            <YourActions
              colleaguesWithStatusDraftCount={colleaguesWithStatusDraftCount}
              waitingForApprovalCount={waitingForApprovalCount}
            />
          )}
        </div>
      </div>
    </div>
  );
};

const allColleagues: Rule = { paddingTop: '8px', display: 'flex', flexDirection: 'column', gap: '8px' };

export default MyTeam;

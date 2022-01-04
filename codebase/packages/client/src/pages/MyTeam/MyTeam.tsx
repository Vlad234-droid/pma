import React, { FC, useEffect } from 'react';
import { shallowEqual, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Icon as IconCore, Rule, useBreakpoints, useStyle } from '@dex-ddl/core';
import {
  colleagueUUIDSelector,
  getAllEmployees,
  getManagersMetaSelector,
  getPendingEmployees,
  ManagersActions,
} from '@pma/store';

import { RouterSwitch } from 'components/RouterSwitch';
import { Status } from 'config/enum';
import { WidgetPending, WidgetTeamMateProfile, YourActions } from 'features/MyTeam';
import { FilterOption } from 'features/Shared';
import useDispatch from 'hooks/useDispatch';
import { buildPath } from 'features/Routes';
import { Page } from 'pages';
import Filters, { useSortFilter, useSearchFilter, getEmployeesSortingOptions } from 'features/Filters';
import { useTranslation } from 'components/Translation';

export const TEST_ID = 'my-team';

const MyTeam: FC = () => {
  const { css } = useStyle();
  const [, isBreakpoint] = useBreakpoints();
  const desktopScreen = !(isBreakpoint.small || isBreakpoint.xSmall);
  const [sortValue, setSortValue] = useSortFilter();
  const [searchValue, setSearchValue] = useSearchFilter();
  const { t } = useTranslation();
  const options = getEmployeesSortingOptions(t);

  // @ts-ignore
  const colleagues = useSelector((state) => getAllEmployees(state, searchValue, sortValue), shallowEqual) || [];

  const { employeeWithPendingApprovals, employeePendingApprovals } =
    useSelector((state) => getPendingEmployees(state), shallowEqual) || {};

  const waitingForApprovalCount = employeeWithPendingApprovals?.length;
  const colleaguesWithStatusDraftCount = employeePendingApprovals?.length;

  const { loaded } = useSelector(getManagersMetaSelector) || {};
  const colleagueUuid = useSelector(colleagueUUIDSelector);
  const dispatch = useDispatch();

  useEffect(() => {
    if (colleagueUuid) dispatch(ManagersActions.getManagers({ colleagueUuid }));
  }, [colleagueUuid]);

  return (
    <div>
      <div className={css({ display: 'flex', justifyContent: 'space-between' })}>
        {desktopScreen && (
          <div
            className={css({
              display: 'flex',
              alignItems: 'center',
              minWidth: '110px',
            })}
          />
        )}
        <RouterSwitch
          links={[
            { link: buildPath(Page.CONTRIBUTION), name: 'My View' },
            { link: buildPath(Page.MY_TEAM), name: 'My Team' },
          ]}
        />
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
            <Link to={Page.ACTIONS}>
              <WidgetPending count={waitingForApprovalCount} />
            </Link>
            <div className={css(allColleagues)}>
              {colleagues.map((employee) => {
                return <WidgetTeamMateProfile key={employee.uuid} id='1' status={Status.PENDING} employee={employee} />;
              })}
            </div>
          </div>
        </div>
        <div data-test-id='more' className={css({ flex: '1 0 216px' })}>
          <YourActions
            colleaguesWithStatusDraftCount={colleaguesWithStatusDraftCount}
            waitingForApprovalCount={waitingForApprovalCount}
          />
        </div>
      </div>
    </div>
  );
};

const allColleagues: Rule = { paddingTop: '8px', display: 'flex', flexDirection: 'column', gap: '8px' };

export default MyTeam;

import React, { FC, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Rule, useStyle } from '@pma/dex-wrapper';
import {
  colleagueUUIDSelector,
  getAllEmployees,
  getAllEmployeesWithManagerSearch,
  getManagersMetaSelector,
  ManagersActions,
} from '@pma/store';

import useDispatch from 'hooks/useDispatch';
import { SortBy } from 'features/general/Filters';
import { View } from './config/types';
import Spinner from 'components/Spinner';
import { Employee, Status } from 'config/types';
import TeamMateProfile from './components/TeamMateProfile';
import { getLastTimelineStatus } from './utils';

type Props = {
  view: View;
  searchValue: string;
  sortValue: SortBy;
};

const MyTeam: FC<Props> = ({ view, searchValue, sortValue }) => {
  const { loaded } = useSelector(getManagersMetaSelector) || {};
  const { css } = useStyle();
  const dispatch = useDispatch();
  const currentSelector = view === View.FULL_TEAM ? getAllEmployeesWithManagerSearch : getAllEmployees;
  const colleagues = useSelector((state) => currentSelector(state, Status.PENDING, searchValue, sortValue)) || [];
  const colleagueUuid = useSelector(colleagueUUIDSelector);

  useEffect(() => {
    if (colleagueUuid) {
      dispatch(
        ManagersActions.getManagerReviews({
          colleagueUuid,
          fullTeam: view === View.FULL_TEAM,
          'colleague-cycle-status_in': [Status.STARTED, Status.FINISHING],
          'review-status_in': [Status.WAITING_FOR_APPROVAL, Status.WAITING_FOR_APPROVAL],
          status: Status.PENDING,
        }),
      );
    }
  }, [colleagueUuid, view]);

  useEffect(() => {
    dispatch(
      ManagersActions.getManagerReviews({
        colleagueUuid,
        'colleague-cycle-status_in': [Status.STARTED, Status.FINISHING],
        'review-status_in': [Status.DRAFT],
        status: Status.DRAFT,
      }),
    );
  }, [colleagueUuid]);

  if (!loaded) return <Spinner />;

  return (
    <div className={css(listStyles)}>
      {colleagues.map((employee: Employee) => (
        <TeamMateProfile
          fullTeamView={view === View.FULL_TEAM}
          key={employee.uuid}
          uuid={employee.uuid}
          status={getLastTimelineStatus(employee)}
          employee={employee}
        />
      ))}
    </div>
  );
};

const listStyles: Rule = {
  display: 'flex',
  flexDirection: 'column',
  gap: '8px',
};

export default MyTeam;

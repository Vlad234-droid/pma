import React, { useEffect, FC } from 'react';
import { shallowEqual, useSelector } from 'react-redux';
import { Rule, useStyle } from '@pma/dex-wrapper';
import {
  colleagueUUIDSelector,
  getAllEmployees,
  getAllEmployeesWithManagerSearch,
  ManagersActions,
  getManagersMetaSelector,
} from '@pma/store';

import useDispatch from 'hooks/useDispatch';
import { SortBy } from 'features/general/Filters';
import { View } from './config/types';
import Spinner from 'components/Spinner';
import { Employee } from 'config/types';
import TeamMateProfile from './components/TeamMateProfile';

type Props = {
  view: View;
  searchValue: string;
  sortValue: SortBy;
};

const MyTeam: FC<Props> = ({ view, searchValue, sortValue }) => {
  const { loaded } = useSelector(getManagersMetaSelector) || {};
  const { css } = useStyle();
  const currentSelector = view === View.FULL_TEAM ? getAllEmployeesWithManagerSearch : getAllEmployees;
  // @ts-ignore
  const colleagues = useSelector((state) => currentSelector(state, searchValue, sortValue), shallowEqual) || [];

  // @ts-ignore
  const colleagueUuid = useSelector(colleagueUUIDSelector);
  const dispatch = useDispatch();

  const loadManagers = () =>
    dispatch(ManagersActions.getManagerReviews({ colleagueUuid, fullTeam: view === View.FULL_TEAM }));

  useEffect(() => {
    if (colleagueUuid) loadManagers();
  }, [colleagueUuid, view]);

  if (!loaded) return <Spinner />;

  return (
    <div className={css(listStyles)}>
      {colleagues.map((employee: Employee) => (
        <TeamMateProfile
          fullTeamView={view === View.FULL_TEAM}
          key={employee.uuid}
          uuid={employee.uuid}
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

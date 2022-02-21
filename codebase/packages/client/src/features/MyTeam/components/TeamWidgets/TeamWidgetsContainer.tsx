import React, { FC } from 'react';
import { shallowEqual, useSelector } from 'react-redux';
import {
  colleagueUUIDSelector,
  getAllEmployees,
  getAllEmployeesWithManagerSearch,
  getPendingEmployees,
  ManagersActions,
  getManagersMetaSelector,
} from '@pma/store';

import useDispatch from 'hooks/useDispatch';
import { SortBy} from 'features/Filters';

import TeamWidgets from './TeamWidgets';
import { View } from '../../config/types';

type Props = {
  view: View;
  searchValue: string;
  sortValue: SortBy;
};

const TeamWidgetsContainer: FC<Props> = ({ view, searchValue, sortValue }) => {
  const { loaded } = useSelector(getManagersMetaSelector) || {};
  const currentSelector = view === View.FULL_TEAM ? getAllEmployeesWithManagerSearch : getAllEmployees;
  // @ts-ignore
  const colleagues = useSelector((state) => currentSelector(state, searchValue, sortValue), shallowEqual) || [];
  const { employeeWithPendingApprovals, employeePendingApprovals } =
  useSelector((state) => getPendingEmployees(state), shallowEqual) || {};
  // @ts-ignore
  const colleagueUuid = useSelector(colleagueUUIDSelector);
  const dispatch = useDispatch();

  const loadManagers = () => dispatch(ManagersActions.getManagers({ colleagueUuid, fullTeam: view === View.FULL_TEAM }));

  return (
    <TeamWidgets
      loaded={loaded}
      colleagues={colleagues}
      employeeWithPendingApprovals={employeeWithPendingApprovals}
      employeePendingApprovals={employeePendingApprovals}
      view={view}
      colleagueUuid={colleagueUuid}
      loadManagers={loadManagers}
    />
  );
};

export default TeamWidgetsContainer;

import React, { FC, useState } from 'react';
import { shallowEqual, useSelector } from 'react-redux';
import { colleagueUUIDSelector, getAllEmployees, ManagersActions, getManagersMetaSelector } from '@pma/store';

import useDispatch from 'hooks/useDispatch';
import { FilterOption, FilterValues } from 'features/Filters';

import Calibration from './Calibration';
import { getMockFilterOptions } from '../../mock';

const CalibrationContainer: FC = () => {
  const colleagueUuid = useSelector(colleagueUUIDSelector);
  const dispatch = useDispatch();
  // @ts-ignore
  const colleagues = useSelector((state) => getAllEmployees(state), shallowEqual) || [];
  const { loaded } = useSelector(getManagersMetaSelector);
  const [filterOptions, setFilterOptions] = useState<FilterOption[]>();

  const loadData = (filters: FilterValues) => {
    dispatch(ManagersActions.getManagers({ colleagueUuid }));
  };

  const loadFilterOptions = () => {
    setFilterOptions(getMockFilterOptions());
  };

  return (
    <Calibration
      loadData={loadData}
      loadFilterOptions={loadFilterOptions}
      colleagues={colleagues}
      colleagueUuid={colleagueUuid}
      filterOptions={filterOptions}
      loading={!loaded}
    />
  );
};

export default CalibrationContainer;

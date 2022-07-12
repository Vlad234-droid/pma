import React, { FC, useState } from 'react';
import { shallowEqual, useSelector } from 'react-redux';
import { colleagueUUIDSelector, getAllEmployees, ManagersActions, getManagersMetaSelector } from '@pma/store';

import { Employee } from 'config/types';
import useDispatch from 'hooks/useDispatch';
import { FilterOption } from 'features/general/Filters';

import Calibration from './Calibration';
import { getMockFilterOptions } from '../../mock';

const CalibrationContainer: FC = () => {
  const colleagueUuid = useSelector(colleagueUUIDSelector);
  const dispatch = useDispatch();
  // @ts-ignore
  const colleagues: Array<Employee> = useSelector(getAllEmployees, shallowEqual) || [];

  const { loaded } = useSelector(getManagersMetaSelector);
  const [filterOptions, setFilterOptions] = useState<FilterOption[]>();

  const loadData = () => {
    dispatch(ManagersActions.getManagerReviews({ colleagueUuid }));
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

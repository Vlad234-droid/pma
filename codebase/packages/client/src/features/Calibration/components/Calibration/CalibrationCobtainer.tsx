import React, {FC, useState} from 'react';
import { shallowEqual, useSelector } from 'react-redux';
import { colleagueUUIDSelector, getAllEmployees, ManagersActions } from '@pma/store';

import useDispatch from 'hooks/useDispatch';
import {FilterOption, FilterValues} from 'features/Filters';

import Calibration from './Calibration';
import { getMockFilterOptions } from '../../mock';

const CalibrationContainer: FC = () => {
  const colleagueUuid = useSelector(colleagueUUIDSelector);
  const dispatch = useDispatch();
  // @ts-ignore
  const colleagues = useSelector((state) => getAllEmployees(state), shallowEqual) || [];
  const [filterOptions, setFilterOptions] = useState<FilterOption[]>();

  const loadData = (filters: FilterValues) => {
    console.log('filters', filters);
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
    />
  );
};

export default CalibrationContainer;

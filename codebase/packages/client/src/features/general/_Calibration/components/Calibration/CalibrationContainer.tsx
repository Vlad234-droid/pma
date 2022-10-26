import React, { FC, useState } from 'react';
import { shallowEqual, useSelector } from 'react-redux';
import { colleagueUUIDSelector, getAllEmployees, getManagersMetaSelector } from '@pma/store';

import { Employee } from 'config/types';
import { FilterOption } from 'features/general/Filters';

import Calibration from './Calibration';
import { getMockFilterOptions } from '../../mock';

const CalibrationContainer: FC = () => {
  const colleagueUuid = useSelector(colleagueUUIDSelector);
  const colleagues: Array<Employee> = useSelector(getAllEmployees, shallowEqual) || [];

  const [filterOptions, setFilterOptions] = useState<FilterOption[]>();

  const loadFilterOptions = () => {
    setFilterOptions(getMockFilterOptions());
  };

  return (
    <Calibration
      loadFilterOptions={loadFilterOptions}
      colleagues={colleagues}
      colleagueUuid={colleagueUuid}
      filterOptions={filterOptions}
      loading={false}
    />
  );
};

export default CalibrationContainer;

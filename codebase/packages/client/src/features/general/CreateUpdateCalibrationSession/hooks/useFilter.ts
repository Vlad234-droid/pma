import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCalibrationSessionsSelector, ColleagueFilterAction, calibrationSessionsMetaSelector } from '@pma/store';
import { Operand } from 'config/enum';

import { filterFromSessionResponse } from '../utils';

const useFilter = (uuid?: string) => {
  const dispatch = useDispatch();
  const { loaded } = useSelector(calibrationSessionsMetaSelector);
  const calibrationSessions = useSelector(getCalibrationSessionsSelector) || [];

  const calibrationSession = uuid ? calibrationSessions.find((cs) => cs.uuid === uuid) || {} : {};
  const { participants = {} } = calibrationSession;
  const { filters = [] } = participants;

  const query = filters
    .filter((f) => f?.property && !['colleague-uuid'].includes(f?.property))
    .reduce((acc, val) => {
      acc[`${val.property}${Operand[val?.operand || Operand.NOT_EXIST]}`] = val.value;
      return acc;
    }, {}) as Record<string, string>;

  const defaultFilters = filterFromSessionResponse(
    filters.filter((f) => f?.property && !['colleague-uuid'].includes(f?.property)),
  );

  useEffect(() => {
    if (loaded) {
      dispatch(ColleagueFilterAction.getColleagueFilter(query || {}));
    }
  }, [loaded]);

  return { defaultFilters };
};

export default useFilter;

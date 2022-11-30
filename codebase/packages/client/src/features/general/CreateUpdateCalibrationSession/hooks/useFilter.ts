import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  ColleagueSimpleAction,
  getColleagueSimpleSelector,
  getCalibrationSessionsSelector,
  ColleagueFilterAction,
  calibrationSessionsMetaSelector,
} from '@pma/store';
import { ConditionOperandEnum } from '@pma/openapi';
import { Operand } from 'config/enum';

import { filterFromSessionResponse, prepareColleaguesForUI } from '../utils';

const useFilter = (uuid?: string) => {
  const dispatch = useDispatch();
  const { loaded: calibrationSessionLoaded } = useSelector(calibrationSessionsMetaSelector);
  const colleagueSimple = useSelector(getColleagueSimpleSelector) || [];
  const calibrationSessions = useSelector(getCalibrationSessionsSelector) || [];

  const calibrationSession = uuid ? calibrationSessions.find((cs) => cs.uuid === uuid) || {} : {};
  const { participants = {} } = calibrationSession;
  const { filters = [] } = participants;

  const query = filters
    .filter((f) => f?.property && !['colleague-uuid'].includes(f?.property))
    .reduce((acc, val) => {
      acc[`${val.property}${Operand[val?.operand || Operand.NOT_EXIST]}`] = val.value;
      return acc;
    }, {});

  const defaultFilters = filterFromSessionResponse(
    filters.filter((f) => f?.property && !['colleague-uuid'].includes(f?.property)),
  );

  const colleaguesAdd = prepareColleaguesForUI(colleagueSimple, filters, ConditionOperandEnum.In);

  const colleaguesRemoved = prepareColleaguesForUI(colleagueSimple, filters, ConditionOperandEnum.NotIn);

  useEffect(() => {
    if (calibrationSessionLoaded) {
      dispatch(ColleagueSimpleAction.getColleagueSimple(query || {}));
      dispatch(ColleagueFilterAction.getColleagueFilter(query || {}));
    }
  }, [calibrationSessionLoaded]);

  return { defaultFilters, colleaguesAdd, colleaguesRemoved };
};

export default useFilter;

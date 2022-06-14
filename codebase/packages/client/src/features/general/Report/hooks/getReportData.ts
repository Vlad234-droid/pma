import { useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { ReportActions } from '@pma/store';
import { getCurrentYear } from 'utils/date';
import { listOfStatuses } from '../config';

export const getData = (dispatch, fields: Record<string, string>): void => {
  dispatch(ReportActions.getObjectivesStatistics({ year: fields.year }));
  dispatch(
    ReportActions.getObjectivesReport({
      year: fields.year,
      statuses_in: [...listOfStatuses],
    }),
  );
};

export const getReportData = (fields: Record<string, string> = {}): void => {
  const dispatch = useDispatch();
  const getStatsReportData = useCallback(() => {
    getData(dispatch, { year: fields?.year || getCurrentYear() });
  }, []);

  useEffect(() => {
    getStatsReportData();
  }, []);
};
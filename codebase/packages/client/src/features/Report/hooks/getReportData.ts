import { useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { ReportActions } from '@pma/store';
import { getCurrentYear } from 'utils/date';
import { listOfStatuses } from '../config';

export const getData = (dispatch, year: string): void => {
  dispatch(ReportActions.getObjectivesStatistics({ year }));
  dispatch(
    ReportActions.getObjectivesReport({
      year,
      statuses_in: [...listOfStatuses],
    }),
  );
};

export const getReportData = (year: string = getCurrentYear()): void => {
  const dispatch = useDispatch();
  const getStatsReportData = useCallback(() => {
    getData(dispatch, year);
  }, []);

  useEffect(() => {
    getStatsReportData();
  }, []);
};

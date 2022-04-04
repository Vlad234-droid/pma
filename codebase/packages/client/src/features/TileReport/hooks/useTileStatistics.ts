import { useState, useEffect, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getPendingReportSelector, getDoneReportSelector, ReportActions } from '@pma/store';

import useQueryString from 'hooks/useQueryString';
import { ReportTags } from '../config';
import { ReportPage } from 'config/enum';
import { convertToReportEnum, checkForPendingChartView, checkForDoneChartView, getData } from '../utils';

export const useTileStatistics = () => {
  const dispatch = useDispatch();
  const { pathname } = useLocation();

  const [type, setType] = useState<string>('');

  const query = useQueryString() as Record<string, string>;

  const navigate = useNavigate();

  useEffect(() => {
    if (!Object.entries(query).length || !query.year) navigate(-1);
  }, [query]);

  const getReport = useCallback(() => {
    getData(dispatch, query);
  }, []);

  useEffect(() => {
    dispatch(ReportActions.clearStatistics());
    setType(ReportPage[convertToReportEnum(pathname)]);
    getReport();
    return () => {
      dispatch(ReportActions.clearStatistics());
    };
  }, []);

  const pending =
    useSelector(getPendingReportSelector(checkForPendingChartView(ReportTags[type]), ReportTags[type])) || [];

  const done = useSelector(getDoneReportSelector(checkForDoneChartView(ReportTags[type]), ReportTags[type])) || [];

  return [pending, done, type, query];
};

import { useState, useEffect, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { ReportActions } from '@pma/store';

import useQueryString from 'hooks/useQueryString';
import { ReportPage } from 'config/enum';
import { convertToReportEnum, getData } from '../utils';

export const useTileStatistics = () => {
  const dispatch = useDispatch();
  const { pathname } = useLocation();

  const [type, setType] = useState<ReportPage | ''>('');

  const query = useQueryString();

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

  return { type, query };
};

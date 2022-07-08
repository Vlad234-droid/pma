import { useState, useEffect } from 'react';
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

  useEffect(() => {
    dispatch(ReportActions.clearStatistics());
    setType(ReportPage[convertToReportEnum(pathname)]);
    return () => {
      dispatch(ReportActions.clearStatistics());
    };
  }, []);

  useEffect(() => {
    if (!type) return;
    getData(dispatch, query, type);
  }, [type]);

  return { type, query };
};

import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { ReportActions } from '@pma/store';

import { ReportPage } from 'config/enum';
import { convertToReportEnum } from '../utils';

export const useTileStatistics = () => {
  const dispatch = useDispatch();
  const { pathname } = useLocation();

  const [type, setType] = useState<ReportPage | ''>('');

  useEffect(() => {
    dispatch(ReportActions.clearStatistics());
    setType(ReportPage[convertToReportEnum(pathname)]);
    return () => {
      dispatch(ReportActions.clearStatistics());
    };
  }, []);

  return { type };
};

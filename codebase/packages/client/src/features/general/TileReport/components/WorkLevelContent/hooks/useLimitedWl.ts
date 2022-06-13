import { useEffect, useCallback } from 'react';
import { ReportActions } from '@pma/store';
import { useDispatch } from 'react-redux';
import useQueryString from 'hooks/useQueryString';
import { getAdditionalFields, initialFields } from '../config';

export const getWLData = <T extends Record<string, number | boolean | string>>(payload: T, dispatch): void => {
  dispatch(ReportActions.getLimitedObjectivesReport(payload));
};

export const useLimitedWl = (): void => {
  const dispatch = useDispatch();
  const query = useQueryString();

  const getData = useCallback(() => {
    getWLData({ ...initialFields, ...getAdditionalFields(query) }, dispatch);
  }, []);

  useEffect(() => {
    getData();
  }, []);
};

import { useEffect } from 'react';
import {
  CalibrationStatisticsAction,
  calibrationStatisticsDataSelector,
  calibrationStatisticsMetaSelector,
} from '@pma/store';
import { TotalCount } from '@pma/openapi';
import { useSelector } from 'react-redux';
import useDispatch from 'hooks/useDispatch';
import { Status } from 'config/enum';
import { filterToRequest } from 'utils';

export const useCalibrationStatistics = ({
  period,
  filters,
  searchValue,
}: {
  period?: string;
  filters?: Record<string, Record<string, boolean>>;
  searchValue?: string;
}): { statistics: { [key: string]: TotalCount }; loading: boolean } => {
  const dispatch = useDispatch();

  const data = useSelector(calibrationStatisticsDataSelector);
  const { loading } = useSelector(calibrationStatisticsMetaSelector);

  useEffect(() => {
    const params = {
      'colleague-cycle-status_in': [Status.FINISHED, Status.FINISHING, Status.STARTED],
      'timeline-point-status_in': [Status.STARTED, Status.FINISHING, Status.COMPLETED],
      _search: searchValue,
      year: period,
      ...filterToRequest(filters),
    };
    dispatch(CalibrationStatisticsAction.getCalibrationStatistics(params));
  }, [period, filters, searchValue]);

  return {
    loading,
    statistics: data,
  };
};

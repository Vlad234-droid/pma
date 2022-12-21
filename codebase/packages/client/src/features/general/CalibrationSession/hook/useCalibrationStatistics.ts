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

export const useCalibrationStatistics = ({
  period,
}: {
  period?: string | undefined;
}): { statistics: { [key: string]: TotalCount }; loading: boolean } => {
  const dispatch = useDispatch();

  const data = useSelector(calibrationStatisticsDataSelector);
  const { loading } = useSelector(calibrationStatisticsMetaSelector);

  useEffect(() => {
    const params = {
      'colleague-cycle-status_in': [Status.FINISHED, Status.FINISHING, Status.STARTED],
      ...(period ? { year: period } : {}),
    };
    dispatch(CalibrationStatisticsAction.getCalibrationStatistics(params));
  }, [period]);

  return {
    loading,
    statistics: data,
  };
};

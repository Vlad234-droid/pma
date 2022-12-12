import { useEffect } from 'react';
import {
  CalibrationStatisticsAction,
  calibrationStatisticsDataSelector,
  calibrationStatisticsMetaSelector,
} from '@pma/store';
import { useSelector } from 'react-redux';
import useDispatch from 'hooks/useDispatch';
import { ActiveList, statisticsType } from '../types';
import { initialRatings, initialStatistics } from '../config';

export const useCalibrationStatistics = ({
  activeList,
  uuid,
  period,
}: {
  activeList: ActiveList;
  uuid?: string | undefined;
  period?: string | undefined;
}): { statistics: statisticsType; loading: boolean } => {
  const dispatch = useDispatch();

  const data = useSelector(calibrationStatisticsDataSelector);
  const { loading } = useSelector(calibrationStatisticsMetaSelector);

  useEffect(() => {
    const params = {
      sessionUuid: uuid,
      ...(activeList !== ActiveList.LIST ? { 'review-rating_in': initialRatings } : {}),
      ...(period ? { year: period } : {}),
    };
    dispatch(CalibrationStatisticsAction.getCalibrationStatistics(params));
  }, [activeList, period]);

  return {
    loading,
    statistics: !data.length
      ? initialStatistics
      : (initialStatistics.map(
          (item) => data?.find(({ rating }) => rating === item?.rating) || item,
        ) as statisticsType),
  };
};

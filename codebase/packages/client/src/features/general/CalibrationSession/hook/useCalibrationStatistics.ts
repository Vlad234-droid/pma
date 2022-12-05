import { useEffect } from 'react';
import { RatingStatisticRatingEnum } from '@pma/openapi';
import { CalibrationStatisticsAction, calibrationStatisticsDataSelector } from '@pma/store';
import { useSelector } from 'react-redux';
import useDispatch from 'hooks/useDispatch';

const initialStatistics = [
  { rating: RatingStatisticRatingEnum.Outstanding, count: 0, percentage: 0 },
  { rating: RatingStatisticRatingEnum.Great, count: 0, percentage: 0 },
  { rating: RatingStatisticRatingEnum.Satisfactory, count: 0, percentage: 0 },
  { rating: RatingStatisticRatingEnum.BelowExpected, count: 0, percentage: 0 },
  { rating: RatingStatisticRatingEnum.Unsubmitted, count: 0, percentage: 0 },
];

export type statisticsType = typeof initialStatistics;

export const useCalibrationStatistics = (): { statistics: statisticsType } => {
  const dispatch = useDispatch();

  const data = useSelector(calibrationStatisticsDataSelector);

  useEffect(() => {
    dispatch(CalibrationStatisticsAction.getCalibrationStatistics({}));
  }, []);

  return {
    statistics: !data.length
      ? initialStatistics
      : (initialStatistics.map(
          (item) => data?.find(({ rating }) => rating === item?.rating) || item,
        ) as statisticsType),
  };
};

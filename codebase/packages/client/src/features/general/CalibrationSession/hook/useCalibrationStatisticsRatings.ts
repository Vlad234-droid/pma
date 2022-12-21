import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import {
  calibrationStatisticsRatingsDataSelector,
  calibrationStatisticsRatingsMetaSelector,
  CalibrationStatisticsRatingsAction,
} from '@pma/store';

import useDispatch from 'hooks/useDispatch';
import { filterToRequest } from 'utils';
import { ActiveList, RatingStatisticRatingEnum } from '../types';
import { initialRatingEnums, initialRatings } from '../config';
import { Status } from 'config/enum';

const initialTotal = {
  count: 0,
  percentage: 0,
  total: 0,
};

export const useCalibrationStatisticsRatings = ({
  activeList,
  uuid,
  period,
  filters,
  searchValue,
}: {
  activeList: ActiveList;
  uuid?: string | undefined;
  period?: string | undefined;
  filters?: Record<string, Record<string, boolean>>;
  searchValue?: string;
}) => {
  const dispatch = useDispatch();

  const statistics = useSelector(calibrationStatisticsRatingsDataSelector);
  const { loading } = useSelector(calibrationStatisticsRatingsMetaSelector);

  useEffect(() => {
    const params = {
      'colleague-cycle-status_in': [Status.FINISHED, Status.FINISHING, Status.STARTED],
      _search: searchValue,
      sessionUuid: uuid,
      ...(activeList !== ActiveList.LIST ? { 'review-rating_in': initialRatings } : {}),
      ...(period ? { year: period } : {}),
      ...filterToRequest(filters),
    };
    dispatch(CalibrationStatisticsRatingsAction.getCalibrationStatisticsRatings(params));
  }, [activeList, period, filters, searchValue]);

  return {
    loading,
    statistics: (Object.entries(statistics) ?? []).reduce(
      (acc, [key, value]) => {
        if (initialRatingEnums.includes(key as RatingStatisticRatingEnum)) {
          return { ...acc, [key]: value };
        }
        return acc;
      },
      {
        [RatingStatisticRatingEnum.Outstanding]: initialTotal,
        [RatingStatisticRatingEnum.Great]: initialTotal,
        [RatingStatisticRatingEnum.Satisfactory]: initialTotal,
        [RatingStatisticRatingEnum.BelowExpected]: initialTotal,
        [RatingStatisticRatingEnum.Unsubmitted]: initialTotal,
      },
    ),
  };
};

import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import {
  CalibrationStatisticsRatingsAction,
  calibrationStatisticsRatingsDataSelector,
  calibrationStatisticsRatingsMetaSelector,
} from '@pma/store';

import useDispatch from 'hooks/useDispatch';
import { filterToRequest } from 'utils';
import { Ratings, View } from '../types';
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
  activeList: View;
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
      _search: searchValue || undefined,
      sessionUuid: uuid,
      ...(!uuid && {
        'colleague-cycle-status_in': [Status.FINISHED, Status.FINISHING, Status.STARTED],
        'timeline-point-status_in': [Status.STARTED, Status.FINISHING, Status.COMPLETED],
      }),
      ...(activeList !== View.LIST ? { 'review-rating_in': initialRatings } : {}),
      ...(period ? { year: period } : {}),
      ...filterToRequest(filters),
    };
    dispatch(CalibrationStatisticsRatingsAction.getCalibrationStatisticsRatings(params));
  }, [activeList, period, filters, searchValue]);

  return {
    loading,
    statistics: (Object.entries(statistics) ?? []).reduce(
      (acc, [key, value]) => {
        if (initialRatingEnums.includes(key as Ratings)) {
          return { ...acc, [key]: value };
        }
        return acc;
      },
      {
        [Ratings.Outstanding]: initialTotal,
        [Ratings.Great]: initialTotal,
        [Ratings.Satisfactory]: initialTotal,
        [Ratings.BelowExpected]: initialTotal,
        [Ratings.NewToBusiness]: initialTotal,
        [Ratings.Unsubmitted]: initialTotal,
      },
    ),
  };
};

import { useCallback, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { CalibrationReviewsAction, calibrationReviewsDataSelector } from '@pma/store';

import useDispatch from 'hooks/useDispatch';
import { Status } from 'config/enum';
import { initialFields, initialRatings } from '../config';
import { toLocalRating } from '../utils';
import { ActiveList } from '../types';
import { isNegative, filterToRequest } from 'utils';

export const useReviewsCalibrationList = ({
  activeList,
  uuid,
  period,
  filters,
}: {
  activeList: ActiveList;
  uuid?: string;
  period?: string;
  filters?: Array<any>;
}) => {
  const dispatch = useDispatch();
  const data = useSelector(calibrationReviewsDataSelector);

  const getCalibrationReviewsList = useCallback(
    ({ rating, _start, _limit }) => {
      const isSpaced = !isNegative(rating.indexOf(' '));
      const isScroll = _start || _limit;
      const params = {
        'review-rating_in': isSpaced ? [rating.toUpperCase().replace(' ', '_')] : [rating.toUpperCase()],
        'colleague-cycle-status_in': [Status.FINISHED, Status.FINISHING, Status.STARTED],
        ...(isScroll ? { _start, _limit } : initialFields),
        ...(uuid ? { sessionUuid: uuid } : {}),
        ...(period ? { year: period } : {}),
        ...filterToRequest(filters),
      };

      isScroll
        ? dispatch(
            CalibrationReviewsAction.uploadCalibrationUsersReviews({
              params,
              rating: toLocalRating(rating),
            }),
          )
        : dispatch(
            CalibrationReviewsAction.getUserCalibrationReviews({
              params,
              rating: toLocalRating(rating),
            }),
          );
    },
    [activeList, period, filters],
  );

  useEffect(() => {
    console.log({ filters });
    activeList === ActiveList.TABLE &&
      initialRatings.forEach((rating) => {
        getCalibrationReviewsList({ rating });
      });
  }, [activeList, period, filters]);

  return { getCalibrationReviewsList, data };
};

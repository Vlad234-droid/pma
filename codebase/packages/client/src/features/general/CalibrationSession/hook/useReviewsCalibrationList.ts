import { useCallback, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { CalibrationReviewsAction, calibrationReviewsDataSelector } from '@pma/store';

import useDispatch from 'hooks/useDispatch';
import { Status } from 'config/enum';
import { initialFields, initialRatings } from '../config';
import { toLocalRating } from '../utils';
import { View } from '../types';
import { isNegative, filterToRequest } from 'utils';

export const useReviewsCalibrationList = ({
  activeList,
  uuid,
  period,
  filters,
  searchValue,
}: {
  activeList: View;
  uuid?: string;
  period?: string;
  filters?: Array<any>;
  searchValue?: string;
}) => {
  const dispatch = useDispatch();
  const data = useSelector(calibrationReviewsDataSelector);

  const getCalibrationReviewsList = useCallback(
    ({ rating, _start, _limit, _search, filters }) => {
      const isSpaced = !isNegative(rating.indexOf(' '));
      const isScroll = _start || _limit;
      const params = {
        _search,
        'review-rating_in': isSpaced ? [rating.toUpperCase().replace(' ', '_')] : [rating.toUpperCase()],
        ...(!uuid && {
          'colleague-cycle-status_in': [Status.FINISHED, Status.FINISHING, Status.STARTED],
          'timeline-point-status_in': [Status.STARTED, Status.FINISHING, Status.COMPLETED],
        }),
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
    [activeList, period, searchValue],
  );

  useEffect(() => {
    activeList === View.TABLE &&
      initialRatings.forEach((rating) => {
        getCalibrationReviewsList({ rating, _search: searchValue, filters });
      });
  }, [activeList, period, filters, searchValue]);

  return { getCalibrationReviewsList, data };
};

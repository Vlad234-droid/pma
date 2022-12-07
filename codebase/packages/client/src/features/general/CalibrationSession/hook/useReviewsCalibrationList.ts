import { useCallback } from 'react';
import { CalibrationReviewsAction } from '@pma/store';
import useDispatch from 'hooks/useDispatch';
import { initialFields } from '../config';
import { toLocalRating } from '../utils';
import { isNegative } from 'utils';

export const useReviewsCalibrationList = (activeList, uuid = '') => {
  const dispatch = useDispatch();
  return useCallback(
    (rating: string, _start, _limit) => {
      const isSpaced = !isNegative(rating.indexOf(' '));
      const isScroll = _start || _limit;
      const params = {
        'review-rating_in': isSpaced ? [rating.toUpperCase().replace(' ', '_')] : [rating.toUpperCase()],
        ...(isScroll ? { _start, _limit } : initialFields),
        sessionUuid: uuid,
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
    [activeList],
  );
};

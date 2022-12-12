import { useCallback, useEffect } from 'react';
import { CalibrationReviewsAction } from '@pma/store';
import useDispatch from 'hooks/useDispatch';
import { initialFields, initialRatings } from '../config';
import { toLocalRating } from '../utils';
import { ActiveList } from '../types';
import { isNegative } from 'utils';

export const useReviewsCalibrationList = ({
  activeList,
  uuid,
  period,
}: {
  activeList: ActiveList;
  uuid?: string | undefined;
  period?: string | undefined;
}) => {
  const dispatch = useDispatch();

  const getCalibrationReviewsList = useCallback(
    ({ rating, _start, _limit }) => {
      const isSpaced = !isNegative(rating.indexOf(' '));
      const isScroll = _start || _limit;
      const params = {
        'review-rating_in': isSpaced ? [rating.toUpperCase().replace(' ', '_')] : [rating.toUpperCase()],
        ...(isScroll ? { _start, _limit } : initialFields),
        ...(uuid ? { sessionUuid: uuid } : {}),
        ...(period ? { year: period } : {}),
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
    [activeList, period],
  );

  useEffect(() => {
    activeList === ActiveList.TABLE &&
      initialRatings.forEach((rating) => {
        getCalibrationReviewsList({ rating });
      });
  }, [activeList, period]);

  return getCalibrationReviewsList;
};

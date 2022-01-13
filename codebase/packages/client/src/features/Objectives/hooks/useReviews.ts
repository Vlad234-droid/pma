import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ReviewsActions, reviewsMetaSelector, reviewsSelector } from '@pma/store';
import { ReviewActionParams } from 'config/interface';

function useReviews(params: ReviewActionParams) {
  const dispatch = useDispatch();

  const { data } = useSelector(reviewsSelector);
  const { loaded, loading } = useSelector(reviewsMetaSelector);

  const getReviews = useCallback(() => {
    if (params?.pathParams?.colleagueUuid) dispatch(ReviewsActions.getReviews(params));
  }, [params?.pathParams, data, loaded, loading]);

  useEffect(() => {
    getReviews();
  }, []);

  return [data, getReviews];
}

export default useReviews;

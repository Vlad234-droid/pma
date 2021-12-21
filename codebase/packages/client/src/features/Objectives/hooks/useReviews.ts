import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ReviewsActions, reviewsMetaSelector, reviewsSelector } from '@pma/store';
import { ReviewActionParams } from 'config/interface';
import { useLocation } from 'react-router-dom';
import { Page } from 'pages';

function useReviews(params: ReviewActionParams) {
  const dispatch = useDispatch();
  const location = useLocation();

  const { data } = useSelector(reviewsSelector);
  const { loaded, loading } = useSelector(reviewsMetaSelector);

  const getReviews = useCallback(() => {
    if (location.pathname === `/${Page.USER_OBJECTIVES}`) {
      const id = window.location.search.replace(/.*=/g, '');
      params.pathParams.colleagueUuid = id;
    }
    
    dispatch(ReviewsActions.getReviews(params));
  }, [data, loaded, loading]);

  useEffect(() => {
    getReviews();
  }, []);

  return [data, getReviews];
}

export default useReviews;

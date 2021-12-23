import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ReviewsActions, reviewsMetaSelector, reviewsSelector } from '@pma/store';
import { ReviewActionParams } from 'config/interface';
import { useLocation } from 'react-router-dom';
import { Page } from 'pages';
import { buildPath } from 'features/Routes';
import { paramsReplacer } from 'utils';

function useReviews(params: ReviewActionParams) {
  const dispatch = useDispatch();
  const location = useLocation();

  const { data } = useSelector(reviewsSelector);
  const { loaded, loading } = useSelector(reviewsMetaSelector);

  const getReviews = useCallback(() => {
    if (location.pathname.includes(paramsReplacer(buildPath(Page.USER_OBJECTIVES), {':uuid': ''}))) {
      const id = location.pathname.substring(location.pathname.lastIndexOf('/') + 1);
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

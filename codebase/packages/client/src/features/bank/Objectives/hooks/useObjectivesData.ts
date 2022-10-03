import { useEffect, useState } from 'react';
import {
  ColleagueActions,
  filterReviewsByTypeSelector,
  PreviousReviewFilesActions,
  ReviewsActions,
  reviewsMetaSelector,
  timelinesMetaSelector,
  TimelineActions,
} from '@pma/store';
import { useSelector } from 'react-redux';

//TODO: move utils to current feature
import { Objective } from '../type';
import { transformReviewsToObjectives } from '../utils';

import { ReviewType } from 'config/enum';
import useDispatch from 'hooks/useDispatch';

const useObjectivesData = (uuid: string) => {
  const dispatch = useDispatch();
  const { loaded: reviewLoaded, loading: reviewLoading } = useSelector(reviewsMetaSelector);
  const { loaded: timelineLoaded, loading: timelineLoading } = useSelector(timelinesMetaSelector);
  const data = useSelector(filterReviewsByTypeSelector(ReviewType.QUARTER));
  const [objectives, setObjectives] = useState<Objective[]>([]);

  useEffect(() => {
    dispatch(PreviousReviewFilesActions.getPreviousReviewFiles({ colleagueUUID: uuid }));
  }, []);

  useEffect(() => {
    if (reviewLoaded) {
      setObjectives(transformReviewsToObjectives(data));
    }
  }, [reviewLoaded]);

  useEffect(() => {
    dispatch(ReviewsActions.getReviews({ pathParams: { colleagueUuid: uuid, cycleUuid: 'CURRENT' } }));
    dispatch(TimelineActions.getUserTimeline({ colleagueUuid: uuid }));
    dispatch(ColleagueActions.getColleagueByUuid({ colleagueUuid: uuid }));
  }, [uuid]);

  return { objectives, meta: { loaded: reviewLoaded | timelineLoaded, loading: reviewLoading | timelineLoading } };
};

export default useObjectivesData;

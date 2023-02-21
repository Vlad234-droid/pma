import { useEffect, useState } from 'react';
import {
  ColleagueActions,
  filterReviewsByTypeSelector,
  PreviousReviewFilesActions,
  ReviewsActions,
  reviewsMetaSelector,
  timelinesMetaSelector,
  TimelineActions,
  colleagueCurrentCycleSelector,
} from '@pma/store';
import { useSelector } from 'react-redux';

//TODO: move utils to current feature
import { Objective } from '../type';
import { transformReviewsToObjectives } from '../utils';

import { ReviewType } from 'config/enum';
import useDispatch from 'hooks/useDispatch';

const useObjectivesData = (colleagueUuid: string) => {
  const dispatch = useDispatch();
  const { loaded: reviewLoaded, loading: reviewLoading, saved: reviewSaved } = useSelector(reviewsMetaSelector);
  const { loaded: timelineLoaded, loading: timelineLoading } = useSelector(timelinesMetaSelector);
  const data = useSelector(filterReviewsByTypeSelector(ReviewType.QUARTER));
  const [objectives, setObjectives] = useState<Objective[]>([]);
  const currentCycle = useSelector(colleagueCurrentCycleSelector(colleagueUuid));

  useEffect(() => {
    dispatch(PreviousReviewFilesActions.getPreviousReviewFiles({ colleagueUUID: colleagueUuid }));
  }, []);

  useEffect(() => {
    if (reviewLoaded) {
      setObjectives(transformReviewsToObjectives(data));
    }
  }, [reviewLoaded]);

  useEffect(() => {
    dispatch(ReviewsActions.getReviews({ pathParams: { colleagueUuid, cycleUuid: currentCycle } }));
    dispatch(TimelineActions.getUserTimeline({ colleagueUuid, cycleUuid: currentCycle }));
    //dispatch(ColleagueActions.getColleagueByUuid({ colleagueUuid }));
  }, [colleagueUuid, currentCycle]);

  useEffect(() => {
    dispatch(ReviewsActions.getReviews({ pathParams: { colleagueUuid, cycleUuid: currentCycle } }));
  }, [reviewSaved]);

  return { objectives, meta: { loaded: reviewLoaded | timelineLoaded, loading: reviewLoading | timelineLoading } };
};

export default useObjectivesData;

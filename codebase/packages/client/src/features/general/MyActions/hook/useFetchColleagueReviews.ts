import { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  ColleagueActions,
  reviewsMetaSelector,
  getColleagueMetaSelector,
  getManagersMetaSelector,
  schemaColleagueMetaSelector,
  timelinesMetaSelector,
  allUserTimelineSelector,
  ReviewsActions,
  SchemaActions,
  TimelineActions,
} from '@pma/store';

const useFetchColleagueReviews = (
  colleagueUuid: string | null,
  cyclesUuid: Array<string>,
  reviewsUuid: Array<string>,
) => {
  const dispatch = useDispatch();
  const timeline = useSelector(allUserTimelineSelector(colleagueUuid!)) || {};
  const { loaded: reviewsLoaded } = useSelector(reviewsMetaSelector) || {};
  const { loaded: timelineLoaded } = useSelector(timelinesMetaSelector) || {};
  const { loaded: colleagueLoaded } = useSelector(getColleagueMetaSelector) || {};
  const { loaded: managerLoaded } = useSelector(getManagersMetaSelector) || {};
  const { loaded: schemaLoaded } = useSelector(schemaColleagueMetaSelector(colleagueUuid!)) || { loaded: false };

  const cycleKeys = Object.keys(timeline).filter((val) => val !== 'CURRENT');
  const isTimelinesLoaded = useMemo(() => cyclesUuid.every((uuid) => cycleKeys.includes(uuid)), [cycleKeys]);

  useEffect(() => {
    if (colleagueUuid) {
      dispatch(ColleagueActions.getColleagueByUuid({ colleagueUuid }));

      reviewsUuid.forEach((uuid) => {
        dispatch(ReviewsActions.getReviewByUuid({ uuid }));
      });
    }
  }, [colleagueUuid]);

  useEffect(() => {
    if (colleagueUuid && colleagueLoaded && reviewsLoaded) {
      cyclesUuid.forEach((cycleUuid) => {
        dispatch(TimelineActions.getUserTimeline({ colleagueUuid, cycleUuid }));
      });
    }
  }, [colleagueUuid, reviewsLoaded, colleagueLoaded]);

  useEffect(() => {
    if (colleagueUuid && colleagueLoaded && reviewsLoaded && timelineLoaded && isTimelinesLoaded) {
      cyclesUuid.forEach((cycleUuid) => {
        dispatch(
          SchemaActions.getColleagueSchema({
            colleagueUuid: colleagueUuid,
            cycleUuid,
          }),
        );
      });
    }
  }, [colleagueUuid, reviewsLoaded, colleagueLoaded, timelineLoaded, isTimelinesLoaded]);

  return {
    loading: !!(colleagueUuid && !(schemaLoaded && managerLoaded)),
    loaded: !!(schemaLoaded && managerLoaded && colleagueUuid),
  };
};

export default useFetchColleagueReviews;

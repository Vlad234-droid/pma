import { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  ColleagueActions,
  getAllEmployees,
  reviewsMetaSelector,
  getColleagueMetaSelector,
  getManagersMetaSelector,
  schemaColleagueMetaSelector,
  timelinesMetaSelector,
  allUserTimelineSelector,
  ReviewsActions,
  SchemaActions,
  ManagersActions,
  TimelineActions,
} from '@pma/store';
import { ColleagueView } from '@pma/openapi';
import { Status } from 'config/enum';

const useFetchColleagueReviews = (colleagueUuid: string | null, colleague: ColleagueView) => {
  const dispatch = useDispatch();
  const timeline = useSelector(allUserTimelineSelector(colleagueUuid!)) || {};
  const colleagueApprovedReviews = useSelector((state) => getAllEmployees(state, 'APPROVED')) || null;
  const { loaded: reviewsLoaded } = useSelector(reviewsMetaSelector) || {};
  const { loaded: timelineLoaded } = useSelector(timelinesMetaSelector) || {};
  const { loaded: colleagueLoaded } = useSelector(getColleagueMetaSelector) || {};
  const { loaded: managerLoaded } = useSelector(getManagersMetaSelector) || {};
  const { loaded: schemaLoaded } = useSelector(schemaColleagueMetaSelector(colleagueUuid!)) || { loaded: false };

  const cycleKeys = Object.keys(timeline).filter((val) => val !== 'CURRENT');
  const cyclesUuid = useMemo(
    () => [...new Set(colleague?.timeline?.map(({ cycleUuid }) => cycleUuid))] as string[],
    [colleague.uuid],
  );
  const isTimelinesLoaded = useMemo(() => cyclesUuid.every((uuid) => cycleKeys.includes(uuid)), [cycleKeys]);

  useEffect(() => {
    if (colleagueUuid) {
      dispatch(ColleagueActions.getColleagueByUuid({ colleagueUuid }));

      colleague?.reviews?.forEach(({ uuid }) => {
        dispatch(ReviewsActions.getReviewByUuid({ uuid }));
      });

      if (colleagueApprovedReviews !== null) {
        dispatch(
          ManagersActions.getManagerReviews({
            colleagueUuid,
            'review-status_in': [Status.APPROVED],
            'colleague-cycle-status_in': [Status.STARTED, Status.FINISHED, Status.FINISHING, Status.COMPLETED],
            'review-type_in': ['OBJECTIVE'],
            status: Status.APPROVED,
          }),
        );
      }
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

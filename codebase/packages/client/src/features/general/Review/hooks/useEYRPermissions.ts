import { useSelector } from 'react-redux';
import {
  colleagueCurrentCycleSelector,
  colleagueCycleDataSelector,
  getColleagueSelector,
  getReviewByTypeSelector,
  getTimelineByReviewTypeSelector,
} from '@pma/store';
import { useParams } from 'react-router-dom';
import { Review, ReviewType, Status } from 'config/types';
import { usePermissions } from './usePermissions';

export const useEYRPermissions = (reviewType: ReviewType.MYR | ReviewType.EYR) => {
  const { uuid } = useParams<{ uuid: string }>();

  const { isPeopleTeam, isLineManager, isTalentAdmin } = usePermissions();

  const colleagueUuid = uuid!;
  const colleague = useSelector(getColleagueSelector(colleagueUuid));
  const review: Review = useSelector(getReviewByTypeSelector(reviewType)) || {};
  const currentCycle = useSelector(colleagueCurrentCycleSelector(colleagueUuid));
  const cycle = useSelector(colleagueCycleDataSelector(colleagueUuid, currentCycle));
  const timeline = useSelector(getTimelineByReviewTypeSelector(reviewType, colleagueUuid, currentCycle)) || ({} as any);

  const yerOpenForPT =
    reviewType === ReviewType.EYR &&
    isPeopleTeam &&
    review?.status === Status.APPROVED &&
    [Status.LOCKED, Status.FINISHING].includes(timeline?.status);

  const yerOpenForLN =
    isLineManager &&
    reviewType === ReviewType.EYR &&
    ![Status.LOCKED, Status.FINISHING, Status.COMPLETED].includes(timeline?.status);

  const cycleCompletedCondition = cycle?.status && [Status.COMPLETED, Status.FINISHING].includes(cycle.status);

  const declineCondition =
    !isTalentAdmin &&
    !cycleCompletedCondition &&
    yerOpenForLN &&
    (review.status === Status.APPROVED || review.status === Status.WAITING_FOR_APPROVAL);

  const approveCondition =
    !isTalentAdmin &&
    !cycleCompletedCondition &&
    ((yerOpenForLN && review.status === Status.WAITING_FOR_APPROVAL) || yerOpenForPT);

  return {
    timeline,
    declineCondition,
    approveCondition,
    readonly: !yerOpenForPT || cycleCompletedCondition,
    currentCycle,
    colleague,
    colleagueUuid,
    review,
  };
};

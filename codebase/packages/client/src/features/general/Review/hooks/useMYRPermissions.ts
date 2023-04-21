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
import { useRolesPermission } from 'hooks/useRolesPermission';

export const useMYRPermissions = (reviewType: ReviewType.MYR | ReviewType.EYR) => {
  const { uuid } = useParams<{ uuid: string }>();

  const { isLineManager } = useRolesPermission();

  const colleagueUuid = uuid!;
  const colleague = useSelector(getColleagueSelector(colleagueUuid));
  const review: Review = useSelector(getReviewByTypeSelector(reviewType)) || {};
  const currentCycle = useSelector(colleagueCurrentCycleSelector(colleagueUuid));
  const cycle = useSelector(colleagueCycleDataSelector(colleagueUuid, currentCycle));
  const timeline = useSelector(getTimelineByReviewTypeSelector(reviewType, colleagueUuid, currentCycle)) || ({} as any);

  const cycleCompletedCondition = cycle?.status && [Status.COMPLETED, Status.FINISHED].includes(cycle.status);

  const declineCondition =
    !cycleCompletedCondition &&
    isLineManager &&
    (review.status === Status.APPROVED || review.status === Status.WAITING_FOR_APPROVAL);

  const approveCondition = isLineManager && !cycleCompletedCondition && review.status === Status.WAITING_FOR_APPROVAL;

  return {
    timeline,
    declineCondition,
    approveCondition,
    readonly: true,
    currentCycle,
    colleague,
    colleagueUuid,
    review,
    cycleCompletedCondition,
  };
};

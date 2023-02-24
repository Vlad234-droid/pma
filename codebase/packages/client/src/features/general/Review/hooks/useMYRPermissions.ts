import { useSelector } from 'react-redux';
import {
  colleagueCurrentCycleSelector,
  colleagueCycleDataSelector,
  getColleagueSelector,
  getReviewByTypeSelector,
  getTimelineByReviewTypeSelector,
} from '@pma/store';
import { useParams } from 'react-router-dom';
import { role, usePermission } from 'features/general/Permission';
import { Review, ReviewType, Status } from 'config/types';

export const useMYRPermissions = (reviewType: ReviewType.MYR | ReviewType.EYR) => {
  const { uuid } = useParams<{ uuid: string }>();

  const isLineManager = usePermission([role.LINE_MANAGER]);

  const colleagueUuid = uuid!;
  const colleague = useSelector(getColleagueSelector(colleagueUuid));
  const review: Review = useSelector(getReviewByTypeSelector(reviewType)) || {};
  const currentCycle = useSelector(colleagueCurrentCycleSelector(colleagueUuid));
  const cycle = useSelector(colleagueCycleDataSelector(colleagueUuid, currentCycle));
  const timeline = useSelector(getTimelineByReviewTypeSelector(reviewType, colleagueUuid, currentCycle)) || ({} as any);

  const cycleCompletedCondition = cycle?.status && [Status.COMPLETED, Status.FINISHING].includes(cycle.status);

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
  };
};

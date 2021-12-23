import { ReviewType, Status } from 'config/enum';

export const filterApprovedFn = (tl) => tl.status === Status.WAITING_FOR_APPROVAL;

export const filterApprovedReviewTimelineFn = (tl) =>
  tl.status === Status.WAITING_FOR_APPROVAL && tl.reviewType !== ReviewType.OBJECTIVE;

export const filterApprovedReviewFn = (review) => review.timeline.some(filterApprovedReviewTimelineFn);

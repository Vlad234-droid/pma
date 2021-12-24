import { ReviewType, Status } from 'config/enum';

export const filterApprovedFn = (tl) => tl.status === Status.WAITING_FOR_APPROVAL;

export const filterApprovedReviewTimelineFn = (tl) =>
  tl.status === Status.WAITING_FOR_APPROVAL && tl.reviewType !== ReviewType.OBJECTIVE;

export const filterApprovedReviewFn = (review) => review.timeline.some(filterApprovedReviewTimelineFn);

export const getDeclineReasonOptions = (t) => [
  {
    value: 'Aligned to strategic priorities',
    label: t('aligned_to_strategic_priorities', 'Aligned to strategic priorities'),
  },
  { value: 'Ambitious enough', label: t('ambitious_enough', 'Ambitious enough') },
  { value: 'Easily assessable', label: t('easily_assessable', 'Easily assessable') },
  { value: 'Something else', label: t('something_else', 'Something else') },
  { value: 'I will pick up with you offline', label: t('', 'I will pick up with you offline') },
];

export const getReviewTypeTitle = (t) => ({
  [ReviewType.OBJECTIVE]: t('objectives', 'Objectives'),
  [ReviewType.MYR]: t('mid_year_review', 'Mid-year review'),
  [ReviewType.EYR]: t('year_end_review', 'Year-end review'),
});

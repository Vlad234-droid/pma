import { ReviewType, Status } from 'config/enum';

export const filterApprovedFn = (tl) => tl.summaryStatus === Status.WAITING_FOR_APPROVAL;

export const filterCompletedFn = (tl) => tl.summaryStatus === Status.APPROVED;

export const filterApprovedReviewTimelineFn = (tl) =>
  tl.summaryStatus === Status.WAITING_FOR_APPROVAL && tl.reviewType !== ReviewType.OBJECTIVE;

export const filterApprovedReviewFn = (review) => review.timeline.some(filterApprovedReviewTimelineFn);

export const getDeclineReasonOptions = (t) => [
  {
    value: 'Aligned to strategic priorities',
    label: t('aligned_to_strategic_priorities', 'Aligned to strategic priorities'),
  },
  { value: 'Ambitious enough', label: t('ambitious_enough', 'Ambitious enough') },
  { value: 'Easily assessable', label: t('easily_assessable', 'Easily assessable') },
  { value: 'Something else, I will pick up with you offline', label: t('something_else', 'Something else') },
];

export const groupArrayOfObjects = (list, key) => {
  return list.reduce((rv, x) => {
    (rv[x[key]] = rv[x[key]] || []).push(x);
    return rv;
  }, {});
};

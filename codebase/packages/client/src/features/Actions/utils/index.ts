import { ReviewType, Status } from 'config/enum';
import { cleanFromDsl, dslRequest } from '../../../utils';

export const filterApprovedFn = (tl) => tl.status === Status.WAITING_FOR_APPROVAL;

export const filterCompletedFn = (tl) => tl.status === Status.APPROVED;

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
  { value: 'Something else, I will pick up with you offline', label: t('something_else', 'Something else') },
];

export const getReviewTypeTitle = (t) => ({
  [ReviewType.OBJECTIVE]: t('objectives', 'Objectives'),
  [ReviewType.MYR]: t('mid_year_review', 'Mid-year review'),
  [ReviewType.EYR]: t('year_end_review', 'Year-end review'),
});

// todo move to epic
export const updateFormComponent = (components: any[], count: number) => {
  const newComponents: any[] = [];
  components?.forEach((component) => {
    const textWithDsl = component?.type === 'text' ? component?.text : component?.description;
    const dslReviewArray: string[] = dslRequest(textWithDsl);
    if (dslReviewArray?.length) {
      [...Array(count)].forEach((_, index) =>
        newComponents.push(
          cleanFromDsl({
            ...component,
            // todo ask backend about rules for replace.
            ...(component?.key ? { key: component?.key?.replace(component?.key, `${component?.key}-${index}`) } : {}),
            ...(component?.label ? { label: component?.label?.replace('Objective', `Objective ${index + 1}`) } : {}),
          }),
        ),
      );
    } else {
      newComponents.push(cleanFromDsl(component));
    }
  });
  return newComponents;
};

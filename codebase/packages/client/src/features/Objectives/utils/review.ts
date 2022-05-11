import { ReviewType, Status } from 'config/enum';
import { TFunction } from '../../../components/Translation';

/**
 * Available for min review count and status in [ DRAFT, DECLINED ]
 */
export const canEditAllObjectiveFn = ({
  objectiveSchema,
  countDraftReviews,
  countDeclinedReviews,
  countWaitingForApprovalReviews,
}: {
  objectiveSchema: any;
  countDraftReviews: number;
  countDeclinedReviews: number;
  countWaitingForApprovalReviews: number;
}) => {
  const { markup = { max: 0, min: 0 } } = objectiveSchema;

  if (countWaitingForApprovalReviews > 0) {
    return false;
  }

  return countDraftReviews > 0 || countDeclinedReviews === markup.min;
};

/**
 * Available for max review count and status in [ DRAFT, DECLINED, APPROVED ]
 * Available for min review count and status in [ APPROVED ]
 */
export const canEditSingleObjectiveFn = ({ status }: { status: Status }) => {
  const allowedStatus = [Status.APPROVED, Status.DECLINED, Status.DRAFT].includes(status);

  return allowedStatus;
};

/**
 * Available for max review count and status in [ DRAFT, DECLINED, APPROVED ] id  reviews > min
 */
export const canDeleteSingleObjectiveFn = ({
  status,
  objectiveSchema,
  countDraftReviews,
  countDeclinedReviews,
  countApprovedReviews,
}: {
  status: Status;
  objectiveSchema: any;
  countDraftReviews: number;
  countDeclinedReviews: number;
  countApprovedReviews: number;
}) => {
  const { markup = { max: 0, min: 0 } } = objectiveSchema;
  const allowedStatus = [Status.APPROVED, Status.DECLINED, Status.DRAFT].includes(status);

  return (
    (countDraftReviews > markup.min || countDeclinedReviews > markup.min || countApprovedReviews > markup.min) &&
    allowedStatus
  );
};

export enum REVIEW_MODIFICATION_MODE {
  NONE,
  SINGLE,
  MULTI,
}

export const reviewModificationModeFn = (countReviews: number, objectiveSchema: any) => {
  const { markup = { max: 0, min: 0 } } = objectiveSchema;

  if (countReviews >= markup.max) {
    return REVIEW_MODIFICATION_MODE.NONE;
  } else if (countReviews >= markup.min && markup.max > markup.min) {
    return REVIEW_MODIFICATION_MODE.SINGLE;
  }

  return REVIEW_MODIFICATION_MODE.MULTI;
};

export const getReviewFormContent = (reviewType: ReviewType, t: TFunction) => {
  const contents: {
    [key: string]: {
      title: string;
      helperText: string;
    };
  } = {
    [ReviewType.MYR]: {
      title: t('mid_year_review_title', 'How is your year going so far?'),
      helperText: t(
        'mid_year_review_help_text',
        'Use this to capture a summary of the mid-year conversation you’ve had with your line manager. Remember to focus as much on your how as your what.',
      ),
    },
    [ReviewType.EYR]: {
      title: t('end_year_review_title', 'What have you contributed this year and how have you gone about it?'),
      helperText: t(
        'end_year_review_help_text',
        'Use this to capture the outcome of the conversation you’ve had with your line manager. Remember to focus as much on your how as your what. Use the look forward section to capture your priorities and development for the year ahead.',
      ),
    },
  };

  return contents[reviewType];
};

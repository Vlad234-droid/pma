import { Status } from 'config/enum';

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
export const canEditSingleObjectiveFn = ({
  status,
  objectiveSchema,
  number,
}: {
  status: Status;
  objectiveSchema: any;
  number: number;
}) => {
  const allowedStatus = [Status.APPROVED, Status.DECLINED].includes(status);
  const { markup = { max: 0, min: 0 } } = objectiveSchema;

  return allowedStatus || (status === Status.DRAFT && number > markup.min);
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

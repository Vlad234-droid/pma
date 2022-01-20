import { Status } from 'config/enum';

/**
 * Available for min review count and status in [ DRAFT, DECLINED ]
 */
export const canEditAllObjectiveFn = ({
  objectiveSchema,
  countDraftReviews,
  countDeclinedReviews,
}: {
  objectiveSchema: any;
  countDraftReviews: number;
  countDeclinedReviews: number;
}) => {
  const { markup = { max: 0, min: 0 } } = objectiveSchema;

  return (
    (countDraftReviews <= markup.min && countDraftReviews > 0) ||
    (countDeclinedReviews <= markup.min && countDeclinedReviews > 0)
  );
};

/**
 * Available for max review count and status in [ DRAFT, DECLINED, APPROVED ]
 * Available for min review count and status in [ APPROVED ]
 */
export const canEditSingleObjectiveFn = ({
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
    (countDraftReviews > markup.min || countDeclinedReviews > markup.min || countApprovedReviews >= markup.min) &&
    allowedStatus
  );
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

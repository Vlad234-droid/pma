import { Status } from 'config/enum';

/**
 * Available for min review count and status in [ DRAFT, DECLINED ]
 */
export const checkIfCanEditAllObjective = (timelinePoint: any) => {
  const { properties, statistics } = timelinePoint || { properties: {}, statistics: {} };
  const draftCount = statistics?.[Status.DRAFT] || '0';
  const declinedCount = statistics?.[Status.DECLINED] || '0';
  const waitingForApprovalCount = statistics?.[Status.WAITING_FOR_APPROVAL] || '0';

  if (waitingForApprovalCount > 0) {
    return false;
  }

  return draftCount > 0 || declinedCount === properties?.pm_review_min;
};

/**
 * Available for max review count and status in [ DRAFT, DECLINED, APPROVED ]
 * Available for min review count and status in [ APPROVED ]
 */
export const checkIfCanEditObjective = ({
  status,
  timelinePoint,
  number,
}: {
  status: Status;
  timelinePoint: any;
  number: number;
}) => {
  const allowedStatus = [Status.APPROVED, Status.DECLINED].includes(status);
  const { properties } = timelinePoint || { properties: {}, statistics: {} };

  return allowedStatus || (status === Status.DRAFT && number > properties?.pm_review_min);
};

/**
 * Available for max review count and status in [ DRAFT, DECLINED, APPROVED ] id  reviews > min
 */
export const checkIfCanDeleteObjective = ({ status, timelinePoint }: { status: Status; timelinePoint: any }) => {
  const { properties, statistics } = timelinePoint || { properties: {}, statistics: {} };
  const draftCount = parseInt(statistics?.[Status.DRAFT] || '0');
  const declinedCount = parseInt(statistics?.[Status.DECLINED] || '0');
  const approvedCount = parseInt(statistics?.[Status.APPROVED] || '0');

  const allowedStatus = [Status.APPROVED, Status.DECLINED, Status.DRAFT].includes(status);

  if (!allowedStatus) return false;

  return (
    draftCount > properties?.pm_review_min ||
    declinedCount > properties?.pm_review_min ||
    approvedCount > properties?.pm_review_min
  );
};

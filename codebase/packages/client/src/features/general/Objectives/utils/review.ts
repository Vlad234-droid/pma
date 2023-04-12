import { Status } from 'config/enum';

/**
 * Available for min review count and status in [ DRAFT, DECLINED ]
 */
export const checkIfCanEditAllObjective = (timelinePoint: any) => {
  const { properties, statistics } = timelinePoint || { properties: {}, statistics: {} };
  const draftCount = Number(statistics?.[Status.DRAFT]?.count || '0');
  const declinedCount = Number(statistics?.[Status.DECLINED]?.count || '0');
  const waitingForApprovalCount = Number(statistics?.[Status.WAITING_FOR_APPROVAL]?.count || '0');

  if (waitingForApprovalCount > 0) {
    return false;
  }

  return draftCount > 0 || declinedCount === Number(properties?.pm_review_min);
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

  return allowedStatus || (status === Status.DRAFT && number > Number(properties?.pm_review_min));
};

/**
 * Available for max review count and status in [ DRAFT, DECLINED, APPROVED ] id  reviews > min
 */
export const checkIfCanDeleteObjective = ({ status, timelinePoint }: { status: Status; timelinePoint: any }) => {
  const { properties, statistics } = timelinePoint || { properties: {}, statistics: {} };
  const draftCount = Number(statistics?.[Status.DRAFT]?.count || '0');
  const declinedCount = Number(statistics?.[Status.DECLINED]?.count || '0');
  const approvedCount = Number(statistics?.[Status.APPROVED]?.count || '0');
  const min = Number(properties?.pm_review_min);

  const allowedStatus = [Status.APPROVED, Status.DECLINED, Status.DRAFT].includes(status);

  if (!allowedStatus) return false;

  return draftCount > min || declinedCount > min || approvedCount > min;
};

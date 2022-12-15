import { calibrationReviewDataSelector, colleagueInfo, colleagueUUIDSelector } from '@pma/store';
import { useParams, useSearchParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { role, usePermission } from 'features/general/Permission';
import { Status } from 'config/enum';

export const usePermissions = () => {
  const { uuid, userUuid: colleagueUuid } = useParams<{ uuid: string; userUuid: string }>() as {
    uuid: string;
    userUuid: string;
  };
  const [searchParams] = useSearchParams();

  const sessionMode = JSON.parse(searchParams.get('sessionMode') ?? 'false');

  const isPerformForPP = usePermission([role.PEOPLE_TEAM]);
  const isPerformForLN = usePermission([role.LINE_MANAGER]);
  const isPerformForTA = usePermission([role.TALENT_ADMIN]);

  const userUuid = useSelector(colleagueUUIDSelector);
  const { managerUuid } = useSelector(colleagueInfo);
  const calibrationReview = useSelector(calibrationReviewDataSelector(colleagueUuid)) || {};

  const directReport = userUuid === managerUuid;
  const isNew = uuid === 'new';

  const isDraft = calibrationReview?.status === Status.DRAFT || isNew;
  const LNDisabledStatuses =
    calibrationReview?.status === Status.APPROVED ||
    calibrationReview?.status === Status.COMPLETED ||
    calibrationReview?.status === Status.WAITING_FOR_COMPLETION;

  const isLNwithPP = isPerformForLN && isPerformForPP && directReport;
  const isLNwithTA = isPerformForLN && isPerformForTA && directReport;

  const editablePPSession =
    calibrationReview?.status === Status.APPROVED || calibrationReview?.status === Status.WAITING_FOR_COMPLETION;

  const readOnly = isPerformForTA
    ? true
    : sessionMode
    ? !editablePPSession
    : isPerformForTA && isLNwithTA
    ? !isDraft && LNDisabledStatuses
    : isPerformForPP && isLNwithPP
    ? !isDraft && LNDisabledStatuses
    : isPerformForPP && !isLNwithPP && !isLNwithTA && !sessionMode
    ? (!isDraft && LNDisabledStatuses) || calibrationReview?.status === Status.WAITING_FOR_APPROVAL
    : isPerformForLN && !isLNwithPP && !isLNwithTA
    ? !isDraft && LNDisabledStatuses
    : true;

  return { isNew, isDraft, readOnly, sessionMode, editablePPSession };
};

import {
  calibrationReviewDataSelector,
  colleagueCurrentCycleSelector,
  colleagueInfo,
  colleagueUUIDSelector,
  getCalibrationPointSelector,
} from '@pma/store';
import { useParams, useSearchParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { role, usePermission } from 'features/general/Permission';
import { Status } from 'config/enum';
import { isDateFromISOAfterNow } from 'utils';

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
  const currentCycle = useSelector(colleagueCurrentCycleSelector(colleagueUuid));
  const { endTime } = useSelector(getCalibrationPointSelector(colleagueUuid, currentCycle));
  const isFinished = isDateFromISOAfterNow(endTime);

  const directReport = userUuid === managerUuid;
  const isNew = uuid === 'new';

  const isDraft = calibrationReview?.status === Status.DRAFT || isNew;
  const LNDisabledStatuses =
    calibrationReview?.status === Status.APPROVED ||
    calibrationReview?.status === Status.COMPLETED ||
    calibrationReview?.status === Status.WAITING_FOR_COMPLETION;

  const isLNwithPP = isPerformForLN && isPerformForPP && directReport;
  const isLNwithTA = isPerformForLN && isPerformForTA && directReport;
  const sessionModeCreate = sessionMode && isDraft;

  const editablePPSession =
    calibrationReview?.status === Status.APPROVED || calibrationReview?.status === Status.WAITING_FOR_COMPLETION;

  const checkPerformMode = () => {
    if (isFinished) return true;
    if (sessionModeCreate) return false;
    if (sessionMode) return !editablePPSession;
    if (isPerformForTA && isLNwithTA) return !isDraft && LNDisabledStatuses;
    if (isPerformForPP && isLNwithPP) return !isDraft && LNDisabledStatuses;
    if (isPerformForPP && !isLNwithPP && !isLNwithTA && !sessionMode)
      return (!isDraft && LNDisabledStatuses) || calibrationReview?.status === Status.WAITING_FOR_APPROVAL;
    if (isPerformForLN && !isLNwithPP && !isLNwithTA) return !isDraft && LNDisabledStatuses;
    if (isPerformForTA) return true;
    return true;
  };

  const readOnly = checkPerformMode();

  return { isNew, isDraft, readOnly, sessionMode, editablePPSession, sessionModeCreate };
};

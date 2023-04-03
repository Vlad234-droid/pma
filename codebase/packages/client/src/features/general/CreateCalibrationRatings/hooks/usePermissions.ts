import { calibrationReviewDataSelector, colleagueCurrentCycleSelector, getCalibrationPointSelector } from '@pma/store';
import { useLocation, useParams, useSearchParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Status } from 'config/enum';
import { isDateFromISOAfterNow } from 'utils';
import { useCurrentCycle } from 'hooks/useCurrentCycle';
import { useRolesPermission } from 'hooks/useRolesPermission';

export const usePermissions = () => {
  const { state } = useLocation();
  const { currentCycle: cycle } = (state as any) || {};
  const { uuid, userUuid: colleagueUuid } = useParams<{ uuid: string; userUuid: string }>() as {
    uuid: string;
    userUuid: string;
  };
  const [searchParams] = useSearchParams();

  const sessionMode = JSON.parse(searchParams.get('sessionMode') ?? 'false');

  const {
    isLineManager: isPerformForLM,
    isTalentAdmin: isPerformForTA,
    isPeopleTeam: isPerformForPP,
  } = useRolesPermission(colleagueUuid);

  const { status: cycleStatus } = useCurrentCycle(colleagueUuid);

  const currentCycle = useSelector(colleagueCurrentCycleSelector(colleagueUuid));
  const calibrationReview = useSelector(calibrationReviewDataSelector(colleagueUuid)) || {};
  const { endTime, status: TLPStatus } = useSelector(getCalibrationPointSelector(colleagueUuid, cycle || currentCycle));
  const isFinished =
    isDateFromISOAfterNow(endTime) ||
    TLPStatus === Status.COMPLETED ||
    [Status.COMPLETED, Status.FINISHED].includes(cycleStatus);

  const isNew = uuid === 'new';

  const isDraft = calibrationReview?.status === Status.DRAFT || isNew;
  const LMDisabledStatuses =
    calibrationReview?.status === Status.APPROVED ||
    calibrationReview?.status === Status.COMPLETED ||
    calibrationReview?.status === Status.WAITING_FOR_COMPLETION;

  const isLMwithPP = isPerformForLM && isPerformForPP;
  const isLMwithTA = isPerformForLM && isPerformForTA;
  const sessionModeCreate = sessionMode && isDraft;

  const editablePPSession =
    calibrationReview?.status === Status.APPROVED || calibrationReview?.status === Status.WAITING_FOR_COMPLETION;

  const checkPerformMode = () => {
    if (isFinished) return true;
    if (sessionModeCreate) return false;
    if (sessionMode) return !editablePPSession;
    if (isPerformForTA && isLMwithTA) return !isDraft && LMDisabledStatuses;
    if (isPerformForPP && isLMwithPP) return !isDraft && LMDisabledStatuses;
    if (isPerformForPP && !isLMwithPP && !isLMwithTA && !sessionMode)
      return (!isDraft && LMDisabledStatuses) || calibrationReview?.status === Status.WAITING_FOR_APPROVAL;
    if (isPerformForLM && !isLMwithPP && !isLMwithTA) return !isDraft && LMDisabledStatuses;
    if (isPerformForTA) return true;
    return true;
  };

  const readOnly = checkPerformMode();

  return { isNew, isDraft, readOnly, sessionMode, editablePPSession, sessionModeCreate };
};

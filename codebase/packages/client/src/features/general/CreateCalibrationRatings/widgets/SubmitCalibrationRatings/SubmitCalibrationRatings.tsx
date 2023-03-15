import React, { FC, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
  CalibrationReviewAction,
  calibrationReviewDataSelector,
  calibrationReviewMetaSelector,
  isAnniversaryTimelineType,
  getCalibrationPointSelector,
  colleagueCurrentCycleSelector,
} from '@pma/store';

import { buildPath } from 'features/general/Routes';
import { Page } from 'pages';
import { paramsReplacer, isDateFromISOAfterNow } from 'utils';
import BaseWidget from 'components/BaseWidget';
import Spinner from 'components/Spinner';
import { useTranslation } from 'components/Translation';
import useDispatch from 'hooks/useDispatch';
import { Status } from 'config/enum';
import { role, usePermission } from 'features/general/Permission';

type Props = {
  userUuid: string;
};

const SubmitCalibrationRatings: FC<Props> = React.memo(({ userUuid }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { pathname, state } = useLocation();
  const { backPath, filters } = (state as any) || {};
  const isLineManager = usePermission([role.LINE_MANAGER]);

  const calibrationReview = useSelector(calibrationReviewDataSelector(userUuid)) || null;
  const currentCycle = useSelector(colleagueCurrentCycleSelector(userUuid));

  const {
    endTime,
    startTime,
    status: TLPStatus,
    statistics = {},
  } = useSelector(getCalibrationPointSelector(userUuid, currentCycle));
  const isAnniversaryColleague = useSelector(isAnniversaryTimelineType(userUuid, currentCycle));
  const { loading } = useSelector(calibrationReviewMetaSelector);

  const { uuid = 'new', status: reviewStatus } = calibrationReview || {};
  const statisticsKeys = Object.keys(statistics);
  const hasStatistics = statisticsKeys.length > 0;
  const status = hasStatistics ? statisticsKeys[0] : reviewStatus;
  const isActivePoint = TLPStatus !== Status.NOT_STARTED && isDateFromISOAfterNow(startTime);
  const isFinished = isDateFromISOAfterNow(endTime);

  const isSubmitting = uuid === 'new' || status === Status.DRAFT;
  const isEditing = !isSubmitting && status === Status.WAITING_FOR_APPROVAL;
  const isViewing =
    reviewStatus === Status.APPROVED ||
    !isLineManager ||
    isFinished ||
    (!isSubmitting && !isEditing && status !== Status.WAITING_FOR_APPROVAL);

  useEffect(() => {
    if (!isActivePoint || isAnniversaryColleague || !hasStatistics) return;
    dispatch(CalibrationReviewAction.getCalibrationReview({ colleagueUuid: userUuid, cycleUuid: currentCycle }));
  }, [isActivePoint, currentCycle, hasStatistics]);

  if (loading) return <Spinner />;
  if (isAnniversaryColleague || !isActivePoint || (isFinished && !calibrationReview)) return null;

  return (
    <BaseWidget
      buttonTitle={'view'}
      iconGraphic={isSubmitting || isEditing ? 'edit' : 'rating'}
      title={
        isViewing
          ? t('view_calibration_ratings', 'View Calibration ratings')
          : isSubmitting
          ? t('submit_calibration_ratings', 'Submit Calibration ratings')
          : isEditing
          ? t('edit_calibration_ratings', 'Edit Calibration ratings')
          : ''
      }
      description={
        isSubmitting
          ? t('ratings_ready_to_submit', 'Ratings ready to submit')
          : isViewing || isEditing
          ? t('ratings_are_submitted', 'Ratings are submitted')
          : ''
      }
      customStyle={{ cursor: 'pointer' }}
      background={isViewing ? 'white' : 'tescoBlue'}
      onClick={() =>
        navigate(buildPath(paramsReplacer(Page.CREATE_CALIBRATION_RATING, { ':userUuid': userUuid, ':uuid': uuid })), {
          state: { backPath: pathname, prevBackPath: backPath, filters, currentCycle },
        })
      }
    />
  );
});

export default SubmitCalibrationRatings;

import React, { FC, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
  CalibrationReviewAction,
  calibrationReviewDataSelector,
  calibrationReviewMetaSelector,
  colleagueCurrentCycleSelector,
  colleagueUUIDSelector,
  isAnniversaryTimelineType,
} from '@pma/store';

import BaseWidget from 'components/BaseWidget';
import { buildPath } from 'features/general/Routes';
import { Page } from 'pages';
import { paramsReplacer } from 'utils';
import { useTranslation } from 'components/Translation';
import useDispatch from 'hooks/useDispatch';
import { Status } from 'config/enum';

type Props = {
  userUuid: string;
};

const SubmitCalibrationRatings: FC<Props> = ({ userUuid }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const calibrationReview = useSelector(calibrationReviewDataSelector(userUuid)) || {};
  const colleagueUuid = useSelector(colleagueUUIDSelector);
  const currentCycle = useSelector(colleagueCurrentCycleSelector(colleagueUuid));
  const isAnniversary = useSelector(isAnniversaryTimelineType(colleagueUuid, currentCycle));
  const { loading } = useSelector(calibrationReviewMetaSelector);

  useEffect(() => {
    !isAnniversary &&
      dispatch(CalibrationReviewAction.getCalibrationReview({ colleagueUuid: userUuid, cycleUuid: 'CURRENT' }));
  }, []);

  if (isAnniversary || loading) return null;

  const { uuid = 'new', status } = calibrationReview;

  if (status === Status.WAITING_FOR_APPROVAL) return null;

  return (
    <BaseWidget
      iconGraphic={'edit'}
      title={t('submit_calibration_ratings', 'Submit calibration ratings')}
      description={t('ratings_ready_to_submit', 'Ratings ready to submit')}
      customStyle={{ cursor: 'pointer' }}
      onClick={() =>
        navigate(buildPath(paramsReplacer(Page.CREATE_CALIBRATION_RATING, { ':userUuid': userUuid, ':uuid': uuid })))
      }
    />
  );
};

export default SubmitCalibrationRatings;

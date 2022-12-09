import React, { FC, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
  CalibrationReviewAction,
  calibrationReviewDataSelector,
  calibrationReviewMetaSelector,
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
  const isAnniversary = useSelector(isAnniversaryTimelineType(userUuid, 'CURRENT'));
  const { loading } = useSelector(calibrationReviewMetaSelector);
  const { uuid = 'new', status } = calibrationReview;

  useEffect(() => {
    !isAnniversary &&
      dispatch(CalibrationReviewAction.getCalibrationReview({ colleagueUuid: userUuid, cycleUuid: 'CURRENT' }));
  }, []);

  if (isAnniversary || loading || status === Status.WAITING_FOR_APPROVAL) return null;

  return (
    <BaseWidget
      iconGraphic={'edit'}
      title={t('submit_calibration_ratings', 'Submit calibration ratings')}
      description={t('ratings_ready_to_submit', 'Ratings ready to submit')}
      customStyle={{ cursor: 'pointer' }}
      background={'tescoBlue'}
      onClick={() =>
        navigate(buildPath(paramsReplacer(Page.CREATE_CALIBRATION_RATING, { ':userUuid': userUuid, ':uuid': uuid })))
      }
    />
  );
};

export default SubmitCalibrationRatings;

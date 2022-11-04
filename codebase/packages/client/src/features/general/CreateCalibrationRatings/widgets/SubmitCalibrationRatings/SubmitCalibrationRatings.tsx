import React, { FC, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import BaseWidget from 'components/BaseWidget';
import { buildPath } from 'features/general/Routes';
import { Page } from 'pages';
import { paramsReplacer } from 'utils';
import { useTranslation } from 'components/Translation';
import { useSelector } from 'react-redux';
import {
  CalibrationReviewAction,
  calibrationReviewDataSelector,
  calibrationReviewMetaSelector,
  colleagueUUIDSelector,
  SchemaActions,
} from '@pma/store';
import { useStyle } from '@pma/dex-wrapper';
import useDispatch from 'hooks/useDispatch';

const SubmitCalibrationRatings: FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const colleagueUuid = useSelector(colleagueUUIDSelector);
  const calibrationReview = useSelector(calibrationReviewDataSelector) || {};
  const { loading } = useSelector(calibrationReviewMetaSelector);

  useEffect(() => {
    dispatch(CalibrationReviewAction.getCalibrationReview({ colleagueUuid, cycleUuid: 'CURRENT' }));
  }, []);

  if (loading) return null;

  const calibrationReviewUuid = calibrationReview?.uuid || 'new';

  return (
    <BaseWidget
      iconGraphic={'edit'}
      title={t('submit_calibration_ratings', 'Submit calibration ratings')}
      description={t('ratings_ready_to_submit', 'Ratings ready to submit')}
      customStyle={{ cursor: 'pointer' }}
      onClick={() =>
        navigate(buildPath(paramsReplacer(Page.CREATE_CALIBRATION_RATING, { ':uuid': calibrationReviewUuid })))
      }
    />
  );
};

export default SubmitCalibrationRatings;

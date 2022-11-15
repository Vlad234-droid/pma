import React, { FC, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import BaseWidget from 'components/BaseWidget';
import { buildPath } from 'features/general/Routes';
import { Page } from 'pages';
import { paramsReplacer } from 'utils';
import { useTranslation } from 'components/Translation';
import { useSelector } from 'react-redux';
import { CalibrationReviewAction, calibrationReviewDataSelector, calibrationReviewMetaSelector } from '@pma/store';
import useDispatch from 'hooks/useDispatch';

type Props = {
  userUuid: string;
};

const SubmitCalibrationRatings: FC<Props> = ({ userUuid }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const calibrationReview = useSelector(calibrationReviewDataSelector(userUuid)) || {};
  const { loading } = useSelector(calibrationReviewMetaSelector);

  useEffect(() => {
    dispatch(CalibrationReviewAction.getCalibrationReview({ colleagueUuid: userUuid, cycleUuid: 'CURRENT' }));
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
        navigate(
          buildPath(
            paramsReplacer(Page.CREATE_CALIBRATION_RATING, { ':userUuid': userUuid, ':uuid': calibrationReviewUuid }),
          ),
        )
      }
    />
  );
};

export default SubmitCalibrationRatings;

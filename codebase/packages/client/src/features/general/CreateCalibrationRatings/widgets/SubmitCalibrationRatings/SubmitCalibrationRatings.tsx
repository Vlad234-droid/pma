import React, { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import BaseWidget from 'components/BaseWidget';
import { buildPath } from 'features/general/Routes';
import { Page } from 'pages';
import { paramsReplacer } from 'utils';
import { useTranslation } from 'components/Translation';

const SubmitCalibrationRatings: FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <BaseWidget
      iconGraphic={'edit'}
      title={t('submit_calibration_ratings', 'Submit calibration ratings')}
      description={t('ratings_ready_to_submit', 'Ratings ready to submit')}
      customStyle={{ cursor: 'pointer' }}
      onClick={() => navigate(buildPath(paramsReplacer(Page.CREATE_CALIBRATION_RATING, { ':uuid': 'new' })))}
    />
  );
};

export default SubmitCalibrationRatings;

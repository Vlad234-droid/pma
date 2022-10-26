import React, { FC, useState } from 'react';
import { Rule, useStyle } from '@pma/dex-wrapper';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router';

import WrapperModal from 'features/general/Modal/components/WrapperModal';
import { useTranslation } from 'components/Translation';
import RatingForm from './components/RatingForm';
import SuccessModal from 'components/SuccessModal';
import { SuccessMark } from 'components/Icon';

export enum Statuses {
  PENDING = 'PENDING',
  SUCCESS = 'SUCCESS',
}
export enum Modes {
  EDIT = 'EDIT',
  SUBMIT = 'SUBMIT',
}

const CreateCalibrationRatings: FC = () => {
  const { t } = useTranslation();
  const { uuid } = useParams<{ uuid: string }>();
  const navigate = useNavigate();
  const { css, theme } = useStyle();

  const isSuccess = false;

  if (isSuccess)
    return (
      <SuccessModal
        customButtonStyles={{ background: theme.colors.tescoBlue, color: theme.colors.white }}
        onClose={() => navigate(-1)}
        title={t('calibration_ratings')}
        description={t('you_have_submitted_your_colleague_final_ratings')}
        additionalText={t('any_changes_agreed_in_calibration_will_be_saved_here')}
        mark={<SuccessMark />}
      />
    );

  return (
    <WrapperModal
      onClose={() => navigate(-1)}
      title={uuid === 'new' ? t('submit_calibration_ratings') : t('edit_calibration_ratings')}
    >
      <div className={css(ratingWrapper)}>
        <RatingForm onSubmit={console.log} />
      </div>
    </WrapperModal>
  );
};

const ratingWrapper: Rule = {
  padding: '10px 40px',
  height: '100%',
  overflow: 'auto',
};

export default CreateCalibrationRatings;

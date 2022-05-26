import React, { FC, useState, useEffect } from 'react';
import { Rule, useStyle } from '@pma/dex-wrapper';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router';

import WrapperModal from 'features/Modal/components/WrapperModal';
import { useTranslation } from 'components/Translation';
import { RatingsContent } from './components/RatingsContent';
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

const CalibrationRatingsModal: FC = () => {
  const { t } = useTranslation();
  const [status, setStatus] = useState<Statuses>(Statuses.PENDING);
  const [mode, setMode] = useState<Modes | null>(null);
  const { uuid } = useParams<{ uuid: string }>();
  const navigate = useNavigate();
  const { css, theme } = useStyle();
  //TODO: in future replace it to selector
  const data = { overall: 'Below expected contribution', longTerm: 'Yes', absent: 'Parental leave' };

  useEffect(() => {
    if (!Object.keys(data).length) return setMode(Modes.SUBMIT);
    setMode(Modes.EDIT);
  }, [Object.keys(data).length]);

  return (
    <WrapperModal
      onClose={() => navigate(-1)}
      title={uuid === 'submit' ? t('submit_calibration_ratings') : t('edit_calibration_ratings')}
    >
      <div className={css(ratingWrapper)}>
        {status === Statuses.PENDING && (
          <RatingsContent setStatus={setStatus} mode={mode} setMode={setMode} data={data} />
        )}
        {status === Statuses.SUCCESS && (
          <SuccessModal
            customButtonStyles={{ background: theme.colors.tescoBlue, color: theme.colors.white }}
            onClose={() => navigate(-1)}
            title={t('calibration_ratings')}
            description={t('you_have_submitted_your_colleague_final_ratings')}
            additionalText={t('any_changes_agreed_in_calibration_will_be_saved_here')}
            mark={<SuccessMark />}
          />
        )}
      </div>
    </WrapperModal>
  );
};

const ratingWrapper: Rule = {
  padding: '10px 40px',
  height: '100%',
  overflow: 'auto',
};

export default CalibrationRatingsModal;

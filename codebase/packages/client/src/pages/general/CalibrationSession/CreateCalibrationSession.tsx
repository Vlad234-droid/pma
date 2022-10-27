import React, { FC } from 'react';

import { useNavigate } from 'react-router';
import { useLocation } from 'react-router-dom';

import { useTranslation } from 'components/Translation';
import { BasicFormModal } from 'components/BasicFormModal';
import { buildPath } from 'features/general/Routes';
import { CreateUpdateCalibrationSession } from 'features/general/CreateUpdateCalibrationSession';

import { Page } from '../types';

const CreateCalibrationSessionPage: FC = () => {
  const navigate = useNavigate();

  const { t } = useTranslation();
  const { state } = useLocation();

  const handleClose = () => {
    navigate(buildPath((state as any)?.backPath?.replace('/', '') || Page.CALIBRATION_SESSION), {
      state: { backPath: (state as any)?.prevBackPath },
    });
  };

  return (
    <BasicFormModal onClose={handleClose} title={t('create_calibration_session', 'Create calibration session')}>
      <CreateUpdateCalibrationSession onClose={handleClose} />
    </BasicFormModal>
  );
};

export default CreateCalibrationSessionPage;

import React, { FC } from 'react';

import { useNavigate } from 'react-router';
import { useLocation, useParams } from 'react-router-dom';

import { useTranslation } from 'components/Translation';
import { BasicFormModal } from 'components/BasicFormModal';
import { buildPath } from 'features/general/Routes';
import { CreateUpdateCalibrationSession } from 'features/general/CreateUpdateCalibrationSession';
import { paramsReplacer } from 'utils';

import { Page } from '../types';

const CreateCalibrationSessionPage: FC = () => {
  const navigate = useNavigate();
  const { uuid } = useParams<{ uuid: string }>();

  const { t } = useTranslation();
  const { state } = useLocation();

  const handleClose = () => {
    navigate(
      buildPath(
        (state as any)?.backPath?.replace('/', '') ||
          (uuid ? paramsReplacer(`${Page.CALIBRATION_SESSION}`, { ':uuid': uuid }) : Page.CALIBRATION_SESSION_LIST),
      ),
      {
        state: { backPath: (state as any)?.prevBackPath },
      },
    );
  };

  return (
    <BasicFormModal onClose={handleClose} title={t('create_calibration_session', 'Create calibration session')}>
      <CreateUpdateCalibrationSession onClose={handleClose} />
    </BasicFormModal>
  );
};

export default CreateCalibrationSessionPage;

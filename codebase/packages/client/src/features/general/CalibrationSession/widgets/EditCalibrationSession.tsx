import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router';

import { getCalibrationSessionsSelector } from '@pma/store';
import { CalibrationSessionStatusEnum } from '@pma/openapi';
import { Rule, theme } from '@pma/dex-wrapper';

import { paramsReplacer } from 'utils';
import { Page } from 'pages';

import { useTranslation } from 'components/Translation';
import BaseWidget from 'components/BaseWidget';

import { buildPath } from '../../Routes';

const EditCalibrationSession: FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { uuid } = useParams<{ uuid: string }>();
  const calibrationSessions = useSelector(getCalibrationSessionsSelector) || [];

  const calibrationSession = uuid ? calibrationSessions.find((cs) => cs.uuid === uuid) || null : {};
  const isStarted = calibrationSession?.status === CalibrationSessionStatusEnum.Started;
  const isCompleted = calibrationSession?.status === CalibrationSessionStatusEnum.Completed;
  const isDisabled = isStarted || isCompleted;

  const handleEditCalibrationSession = () => {
    uuid &&
      !isStarted &&
      !isCompleted &&
      navigate(buildPath(paramsReplacer(Page.EDIT_CALIBRATION_SESSION, { ':uuid': uuid })));
  };

  return (
    <BaseWidget
      iconGraphic={'edit'}
      title={t('edit_calibration_session', 'Edit calibration session')}
      hover={false}
      withButton={false}
      onClick={handleEditCalibrationSession}
      customStyle={{
        fontSize: theme.font.fixed.f16.fontSize,
        lineHeight: theme.font.fixed.f16.lineHeight,
        letterSpacing: '0px',
        ...tileWrapperStyles,
        ...(!isDisabled ? { cursor: 'pointer' } : { opacity: 0.6 }),
        '& span': {
          '&:last-child': {
            fontSize: theme.font.fixed.f16.fontSize,
            marginBottom: '8px',
          },
        },
      }}
    />
  );
};

export default EditCalibrationSession;

const tileWrapperStyles: Rule = { minWidth: '350px' };

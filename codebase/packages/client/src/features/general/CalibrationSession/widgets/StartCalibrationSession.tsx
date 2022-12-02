import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router';

import { CalibrationSessionsAction, getCalibrationSessionsSelector } from '@pma/store';
import { CalibrationSessionStatusEnum } from '@pma/openapi';
import { colors, Rule, theme } from '@pma/dex-wrapper';

import { useTranslation } from 'components/Translation';
import BaseWidget from 'components/BaseWidget';
import useDispatch from 'hooks/useDispatch';

const StartCalibrationSession: FC = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { uuid } = useParams<{ uuid: string }>();
  const calibrationSessions = useSelector(getCalibrationSessionsSelector) || [];

  const calibrationSession = uuid ? calibrationSessions.find((cs) => cs.uuid === uuid) || null : {};
  const isStarted =
    calibrationSession?.status === CalibrationSessionStatusEnum.Started ||
    calibrationSession?.status === CalibrationSessionStatusEnum.Updated;
  const isCompleted = calibrationSession?.status === CalibrationSessionStatusEnum.Completed;

  const handleStart = () => {
    if (calibrationSession?.status === CalibrationSessionStatusEnum.Created) {
      dispatch(
        CalibrationSessionsAction.startCalibrationSession({
          ...calibrationSession,
          status: CalibrationSessionStatusEnum.Started,
        }),
      );
    }
  };
  const isDisabled = isCompleted;

  const background = isStarted ? 'paleOrange' : 'white';

  return (
    <BaseWidget
      iconGraphic={'chart'}
      title={
        isStarted
          ? t('calibration_session_in_progress', 'Calibration session in progress')
          : t('start_calibration_session_edit_rating', 'Start calibration session and edit ratings')
      }
      onClick={handleStart}
      hover={false}
      withButton={false}
      customStyle={{
        fontSize: theme.font.fixed.f16.fontSize,
        lineHeight: theme.font.fixed.f16.lineHeight,
        letterSpacing: '0px',
        ...tileWrapperStyles,
        ...(background ? { background: colors[background] } : {}),
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

export default StartCalibrationSession;

const tileWrapperStyles: Rule = { minWidth: '350px' };

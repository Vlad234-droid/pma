import React, { FC, useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { CalibrationSessionStatusEnum } from '@pma/openapi';

import { CreateRule, Rule, useStyle } from '@pma/dex-wrapper';
import { CalibrationSessionsAction, calibrationSessionsMetaSelector, getCalibrationSessionsSelector } from '@pma/store';

import { Page } from 'pages';
import Spinner from 'components/Spinner';
import { Icon as IconComponent } from 'components/Icon';
import { InfoBlock } from 'components/InfoBlock';

import { useTranslation } from 'components/Translation';
import useDispatch from 'hooks/useDispatch';
import { TriggerModal } from '../Modal';
import { Form } from './components/Form';
import { useSelector } from 'react-redux';

export type Props = {
  onClose: () => void;
};

const CreateUpdateCalibrationSession: FC<Props> = ({ onClose }) => {
  const { css, theme, matchMedia } = useStyle();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const mobileScreen = matchMedia({ xSmall: true, small: true }) || false;
  const { t } = useTranslation();
  const { uuid } = useParams<{ uuid: string }>();

  const [isSaveAndExit, toggleSaveAndExit] = useState<boolean>(false);
  const [isSubmittedData, toggleSubmitData] = useState<boolean>(false);
  const {
    updating: calibrationSessionUpdating,
    loading: calibrationSessionLoading,
    loaded: calibrationSessionLoaded,
  } = useSelector(calibrationSessionsMetaSelector);
  const calibrationSessions = useSelector(getCalibrationSessionsSelector) || [];

  const calibrationSession = uuid ? calibrationSessions.find((cs) => cs.uuid === uuid) || null : {};

  const canEdit = calibrationSession ? calibrationSession?.status !== CalibrationSessionStatusEnum.Completed : true;

  const handleSaveAndExit = async (data) => {
    console.log('handleSaveAndExit', data);
    dispatch(
      CalibrationSessionsAction.createCalibrationSession({
        data: { ...data, status: CalibrationSessionStatusEnum.Created },
      }),
    );
    toggleSaveAndExit(true);
  };
  const handleSubmitData = async (data) => {
    console.log('handleSubmitData', data);
    dispatch(
      CalibrationSessionsAction.createCalibrationSession({
        data: { ...data, status: CalibrationSessionStatusEnum.Created },
      }),
    );
    toggleSubmitData(true);
  };

  useEffect(() => {
    if (isSaveAndExit && !calibrationSessionUpdating) {
      onClose();
    }
  }, [isSaveAndExit, calibrationSessionUpdating]);

  useEffect(() => {
    if (isSubmittedData && !calibrationSessionUpdating) {
      // todo redirect to session start page
      onClose();
    }
  }, [isSubmittedData, calibrationSessionUpdating]);

  useEffect(() => {
    if (calibrationSessionLoaded && uuid && !calibrationSession) {
      navigate(`/${Page.NOT_FOUND}`);
    }
  }, [calibrationSessionLoaded, uuid]);

  // useEffect(() => {
  //   dispatch(CalibrationSessionsAction.getCalibrationSessions({}));
  // }, []);

  if (calibrationSessionUpdating || calibrationSessionLoading) {
    return <Spinner fullHeight />;
  }

  return (
    <div className={css(containerStyle)}>
      <div className={css(wrapperStyle({ mobileScreen }))}>
        <span className={css(iconLeftPositionStyle({ mobileScreen }))} onClick={onClose}>
          <IconComponent graphic='arrowLeft' invertColors={true} />
        </span>
        <div>
          <div className={css({ padding: `0 0 ${theme.spacing.s5}` })}>
            <TriggerModal
              triggerComponent={
                <InfoBlock
                  text={t(
                    'need_help_to_write_calibration_session',
                    'Do you need help to start your calibration session?',
                  )}
                />
              }
              title={t('alibration_session', 'Calibration session')}
            >
              <div>HelpModal</div>
            </TriggerModal>
            <div className={css(helperTextStyle)}>
              {t('complete_all_fields', 'Please complete all fields, before moving on.')}
            </div>
            <Form
              onSubmit={handleSubmitData}
              onSaveAndExit={handleSaveAndExit}
              defaultValues={calibrationSession}
              canEdit={canEdit}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const containerStyle: Rule = { height: '100%' };

const wrapperStyle: CreateRule<{ mobileScreen: boolean }> =
  ({ mobileScreen }) =>
  ({ theme }) => ({
    height: '100%',
    overflow: 'auto',
    padding: mobileScreen ? `0 ${theme.spacing.s4}` : `0 ${theme.spacing.s10}`,
  });

const iconLeftPositionStyle: CreateRule<{ mobileScreen: boolean }> =
  ({ mobileScreen }) =>
  ({ theme }) => ({
    position: 'fixed',
    top: theme.spacing.s5,
    left: mobileScreen ? theme.spacing.s5 : theme.spacing.s10,
    textDecoration: 'none',
    border: 'none',
    cursor: 'pointer',
  });

const helperTextStyle: Rule = ({ theme }) => ({
  padding: '24px 0 20px 0',
  fontSize: theme.font.fixed.f18.fontSize,
  lineHeight: theme.font.fluid.f18.lineHeight,
  letterSpacing: '0px',
});

export default CreateUpdateCalibrationSession;

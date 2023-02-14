import React, { FC, useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { CalibrationSessionStatusEnum } from '@pma/openapi';
import { CreateRule, Rule, useStyle } from '@pma/dex-wrapper';
import {
  CalibrationSessionsAction,
  calibrationSessionsMetaSelector,
  getCalibrationSessionsSelector,
  getCreatedCalibrationSessionsUuidSelector,
} from '@pma/store';

import useDispatch from 'hooks/useDispatch';
import { Page } from 'pages';
import { buildPath } from 'features/general/Routes/utils';
import Spinner from 'components/Spinner';
import { Icon as IconComponent } from 'components/Icon';
import { paramsReplacer } from 'utils';
import { useTranslation } from 'components/Translation';
import { Form } from './components/Form';
import useFilter from './hooks/useFilter';
import { CalibrationSessionUiType } from './types';
import { prepareFormData } from './utils';

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
    error: calibrationSessionError,
  } = useSelector(calibrationSessionsMetaSelector);
  const createCalibrationSessionsUuid = useSelector(getCreatedCalibrationSessionsUuidSelector) || null;
  const calibrationSessions = useSelector(getCalibrationSessionsSelector) || [];
  const { defaultFilters } = useFilter(uuid);

  const calibrationSession = uuid ? calibrationSessions.find((cs) => cs.uuid === uuid) || null : {};
  const defaultValues: CalibrationSessionUiType = {
    ...calibrationSession,
    colleaguesRemoved: [],
    colleaguesAdd: [],
    filter: defaultFilters,
  };

  const canEdit = calibrationSession ? calibrationSession?.status !== CalibrationSessionStatusEnum.Completed : true;

  const handleSaveAndExit = async (data: CalibrationSessionUiType) => {
    const mappedData = prepareFormData(data);
    if (mappedData.uuid) {
      dispatch(CalibrationSessionsAction.updateCalibrationSession(mappedData));
    } else {
      dispatch(
        CalibrationSessionsAction.createCalibrationSession({
          ...mappedData,
          status: CalibrationSessionStatusEnum.Created,
        }),
      );
    }
    toggleSaveAndExit(true);
  };

  const handleSubmitData = async (data: CalibrationSessionUiType) => {
    const mappedData = prepareFormData(data);
    if (mappedData.uuid) {
      dispatch(CalibrationSessionsAction.updateCalibrationSession(mappedData));
    } else {
      dispatch(
        CalibrationSessionsAction.createCalibrationSession({
          ...mappedData,
          status: CalibrationSessionStatusEnum.Created,
        }),
      );
    }
    toggleSubmitData(true);
  };

  useEffect(() => {
    if (isSaveAndExit && !calibrationSessionUpdating) {
      navigate(buildPath(Page.CALIBRATION_SESSION_LIST));
    }
  }, [isSaveAndExit, calibrationSessionUpdating]);

  useEffect(() => {
    if (isSubmittedData && !calibrationSessionUpdating) {
      if (!calibrationSessionError && createCalibrationSessionsUuid) {
        navigate(buildPath(paramsReplacer(`${Page.CALIBRATION_SESSION}`, { ':uuid': createCalibrationSessionsUuid })));
      } else {
        onClose();
      }
    }
  }, [isSubmittedData, calibrationSessionUpdating, calibrationSessionError]);

  useEffect(() => {
    if (calibrationSessionLoaded && uuid && !calibrationSession) {
      navigate(`/${Page.NOT_FOUND}`);
    }
  }, [calibrationSessionLoaded, uuid]);

  useEffect(() => {
    dispatch(CalibrationSessionsAction.getCalibrationSessions({}));
  }, []);

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
            <div className={css(helperTextStyle)}>
              {t('complete_all_fields', 'Please complete all fields before moving on.')}
            </div>
            <Form
              onSubmit={handleSubmitData}
              onSaveAndExit={handleSaveAndExit}
              defaultValues={defaultValues}
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
  padding: '0px 24px 0 20px 0',
  fontSize: theme.font.fixed.f18.fontSize,
  lineHeight: theme.font.fluid.f18.lineHeight,
  letterSpacing: '0px',
});

export default CreateUpdateCalibrationSession;

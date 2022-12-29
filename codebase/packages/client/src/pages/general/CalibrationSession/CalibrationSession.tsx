import React, { FC, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { CreateRule, Rule, useStyle } from '@pma/dex-wrapper';
import { CalibrationSessionStatusEnum } from '@pma/openapi';
import { calibrationSessionsMetaSelector, getCalibrationSessionSelector } from '@pma/store';

import { CalibrationSession as CalibrationSessionDetails } from 'features/general/CalibrationSession';
import {
  DownloadReport,
  EditCalibrationSession,
  StartCalibrationSession,
} from 'features/general/CalibrationSession/widgets';
import { ColleaguesFinder } from 'features/general/ColleaguesFinder';

import { Page } from '../types';
import { useHeaderContainer } from 'contexts/headerContext';
import { useTranslation } from 'components/Translation';
import { buildPath } from 'features/general/Routes';

import { Backward } from 'components/Backward';

const CalibrationSessionPage: FC = () => {
  const { uuid } = useParams<{ uuid: string }>();
  const { css, matchMedia } = useStyle();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { state } = useLocation();
  const mobileScreen = matchMedia({ xSmall: true, small: true, medium: true }) || false;
  const calibrationSession = useSelector(getCalibrationSessionSelector(uuid || '')) || {};
  const isStarted =
    calibrationSession?.status === CalibrationSessionStatusEnum.Started ||
    calibrationSession?.status === CalibrationSessionStatusEnum.Updated;
  const { loaded } = useSelector(calibrationSessionsMetaSelector);
  const { setLinkTitle } = useHeaderContainer();
  const navigateTo = () => navigate(buildPath(Page.CALIBRATION_SESSION_LIST), { state });

  const bottomPanelRef = useRef<HTMLDivElement>();

  useEffect(() => {
    setLinkTitle({
      [Page.CALIBRATION_SESSION]: `${t('calibration', 'Calibration')}: ${calibrationSession.title || ''}`,
    });
  }, [loaded]);

  return (
    <div>
      {!isStarted && <Backward onPress={navigateTo} />}
      <div className={css(contentBlockStyle({ height: bottomPanelRef?.current?.clientHeight }))}>
        <div>
          <div className={css(headStyle)}>
            <div />
            <div className={css(filtersStyle)}>
              <ColleaguesFinder />
            </div>
          </div>
          <div className={css(widgetContainerStyles({ mobileScreen }))}>
            <StartCalibrationSession />
            <EditCalibrationSession />
            <DownloadReport uuid={uuid as string} />
          </div>
        </div>
        <CalibrationSessionDetails uuid={uuid as string} />
      </div>
    </div>
  );
};

const widgetContainerStyles: CreateRule<{ mobileScreen: boolean }> = ({ mobileScreen }) => ({
  display: 'flex',
  flexDirection: mobileScreen ? 'column' : 'row',
  gap: '8px',
  marginBottom: '56px',
});
const contentBlockStyle: CreateRule<{ height: number | undefined }> = ({ height }) => {
  if (height) {
    return { paddingBottom: `${height}px` };
  }

  return {};
};

const headStyle: Rule = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  paddingTop: '20px',
  paddingBottom: '20px',
};

const filtersStyle: Rule = {
  display: 'flex',
  alignItems: 'center',
};

export default CalibrationSessionPage;

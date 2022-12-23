import React, { FC, useEffect, useRef, useState } from 'react';
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
import { ColleaguesSimpleFinder } from 'components/ColleaguesSimpleFinder';

import { Page } from '../types';
import { useHeaderContainer } from 'contexts/headerContext';
import { useTranslation } from 'components/Translation';
import useSearchColleaguesSimple from 'features/general/CalibrationSession/hook/useSearchColleaguesSimple';
import { buildPath } from 'features/general/Routes';
import { paramsReplacer } from 'utils';
import { Backward } from 'components/Backward';

const CalibrationSessionPage: FC = () => {
  const { uuid } = useParams<{ uuid: string }>();
  const { css, matchMedia } = useStyle();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { pathname, state } = useLocation();
  const mobileScreen = matchMedia({ xSmall: true, small: true, medium: true }) || false;
  const calibrationSession = useSelector(getCalibrationSessionSelector(uuid || '')) || {};
  const isStarted =
    calibrationSession?.status === CalibrationSessionStatusEnum.Started ||
    calibrationSession?.status === CalibrationSessionStatusEnum.Updated;
  const { loaded } = useSelector(calibrationSessionsMetaSelector);
  const { setLinkTitle } = useHeaderContainer();
  const { colleagues, handleSearchColleagues, clearColleagueList } = useSearchColleaguesSimple({}, uuid);
  const navigateTo = () => navigate(buildPath(Page.CALIBRATION_SESSION_LIST), { state });

  const bottomPanelRef = useRef<HTMLDivElement>();
  const searchRef = useRef<any>(null);
  const [focused, setFocused] = useState(false);
  const onFocus = () => setFocused(true);
  const onBlur = () => {
    setFocused(false);
    clearColleagueList();
  };

  const handleView = (uuid: string) => {
    navigate(buildPath(paramsReplacer(`${Page.USER_REVIEWS}`, { ':uuid': uuid })), {
      state: {
        backPath: `${pathname}`,
      },
    });
  };

  useEffect(() => {
    setLinkTitle({
      [Page.CALIBRATION_SESSION]: `${t('calibration', 'Calibration')}: ${calibrationSession.title || ''}`,
    });
  }, [loaded]);
  useEffect(() => {
    searchRef.current.value = '';
  }, [focused]);

  return (
    <div>
      {!isStarted && <Backward onPress={navigateTo} />}
      <div className={css(contentBlockStyle({ height: bottomPanelRef?.current?.clientHeight }))}>
        <div>
          <div className={css(headStyle)}>
            <div />
            <div className={css(filtersStyle)}>
              <ColleaguesSimpleFinder
                domRef={searchRef}
                onSelect={handleView}
                selected={[]}
                value={''}
                customStyles={{ marginTop: '0px', width: '100%' }}
                inputStyles={{
                  ...(focused ? { padding: '10px 20px 10px 16px' } : { padding: '0px' }),
                  ...(focused ? { borderRadius: '50px' } : { transitionDelay: '.3s' }),
                  ...(focused ? { width: '500px' } : { width: '38px' }),
                  //@ts-ignore
                  ...(!focused && { borderRadius: '50%', padding: '0px' }),
                  height: '38px',
                  border: '2px solid rgb(0, 83, 159)',
                  cursor: 'pointer',
                }}
                placeholder={focused ? 'search' : ''}
                customIcon={true}
                iconCustomStyles={{ right: '10px' }}
                colleagues={colleagues}
                handleSearchColleagues={handleSearchColleagues}
                clearColleagueList={clearColleagueList}
                onBlur={onBlur}
                onFocus={onFocus}
                multiple={false}
              />
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

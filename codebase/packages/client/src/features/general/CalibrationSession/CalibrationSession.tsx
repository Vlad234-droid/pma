import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { CreateRule, Rule, Styles, useStyle } from '@pma/dex-wrapper';
import { CalibrationSessionStatusEnum } from '@pma/openapi';
import useDispatch from 'hooks/useDispatch';

import { getCalibrationSessionsSelector, CalibrationSessionsAction, calibrationSessionsMetaSelector } from '@pma/store';

import { buildPath } from 'features/general/Routes';
import { useTranslation } from 'components/Translation';
import { ListView } from './components/ListView';
import { Line } from 'components/Line';
import { Footer } from './components/Footer';
import { SuccessModal } from './components/SuccessModal';
import ColleaguesReviews from './components/ColleaguesReviews';
import Graph from 'components/Graph';
import { Rating } from 'config/enum';
import { TileWrapper } from 'components/Tile';

import { ActiveList } from './utils/types';
import { Page } from 'pages';

const CalibrationSession = () => {
  const { css, matchMedia } = useStyle();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const mobileScreen = matchMedia({ xSmall: true, small: true, medium: true }) || false;
  const mediumScreen = matchMedia({ xSmall: false, small: false, medium: true }) || false;
  const { uuid } = useParams<{ uuid: string }>();
  const calibrationSessions = useSelector(getCalibrationSessionsSelector) || [];
  const { loading: csLoading, updating: csUpdating } = useSelector(calibrationSessionsMetaSelector);

  const calibrationSession = uuid ? calibrationSessions.find((cs) => cs.uuid === uuid) || null : {};
  const isStarted = calibrationSession?.status === CalibrationSessionStatusEnum.Started;

  const { t } = useTranslation();
  const [showSuccessModal, toggleSuccessModal] = useState<boolean>(false);
  const [period, setPeriod] = useState<string>('2021 - 2022');
  const [activeList, setActiveList] = useState<ActiveList>(ActiveList.LIST);
  const listRef = useRef<HTMLDivElement>();
  const bottomPanelRef = useRef<HTMLDivElement>();

  const handleCancellation = () => {
    navigate(buildPath(Page.CALIBRATION_SESSION_LIST));
  };
  const handleSave = () => {
    if (calibrationSession?.status === CalibrationSessionStatusEnum.Started) {
      dispatch(
        CalibrationSessionsAction.updateCalibrationSession({
          ...calibrationSession,
          status: CalibrationSessionStatusEnum.Completed,
        }),
      );
      toggleSuccessModal(!showSuccessModal);
    }
  };

  useEffect(() => {
    dispatch(CalibrationSessionsAction.getCalibrationSessions({}));
  }, []);

  const data = {
    Outstanding: [
      {
        businessType: 'store',
        firstName: 'store',
        jobName: 'store',
        lastName: 'store',
        uuid: '1',
        type: 'Outstanding',
        value: 'how',
      },
      {
        businessType: 'store',
        firstName: 'store',
        jobName: 'store',
        lastName: 'store',
        uuid: '2',
        type: 'Outstanding',
        value: 'how',
      },
    ],
    Great: [
      {
        businessType: 'store',
        firstName: 'store',
        jobName: 'store',
        lastName: 'store',
        uuid: '1',
        type: 'Outstanding',
        value: 'how',
      },
      {
        businessType: 'store',
        firstName: 'store',
        jobName: 'store',
        lastName: 'store',
        uuid: '2',
        type: 'Outstanding',
        value: 'how',
      },
    ],
    Satisfactory: [
      {
        businessType: 'store',
        firstName: 'store',
        jobName: 'store',
        lastName: 'store',
        uuid: '1',
        type: 'Outstanding',
        value: 'how',
      },
      {
        businessType: 'store',
        firstName: 'store',
        jobName: 'store',
        lastName: 'store',
        uuid: '2',
        type: 'Outstanding',
        value: 'how',
      },
    ],
    'Below expected': [
      {
        businessType: 'store',
        firstName: 'store',
        jobName: 'store',
        lastName: 'store',
        uuid: '1',
        type: 'Outstanding',
        value: 'how',
      },
      {
        businessType: 'store',
        firstName: 'store',
        jobName: 'store',
        lastName: 'store',
        uuid: '2',
        type: 'Outstanding',
        value: 'how',
      },
    ],
  };

  if (showSuccessModal) {
    return (
      <SuccessModal
        title={`${t('calibration', 'Calibration')}: ${calibrationSession?.title || ''}`}
        loading={csLoading || csUpdating}
      />
    );
  }

  return (
    <>
      <div className={css(listHeaderContainer({ width: listRef?.current?.clientWidth, mediumScreen, mobileScreen }))}>
        <p>{t('ratings_period', 'Ratings', { period })}</p>
        <ListView active={activeList} setActive={(active) => setActiveList(active)} ref={listRef} />
      </div>
      <Line styles={lineStyles} />
      {activeList !== ActiveList.GRAPH ? (
        <ColleaguesReviews
          data={data}
          activeList={activeList}
          key={activeList}
          styles={activeList === ActiveList.TABLE ? tableStyles({ mobileScreen }) : {}}
        />
      ) : (
        <TileWrapper customStyle={tileStyles}>
          <Graph
            title={t('calibration_submission', 'Calibration submission', { year: '2021' })}
            currentData={{
              title: '2022',
              ratings: {
                [Rating.OUTSTANDING]: 30,
                [Rating.GREAT]: 20,
                [Rating.SATISFACTORY]: 50,
                [Rating.BELOW_EXPECTED]: 70,
              },
            }}
          />
        </TileWrapper>
      )}
      {isStarted && <Footer ref={bottomPanelRef} onCancel={handleCancellation} onSave={handleSave} />}
    </>
  );
};

const lineStyles: Rule = {
  marginTop: '16px',
  marginBottom: '8px',
};
const tileStyles: Rule = {
  padding: '24px',
  marginTop: '24px',
};
const tableStyles: CreateRule<{ mobileScreen: boolean }> = ({ mobileScreen }) =>
  ({
    display: 'flex',
    overflow: 'scroll',
    gap: '16px',
    '& > div': {
      flex: 1,
      minWidth: mobileScreen ? '260px' : '326px',
    },
  } as Styles);

const listHeaderContainer: CreateRule<{ width: undefined | number; mediumScreen: boolean; mobileScreen: boolean }> =
  ({ width, mediumScreen, mobileScreen }) =>
  ({ theme }) =>
    ({
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      width: mediumScreen || mobileScreen ? '100%' : `calc(50% + ${width}px / 2)`,
      ...(mobileScreen && { flexDirection: 'row', gap: '18px' }),
      '& > p': {
        color: theme.colors.base,
        fontSize: theme.font.fixed.f18.fontSize,
        margin: 0,
      },
    } as Styles);

export default CalibrationSession;

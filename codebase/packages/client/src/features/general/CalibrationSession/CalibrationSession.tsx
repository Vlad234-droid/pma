import React, { FC, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { CreateRule, Rule, Styles, useStyle } from '@pma/dex-wrapper';
import { CalibrationSessionStatusEnum } from '@pma/openapi';
import useDispatch from 'hooks/useDispatch';

import { CalibrationSessionsAction, calibrationSessionsMetaSelector, getCalibrationSessionSelector } from '@pma/store';

import { buildPath } from 'features/general/Routes';
import ColleaguesRatings from './components/ColleaguesRatings';
import { SuccessModal } from './components/SuccessModal';
import { useTranslation } from 'components/Translation';
import { ListView } from './components/ListView';
import { TileWrapper } from 'components/Tile';
import { Footer } from './components/Footer';
import Spinner from 'components/Spinner';
import { Line } from 'components/Line';
import Graph from 'components/Graph';
import { ActiveList } from './types';

import { Page } from 'pages';
import { useCalibrationStatisticsRatings, useClearCalibrationData, useReviewsCalibrationList } from './hook';
import { buildData } from './utils';

const CalibrationSession: FC<{ uuid: string }> = ({ uuid }) => {
  const { css, matchMedia } = useStyle();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const mobileScreen = matchMedia({ xSmall: true, small: true, medium: true }) || false;
  const mediumScreen = matchMedia({ xSmall: false, small: false, medium: true }) || false;
  const calibrationSession = useSelector(getCalibrationSessionSelector(uuid || '')) || {};
  const { loading: csLoading, updating: csUpdating } = useSelector(calibrationSessionsMetaSelector);

  const isStarted =
    calibrationSession?.status === CalibrationSessionStatusEnum.Started ||
    calibrationSession?.status === CalibrationSessionStatusEnum.Updated;

  const { t } = useTranslation();
  const [showSuccessModal, toggleSuccessModal] = useState<boolean>(false);
  const [activeList, setActiveList] = useState<ActiveList>(ActiveList.LIST);
  const listRef = useRef<HTMLDivElement>();
  const bottomPanelRef = useRef<HTMLDivElement>();

  const { statistics, loading: statisticsLoading } = useCalibrationStatisticsRatings({ activeList, uuid });

  const { getCalibrationReviewsList, data } = useReviewsCalibrationList({ activeList, uuid });
  useClearCalibrationData();

  const handleCancellation = () => {
    if (isStarted) {
      dispatch(CalibrationSessionsAction.cancelCalibrationSession(calibrationSession));
    }
    navigate(buildPath(Page.CALIBRATION_SESSION_LIST));
  };
  const handleSave = () => {
    if (isStarted) {
      dispatch(
        CalibrationSessionsAction.closeCalibrationSession({
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

  if (showSuccessModal) {
    return (
      <SuccessModal
        title={`${t('calibration', 'Calibration')}: ${calibrationSession?.title || ''}`}
        loading={csLoading || csUpdating}
      />
    );
  }

  return (
    <div>
      <div className={css(contentBlockStyle({ height: bottomPanelRef?.current?.clientHeight }))}>
        <div className={css(listHeaderContainer({ width: listRef?.current?.clientWidth, mediumScreen, mobileScreen }))}>
          <p>{t('ratings_period', 'Ratings', { period: '' })}</p>
          <ListView active={activeList} setActive={(active) => setActiveList(active)} ref={listRef} />
        </div>
        <Line styles={lineStyles} />
        {statisticsLoading ? (
          <Spinner fullHeight />
        ) : activeList !== ActiveList.GRAPH ? (
          <ColleaguesRatings
            sessionUuid={uuid}
            data={data}
            activeList={activeList}
            styles={activeList === ActiveList.TABLE ? tableStyles({ mobileScreen }) : {}}
            onUpload={(rating, _start, _limit) => getCalibrationReviewsList({ rating, _start, _limit })}
            statistics={statistics}
          />
        ) : (
          <TileWrapper customStyle={tileStyles({ mobileScreen })}>
            <Graph
              title={''}
              properties={buildData(statistics, t, 'count')}
              currentData={{
                title: '',
                ratings: buildData(statistics, t, 'percentage'),
              }}
            />
          </TileWrapper>
        )}
      </div>
      {isStarted && <Footer ref={bottomPanelRef} onCancel={handleCancellation} onSave={handleSave} />}
    </div>
  );
};

const lineStyles: Rule = {
  marginTop: '16px',
  marginBottom: '8px',
};
const tileStyles: CreateRule<{ mobileScreen: boolean }> = ({ mobileScreen }) => ({
  padding: mobileScreen ? '24px 24px 24px 0px' : '24px',
  marginTop: '24px',
});
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

const contentBlockStyle: CreateRule<{ height: number | undefined }> = ({ height }) => {
  if (height) {
    return { paddingBottom: `${height}px` };
  }

  return {};
};

export default CalibrationSession;

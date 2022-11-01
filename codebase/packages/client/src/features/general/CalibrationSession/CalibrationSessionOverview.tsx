import React, { useState, useRef } from 'react';
import { CreateRule, Rule, Styles, useStyle } from '@pma/dex-wrapper';

import { useTranslation } from 'components/Translation';
import { ListView } from './components/ListView';
import { Line } from 'components/Line';
import {
  DownloadReport,
  CalibrationSession,
  CreateCalibration,
  RatingsSubmitted,
  CalibrationsCompleted,
  RatingsChange,
} from './widgets';
import { Filter } from './components/Filter';
import ColleaguesReviews from './components/ColleaguesReviews';
import Graph from 'components/Graph';
import { Rating } from 'config/enum';
import { TileWrapper } from 'components/Tile';

import { ActiveList } from './utils/types';

const CalibrationSessionOverview = () => {
  const { css, matchMedia } = useStyle();
  const mobileScreen = matchMedia({ xSmall: true, small: true }) || false;
  const mediumScreen = matchMedia({ xSmall: false, small: false, medium: true }) || false;

  const { t } = useTranslation();
  const [period, setPeriod] = useState<string>('2021 - 2022');
  const [activeList, setActiveList] = useState<ActiveList>(ActiveList.LIST);
  const listRef = useRef<HTMLDivElement>();

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

  return (
    <div>
      <div>
        <Filter setPeriod={(active) => setPeriod(active)} />
        <div className={css(widgetContainerStyles)}>
          <DownloadReport />
          <CalibrationSession />
          <CreateCalibration />
          <RatingsSubmitted />
          <CalibrationsCompleted />
          <RatingsChange />
        </div>
      </div>
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
    </div>
  );
};

const widgetContainerStyles: Rule = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
  gap: '8px',
  marginBottom: '56px',
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
      ...(mobileScreen && { flexDirection: 'column', gap: '18px' }),
      '& > p': {
        color: theme.colors.base,
        fontSize: theme.font.fixed.f18.fontSize,
        margin: 0,
        ...(mobileScreen && { alignSelf: 'flex-start' }),
      },
    } as Styles);

export default CalibrationSessionOverview;

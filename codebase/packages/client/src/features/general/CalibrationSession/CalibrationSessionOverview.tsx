import React, { FC, useRef, useState } from 'react';
import { CreateRule, Rule, Styles, useStyle } from '@pma/dex-wrapper';
import { useLocation } from 'react-router-dom';

import ColleaguesRatings from './components/ColleaguesRatings';
import { useTranslation } from 'components/Translation';
import { ListView } from './components/ListView';
import { TileWrapper } from 'components/Tile';
import Spinner from 'components/Spinner';
import { Line } from 'components/Line';
import Graph from 'components/Graph';

import { View } from './types';
import { useCalibrationStatisticsRatings, useClearCalibrationData, useReviewsCalibrationList } from './hook';
import { buildData } from './utils';

type Props = {
  filters: any;
  period: string;
  searchValue?: string;
};
const CalibrationSessionOverview: FC<Props> = ({ period, filters, searchValue }) => {
  const { css, matchMedia } = useStyle();
  const mobileScreen = matchMedia({ xSmall: true, small: true }) || false;
  const mediumScreen = matchMedia({ xSmall: false, small: false, medium: true }) || false;
  const { t } = useTranslation();
  const { state } = useLocation();
  const { activeList: backList } = (state as any) || {};

  const [activeList, setActiveList] = useState<View>(backList || View.LIST);
  const listRef = useRef<HTMLDivElement>();

  const { statistics, loading: statisticsLoading } = useCalibrationStatisticsRatings({
    activeList,
    period,
    filters,
    searchValue,
  });
  const { getCalibrationReviewsList, data } = useReviewsCalibrationList({ activeList, period, filters, searchValue });

  useClearCalibrationData();

  return (
    <div>
      <div className={css(listHeaderContainer({ width: listRef?.current?.clientWidth, mediumScreen, mobileScreen }))}>
        <p>{t('ratings_period', 'Ratings', { period: `${period} - ${Number(period) + 1}` })}</p>
        <ListView active={activeList} setActive={(active) => setActiveList(active)} ref={listRef} />
      </div>
      <Line styles={lineStyles} />
      {statisticsLoading ? (
        <Spinner fullHeight />
      ) : activeList !== View.GRAPH ? (
        <ColleaguesRatings
          data={data}
          activeList={activeList}
          styles={activeList === View.TABLE ? tableStyles({ mobileScreen }) : {}}
          onUpload={(rating, _start, _limit) =>
            getCalibrationReviewsList({ rating, _start, _limit, _search: searchValue, filters })
          }
          statistics={statistics}
        />
      ) : (
        <TileWrapper customStyle={tileStyles({ mobileScreen })}>
          <Graph
            title={t('calibration_submission', 'Calibration submission', { year: `${period} - ${Number(period) + 1}` })}
            properties={buildData(statistics, t, 'count')}
            currentData={{
              title: period,
              ratings: buildData(statistics, t, 'percentage'),
            }}
          />
        </TileWrapper>
      )}
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
      ...(mobileScreen && { flexDirection: 'column', gap: '18px' }),
      '& > p': {
        color: theme.colors.base,
        fontSize: theme.font.fixed.f18.fontSize,
        margin: 0,
        ...(mobileScreen && { alignSelf: 'flex-start' }),
      },
    } as Styles);

export default CalibrationSessionOverview;

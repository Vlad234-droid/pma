import React, { FC, useCallback, useRef, useState } from 'react';
import { CreateRule, Rule, Styles, useStyle } from '@pma/dex-wrapper';
import { CalibrationReviewsAction, calibrationReviewsDataSelector } from '@pma/store';

import { useSelector } from 'react-redux';
import useDispatch from 'hooks/useDispatch';

import ColleaguesRatings from './components/ColleaguesRatings';
import { useTranslation } from 'components/Translation';
import { ListView } from './components/ListView';
import { TileWrapper } from 'components/Tile';
import Spinner from 'components/Spinner';
import { Line } from 'components/Line';
import Graph from 'components/Graph';

import { initialFields } from './config';
import { ActiveList } from './types';
import omit from 'lodash.omit';
import { isNegative } from 'utils';
import { useCalibrationStatistics } from './hook';
import { buildData, toLocalRating } from './utils';

const CalibrationSessionOverview: FC<{ period: string }> = ({ period }) => {
  const { css, matchMedia } = useStyle();
  const dispatch = useDispatch();
  const mobileScreen = matchMedia({ xSmall: true, small: true }) || false;
  const mediumScreen = matchMedia({ xSmall: false, small: false, medium: true }) || false;
  const { t } = useTranslation();
  const data = useSelector(calibrationReviewsDataSelector);

  const [activeList, setActiveList] = useState<ActiveList>(ActiveList.LIST);
  const listRef = useRef<HTMLDivElement>();

  const { statistics, loading: statisticsLoading } = useCalibrationStatistics(activeList);

  const getCalibrationReviewsList = useCallback((rating: string, _start, _limit) => {
    const isSpaced = !isNegative(rating.indexOf(' '));
    const isScroll = _start || _limit;
    const params = {
      'review-rating_in': isSpaced ? [rating.toUpperCase().replace(' ', '_')] : [rating.toUpperCase()],
      ...(isScroll ? { _start, _limit } : initialFields),
    };
    isScroll
      ? dispatch(CalibrationReviewsAction.uploadCalibrationUsersReviews({ params, rating: toLocalRating(rating) }))
      : dispatch(
          CalibrationReviewsAction.getCalibrationUsersReviews({
            params,
            rating: toLocalRating(rating),
          }),
        );
  }, []);

  return (
    <div>
      <div className={css(listHeaderContainer({ width: listRef?.current?.clientWidth, mediumScreen, mobileScreen }))}>
        <p>{t('ratings_period', 'Ratings', { period })}</p>
        <ListView active={activeList} setActive={(active) => setActiveList(active)} ref={listRef} />
      </div>
      <Line styles={lineStyles} />
      {statisticsLoading ? (
        <Spinner fullHeight />
      ) : activeList !== ActiveList.GRAPH ? (
        <ColleaguesRatings
          data={activeList === ActiveList.TABLE ? omit(data, 'unsubmitted') : data}
          activeList={activeList}
          key={activeList}
          styles={activeList === ActiveList.TABLE ? tableStyles({ mobileScreen }) : {}}
          onUpload={(rating, _start, _limit) => getCalibrationReviewsList(rating, _start, _limit)}
          statistics={statistics}
        />
      ) : (
        <TileWrapper customStyle={tileStyles}>
          <Graph
            title={t('calibration_submission', 'Calibration submission', { year: period })}
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

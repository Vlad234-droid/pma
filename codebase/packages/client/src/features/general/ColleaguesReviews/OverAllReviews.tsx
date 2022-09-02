import React, { FC } from 'react';
import { getStatisticsMetaSelector, getTableChartDataStatistics } from '@pma/store';
import { useSelector } from 'react-redux';

import Spinner from 'components/Spinner';
import { ReviewsList } from './components';
import { ColleagueProfile as P } from 'components/ViewColleagueProfile';

import { useDetailsStatistics } from './hooks';
import { ReportPage } from 'config/enum';
import useQueryString from 'hooks/useQueryString';

const OverAllReviews: FC<{ type: ReportPage }> = ({ type }) => {
  const query = useQueryString();

  const { loading } = useSelector(getStatisticsMetaSelector);

  const list: Record<string, Array<P>> = useSelector(getTableChartDataStatistics);

  useDetailsStatistics(type, query);

  if (loading) return <Spinner fullHeight />;

  return <ReviewsList loading={loading} list={list} query={query} type={type} />;
};

export default OverAllReviews;

import React, { FC } from 'react';
import { getAnniversaryStatistics, getStatisticsMetaSelector } from '@pma/store';
import { useSelector } from 'react-redux';

import Spinner from 'components/Spinner';
import { ReviewsList } from './components';
import { ColleagueProfile as P } from 'components/ViewColleagueProfile';

import { ReportPage } from 'config/enum';
import useQueryString from 'hooks/useQueryString';
import { useDetailsStatistics } from './hooks';

const AnniversaryReviews: FC<{ type: ReportPage }> = ({ type }) => {
  const query = useQueryString();

  const { loading } = useSelector(getStatisticsMetaSelector);

  const list: Record<string, Array<P>> = useSelector(getAnniversaryStatistics);

  useDetailsStatistics(type, query);

  if (loading) return <Spinner fullHeight />;

  return <ReviewsList loading={loading} list={list} query={query} type={type} />;
};

export default AnniversaryReviews;

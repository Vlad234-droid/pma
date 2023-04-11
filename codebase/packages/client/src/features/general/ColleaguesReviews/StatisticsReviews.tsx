import React, { FC } from 'react';
import { getListStatistics, getReportMetaSelector } from '@pma/store';
import { useSelector } from 'react-redux';

import Spinner from 'components/Spinner';

import useQueryString from 'hooks/useQueryString';
import { useChartStatistics } from './hooks/useChartStatistics';
import { useDetailsStatistics, useTotalReviews } from './hooks';
import { filterToRequest } from 'utils';
import { List, ReportPageEmptyData } from './config';
import { ReportPage } from 'config/enum';
import { StatisticsReviewsView } from './StatisticsReviewsView';
import { AnniversaryReviewStatistics } from './AnniversaryReviewStatistics';

const page: Record<ReportPage, ReportPageEmptyData> = {
  [ReportPage.REPORT_APPROVED_OBJECTIVES]: { approved: [] },
  [ReportPage.REPORT_SUBMITTED_OBJECTIVES]: { 'not-submitted': [], submitted: [] },
  [ReportPage.REPORT_MID_YEAR_REVIEW]: { 'not-submitted': [], submitted: [], approved: [] },
  [ReportPage.REPORT_END_YEAR_REVIEW]: { 'not-submitted': [], submitted: [], approved: [] },
  [ReportPage.REPORT_MYR_BREAKDOWN]: {
    'New to business': [],
    'Below expected': [],
    Great: [],
    Outstanding: [],
    Satisfactory: [],
  },
  [ReportPage.REPORT_EYR_BREAKDOWN]: {
    'New to business': [],
    'Below expected': [],
    Great: [],
    Outstanding: [],
    Satisfactory: [],
  },
  [ReportPage.REPORT_WORK_LEVEL]: { approved: [] },
  [ReportPage.REPORT_NEW_TO_BUSINESS]: { 'new-to-business': [] },
  [ReportPage.REPORT_FEEDBACK]: { given: [], requested: [] },
  [ReportPage.REPORT_ANNIVERSARY_REVIEWS]: { 'not-submitted': [], submitted: [], approved: [] },
};

const addEmptyLabelsToList = (type: ReportPage, list: List): List => {
  return { ...page[type], ...list };
};

type Props = {
  type: ReportPage;
  toggleFullView: () => void;
  isFullView: boolean;
  filterValues: Record<string, Record<string, boolean>>;
};

const StatisticsReviews: FC<Props> = ({ type, toggleFullView, isFullView, filterValues }) => {
  const query = useQueryString();
  const { year } = query;
  const { loading: reportLoading } = useSelector(getReportMetaSelector);
  const list: List = useSelector(getListStatistics);

  const filters = filterToRequest(filterValues) || {};

  const searchedLoading = useDetailsStatistics(type, filters);
  useChartStatistics(type, filters);
  const reviews = useTotalReviews(type);

  if (reportLoading || searchedLoading) return <Spinner fullHeight />;

  const isWLPage = type === ReportPage.REPORT_WORK_LEVEL;

  const listWithEmptyLabels = addEmptyLabelsToList(type, list);

  if (type === ReportPage.REPORT_ANNIVERSARY_REVIEWS) {
    return (
      <AnniversaryReviewStatistics
        type={type}
        year={year}
        listWithEmptyLabels={listWithEmptyLabels}
        isWLPage={isWLPage}
        toggleFullView={toggleFullView}
        isFullView={isFullView}
        filterValues={filterValues}
        filters={filters}
      />
    );
  }

  return (
    <StatisticsReviewsView
      type={type}
      year={year}
      listWithEmptyLabels={listWithEmptyLabels}
      reviews={reviews}
      isWLPage={isWLPage}
      toggleFullView={toggleFullView}
      isFullView={isFullView}
      filterValues={filterValues}
      filters={filters}
    />
  );
};

export default StatisticsReviews;

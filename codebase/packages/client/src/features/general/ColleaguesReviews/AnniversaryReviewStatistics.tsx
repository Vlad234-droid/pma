import React, { FC } from 'react';

import { useTranslation } from 'components/Translation';
import { useTotalReviews } from './hooks';
import { filterToRequest } from 'utils';
import { List } from './config';
import { CycleStartEnd, ReportPage } from 'config/enum';
import { StatisticsReviewsView } from './StatisticsReviewsView';

type Props = {
  type: ReportPage;
  year: any;
  listWithEmptyLabels: List;
  isWLPage: boolean;
  toggleFullView: () => void;
  isFullView: boolean;
  filterValues: Record<string, Record<string, boolean>>;
  filters: ReturnType<typeof filterToRequest>;
};

export const AnniversaryReviewStatistics: FC<Props> = ({
  type,
  year,
  listWithEmptyLabels,
  isWLPage,
  toggleFullView,
  isFullView,
  filterValues,
  filters,
}) => {
  const { t } = useTranslation();
  const reviewsStartingInThisYear = useTotalReviews(type, CycleStartEnd.START);
  const reviewsEndingInThisYear = useTotalReviews(type, CycleStartEnd.END);

  return (
    <div>
      <h3>{t('cycles_ending_in_this_financial_year', 'Cycles ending in this financial year')}</h3>
      <StatisticsReviewsView
        type={type}
        year={year}
        listWithEmptyLabels={listWithEmptyLabels}
        reviews={reviewsEndingInThisYear}
        isWLPage={isWLPage}
        toggleFullView={toggleFullView}
        isFullView={isFullView}
        filterValues={filterValues}
        filters={filters}
      />
      <h3>{t('cycles_starting_in_this_financial_year', 'Cycles starting in this financial year')}</h3>
      <StatisticsReviewsView
        type={type}
        year={year}
        listWithEmptyLabels={listWithEmptyLabels}
        reviews={reviewsStartingInThisYear}
        isWLPage={isWLPage}
        toggleFullView={toggleFullView}
        isFullView={isFullView}
        filterValues={filterValues}
        filters={filters}
      />
    </div>
  );
};

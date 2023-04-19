import React, { FC } from 'react';
import { Rule, useStyle } from '@pma/dex-wrapper';

import { useTranslation } from 'components/Translation';
import { useTotalReviews } from './hooks';
import { filterToRequest } from 'utils';
import { List } from './config';
import { ReportTypeExtension, ReportPage } from 'config/enum';
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
  const { css } = useStyle();
  const reviewsStartingInThisYear = useTotalReviews(type, ReportTypeExtension.START);
  const reviewsEndingInThisYear = useTotalReviews(type, ReportTypeExtension.END);

  const listStartingEYR = {};
  const listEndingEYR = {};
  Object.keys(listWithEmptyLabels).forEach((label) => {
    listStartingEYR[label] = listWithEmptyLabels[label].filter((element) => element.type === 'EYR_START');
    listEndingEYR[label] = listWithEmptyLabels[label].filter((element) => element.type === 'EYR_END');
  });

  return (
    <div>
      <span className={css(titleStyles)}>
        {t('cycles_ending_in_this_financial_year', 'Cycles ending in this financial year')}
      </span>
      <StatisticsReviewsView
        type={type}
        year={year}
        listWithEmptyLabels={listEndingEYR}
        reviews={reviewsEndingInThisYear}
        isWLPage={isWLPage}
        toggleFullView={toggleFullView}
        isFullView={isFullView}
        filterValues={filterValues}
        filters={{ ...filters, type: 'EYR_END' }}
      />
      <span className={css(titleStyles)}>
        {t('cycles_starting_in_this_financial_year', 'Cycles starting in this financial year')}
      </span>
      <StatisticsReviewsView
        type={type}
        year={year}
        listWithEmptyLabels={listStartingEYR}
        reviews={reviewsStartingInThisYear}
        isWLPage={isWLPage}
        toggleFullView={toggleFullView}
        isFullView={isFullView}
        filterValues={filterValues}
        filters={{ ...filters, type: 'EYR_START' }}
      />
    </div>
  );
};

const titleStyles: Rule = ({ theme }) => ({
  fontStyle: 'normal',
  fontWeight: '700',
  fontSize: `${theme.font.fixed.f20.fontSize}`,
  display: 'inline-block',
  color: theme.colors.tescoBlue,
  paddingTop: '30px',
  paddingBottom: '16px',
});

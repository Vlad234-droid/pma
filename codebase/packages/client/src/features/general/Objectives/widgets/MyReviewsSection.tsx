import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import { Rule, useStyle } from '@pma/dex-wrapper';
import { colleagueUUIDSelector, getTimelineByCodeSelector, timelineTypesAvailabilitySelector } from '@pma/store';

import { Trans, useTranslation } from 'components/Translation';
import Section from 'components/Section';
import { ReviewWidget } from 'features/general/ReviewWidget';
import { ObjectiveType, ReviewType } from 'config/enum';
import { USER } from 'config/constants';

type Props = {};

export const MyReviewsSection: FC<Props> = () => {
  const { t } = useTranslation();
  const colleagueUuid = useSelector(colleagueUUIDSelector);

  const { css } = useStyle();

  const midYearReview = useSelector(getTimelineByCodeSelector(ObjectiveType.MYR, USER.current));
  const endYearReview = useSelector(getTimelineByCodeSelector(ObjectiveType.EYR, USER.current));
  const timelineTypes = useSelector(timelineTypesAvailabilitySelector(colleagueUuid)) || {};
  const canShowMyReview = timelineTypes[ObjectiveType.MYR] && timelineTypes[ObjectiveType.EYR];
  const canShowAnnualReview = !timelineTypes[ObjectiveType.MYR] && timelineTypes[ObjectiveType.EYR];

  return (
    <Section
      contentCustomStyle={widgetWrapperStyle}
      left={{
        content: (
          <div className={css(tileStyles)}>
            <Trans i18nKey='my_reviews'>My Reviews</Trans>
          </div>
        ),
      }}
    >
      {canShowMyReview && (
        <>
          <div data-test-id='personal' className={css(basicTileStyle)}>
            <ReviewWidget
              reviewType={ReviewType.MYR}
              status={midYearReview?.summaryStatus}
              startTime={midYearReview?.startTime}
              endTime={midYearReview?.endTime}
              lastUpdatedTime={midYearReview?.lastUpdatedTime}
              title={t('mid_year_review', 'Mid-year review')}
              customStyle={{ height: '100%' }}
            />
          </div>
          <div data-test-id='feedback' className={css(basicTileStyle)}>
            <ReviewWidget
              reviewType={ReviewType.EYR}
              status={endYearReview?.summaryStatus}
              startTime={endYearReview?.startTime}
              endTime={endYearReview?.endTime}
              lastUpdatedTime={endYearReview?.lastUpdatedTime}
              title={t('review_type_description_eyr', 'Year-end review')}
              customStyle={{ height: '100%' }}
            />
          </div>
        </>
      )}

      {canShowAnnualReview && (
        <div data-test-id='feedback' className={css(basicTileStyle)}>
          <ReviewWidget
            reviewType={ReviewType.EYR}
            status={endYearReview.status}
            startTime={endYearReview?.startTime}
            endTime={endYearReview?.endTime}
            lastUpdatedTime={endYearReview?.lastUpdatedTime}
            title={t('annual_performance_review', 'Annual performance review')}
            customStyle={{ height: '100%' }}
          />
        </div>
      )}
    </Section>
  );
};

const basicTileStyle: Rule = {
  flex: '1 0 230px',
};

const widgetWrapperStyle: Rule = {
  display: 'flex',
  flexWrap: 'wrap',
  gridGap: '8px',
  marginTop: '8px',
};
const tileStyles: Rule = ({ theme }) => ({
  ...theme.font.fixed.f18,
  letterSpacing: '0px',
  display: 'flex',
  alignItems: 'center',
});

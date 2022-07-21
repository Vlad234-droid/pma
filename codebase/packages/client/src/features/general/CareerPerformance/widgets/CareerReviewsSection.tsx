import React, { FC, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Rule, useStyle } from '@pma/dex-wrapper';
import {
  colleagueUUIDSelector,
  getTimelineByCodeSelector,
  timelinesExistSelector,
  timelineTypesAvailabilitySelector,
  USER,
} from '@pma/store';
import { ReviewWidget } from 'features/general/ReviewWidget';
import { Trans, useTranslation } from 'components/Translation';
import { ReviewType } from 'config/enum';
import { useHeaderContainer } from 'contexts/headerContext';
import { Page } from 'pages';
import Section from '../components/Section';

export const CareerReviewsSection: FC = () => {
  const { t } = useTranslation();
  const { css } = useStyle();
  const { setLinkTitle } = useHeaderContainer();
  const colleagueUuid = useSelector(colleagueUUIDSelector);
  const timelineTypes = useSelector(timelineTypesAvailabilitySelector(USER.current));
  const displayTimelines = useSelector(timelinesExistSelector(colleagueUuid));
  const midYearReview = useSelector(getTimelineByCodeSelector(ReviewType.MYR, USER.current));
  const endYearReview = useSelector(getTimelineByCodeSelector(ReviewType.EYR, USER.current));
  const showAnnualReview = !timelineTypes[ReviewType.MYR] && timelineTypes[ReviewType.EYR];
  const showMyReview = timelineTypes[ReviewType.MYR] && timelineTypes[ReviewType.EYR];

  useEffect(() => {
    if (showAnnualReview) {
      setLinkTitle({ [Page.OBJECTIVES_VIEW]: t('reviews', 'Reviews') });
    }
  }, [showAnnualReview]);

  return (
    <>
      {displayTimelines && (
        <>
          <Section title={<Trans i18nKey='my_reviews'>My reviews</Trans>}>
            <>
              {showMyReview && (
                <>
                  <div data-test-id='mid-year-review' className={css(basicTileStyle)}>
                    <ReviewWidget
                      reviewType={ReviewType.MYR}
                      status={midYearReview?.summaryStatus}
                      startTime={midYearReview?.startTime}
                      endTime={midYearReview?.endTime || undefined}
                      lastUpdatedTime={midYearReview?.lastUpdatedTime}
                      title={t('review_type_description_myr', 'Mid-year review')}
                      customStyle={{ height: '100%' }}
                    />
                  </div>
                  <div data-test-id='end-year-review' className={css(basicTileStyle)}>
                    <ReviewWidget
                      reviewType={ReviewType.EYR}
                      status={endYearReview?.summaryStatus}
                      startTime={endYearReview?.startTime}
                      endTime={endYearReview?.endTime || undefined}
                      lastUpdatedTime={endYearReview?.lastUpdatedTime}
                      title={t('review_type_description_eyr', 'Year-end review')}
                      customStyle={{ height: '100%' }}
                    />
                  </div>
                </>
              )}
              {showAnnualReview && (
                <div data-test-id='annual-performance-review' className={css(basicTileStyle)}>
                  <ReviewWidget
                    reviewType={ReviewType.EYR}
                    status={endYearReview?.summaryStatus}
                    startTime={endYearReview?.startTime}
                    endTime={endYearReview?.endTime || undefined}
                    lastUpdatedTime={endYearReview?.lastUpdatedTime}
                    title={t('annual_performance_review', 'Annual performance review')}
                    customStyle={{ height: '100%' }}
                  />
                </div>
              )}
            </>
          </Section>
        </>
      )}
    </>
  );
};

const basicTileStyle: Rule = {
  flex: '1 0 216px',
};

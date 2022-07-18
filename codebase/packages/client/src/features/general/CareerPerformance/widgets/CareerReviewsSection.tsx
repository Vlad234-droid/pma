import React, { FC, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Rule } from '@pma/dex-wrapper';
import {
  colleagueUUIDSelector,
  getTimelineByCodeSelector,
  timelinesExistSelector,
  timelineTypesAvailabilitySelector,
  USER,
} from '@pma/store';
import { Trans, useTranslation } from 'components/Translation';
import { ReviewType } from 'config/enum';
import { useHeaderContainer } from 'contexts/headerContext';
import { Page } from 'pages';
import ReviewWidgets from '../components/ReviewWidgets';
import Section from '../components/Section';

export const CareerReviewsSection: FC = () => {
  const { t } = useTranslation();
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
            <ReviewWidgets
              showMyReview={showMyReview}
              showAnnualReview={showAnnualReview}
              basicTileStyle={basicTileStyle}
              midYearReview={midYearReview}
              endYearReview={endYearReview}
            />
          </Section>
        </>
      )}
    </>
  );
};

const basicTileStyle: Rule = {
  flex: '1 0 216px',
};

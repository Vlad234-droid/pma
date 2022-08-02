import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import { Rule, useStyle } from '@pma/dex-wrapper';
import { colleagueUUIDSelector, timelineTypesAvailabilitySelector } from '@pma/store';

import { AnnualReviewWidget, MidYearReviewWidget, YearEndReviewWidget } from 'features/general/Objectives';
import { Trans } from 'components/Translation';
import Section from 'components/Section';
import { ReviewType } from 'config/enum';

export const MyReviewsSection: FC = () => {
  const colleagueUuid = useSelector(colleagueUUIDSelector);
  const { css } = useStyle();
  const timelineTypes = useSelector(timelineTypesAvailabilitySelector(colleagueUuid)) || {};
  const canShowMyReview = timelineTypes[ReviewType.MYR] && timelineTypes[ReviewType.EYR];
  const canShowAnnualReview = !timelineTypes[ReviewType.MYR] && timelineTypes[ReviewType.EYR];

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
          <MidYearReviewWidget />
          <YearEndReviewWidget />
        </>
      )}

      {canShowAnnualReview && <AnnualReviewWidget />}
    </Section>
  );
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

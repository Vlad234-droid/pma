import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import { Rule, useStyle } from '@pma/dex-wrapper';
import { timelineTypesAvailabilitySelector, uuidCompareSelector } from '@pma/store';

import { AnnualReviewWidget, MidYearReviewWidget, YearEndReviewWidget } from 'features/general/Reviews';
import { Trans } from 'components/Translation';
import Section from 'components/Section';
import { ReviewType } from 'config/enum';

type Props = {
  colleagueUuid: string;
};

export const ReviewsSection: FC<Props> = ({ colleagueUuid }) => {
  const { css } = useStyle();
  const isUserView = useSelector(uuidCompareSelector(colleagueUuid));

  const timelineTypes = useSelector(timelineTypesAvailabilitySelector(colleagueUuid)) || {};
  const canShowReview = timelineTypes[ReviewType.MYR] && timelineTypes[ReviewType.EYR];
  const canShowAnnualReview = !timelineTypes[ReviewType.MYR] && timelineTypes[ReviewType.EYR];

  return (
    <Section
      contentCustomStyle={widgetWrapperStyle}
      left={{
        content: (
          <div className={css(tileStyles)}>
            {isUserView ? <Trans i18nKey='my_reviews'>My Reviews</Trans> : <Trans i18nKey='reviews'>Reviews</Trans>}
          </div>
        ),
      }}
    >
      {canShowReview && (
        <>
          <MidYearReviewWidget colleagueUuid={colleagueUuid} />
          <YearEndReviewWidget colleagueUuid={colleagueUuid} />
        </>
      )}

      {canShowAnnualReview && <AnnualReviewWidget colleagueUuid={colleagueUuid} />}
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

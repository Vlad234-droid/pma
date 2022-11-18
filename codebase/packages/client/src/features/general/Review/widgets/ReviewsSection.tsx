import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import { Rule, useStyle } from '@pma/dex-wrapper';
import {
  colleagueCurrentCycleSelector,
  isAnniversaryTimelineType,
  timelineTypesAvailabilitySelector,
  uuidCompareSelector,
} from '@pma/store';

import { AnnualReviewWidget, MidYearReviewWidget, YearEndReviewWidget } from './';
import { Trans } from 'components/Translation';
import Section from 'components/Section';
import { ReviewType } from 'config/enum';

type Props = {
  colleagueUuid: string;
};

export const ReviewsSection: FC<Props> = ({ colleagueUuid }) => {
  const { css } = useStyle();
  const isUserView = useSelector(uuidCompareSelector(colleagueUuid));
  const currentCycle = useSelector(colleagueCurrentCycleSelector(colleagueUuid));
  const timelineTypes = useSelector(timelineTypesAvailabilitySelector(colleagueUuid, currentCycle)) || {};
  const isAnniversary = useSelector(isAnniversaryTimelineType(colleagueUuid, currentCycle));
  const hasMYR = timelineTypes[ReviewType.MYR];
  const hasEYR = timelineTypes[ReviewType.EYR];

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
      {isAnniversary ? (
        <AnnualReviewWidget colleagueUuid={colleagueUuid} />
      ) : (
        <>
          {hasMYR && <MidYearReviewWidget colleagueUuid={colleagueUuid} />}
          {hasEYR && <YearEndReviewWidget colleagueUuid={colleagueUuid} />}
        </>
      )}
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

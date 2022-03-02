import React, { FC, useEffect } from 'react';

import { Rule, useStyle } from '@dex-ddl/core';

import { Widgets as ObjectiveWidgets } from 'features/Objectives';
import { Trans, useTranslation } from 'components/Translation';
import { ReviewType, Status } from 'config/enum';
import { TimelineTypes } from 'config/types';
import { KnowledgeLibraryWidget } from 'features/KnowledgeLibrary';

import HelpWidgets from '../HelpWidgets';
import InfoWidgets from '../InfoWidgets';
import ReviewWidgets from '../ReviewWidgets';
import Section from '../Section';
import { Review } from '../../config/types';
import { Page } from 'pages';
import { useHeaderContainer } from 'contexts/headerContext';

type Props = {
  loadTimeline: (uuid: string) => void;
  descriptions: string[];
  startDates: string[];
  statuses: Status[];
  timelineTypes: TimelineTypes | {};
  midYearReview: Review;
  endYearReview: Review;
  colleagueUuid?: string;
  displayTimelines: boolean;
};

const CareerPerformance: FC<Props> = ({
  loadTimeline,
  descriptions,
  startDates,
  statuses,
  timelineTypes,
  midYearReview,
  endYearReview,
  colleagueUuid,
  displayTimelines,
}) => {
  const { css } = useStyle();
  const { t } = useTranslation();
  const { setLinkTitle } = useHeaderContainer();
  const showMyReview = timelineTypes[ReviewType.MYR] && timelineTypes[ReviewType.EYR];
  const showAnnualReview = !timelineTypes[ReviewType.MYR] && timelineTypes[ReviewType.EYR];

  useEffect(() => {
    if (colleagueUuid) loadTimeline(colleagueUuid);
  }, [colleagueUuid]);

  useEffect(() => {
    if (showAnnualReview) {
      setLinkTitle({ [Page.OBJECTIVES_VIEW]: t('reviews', 'Reviews') });
    }
  }, [showAnnualReview]);

  return (
    <>
      <div className={css(wrapperStyles)}>
        <InfoWidgets
          showMyReview={showMyReview}
          statuses={statuses}
          descriptions={descriptions}
          startDates={startDates}
        />
        <HelpWidgets />
      </div>
      {displayTimelines && (
        <>
          <ObjectiveWidgets />
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
      <Section title={<Trans i18nKey='useful_resources'>Useful resources</Trans>}>
        <KnowledgeLibraryWidget />
      </Section>
    </>
  );
};

const wrapperStyles: Rule = {
  display: 'flex',
  flexWrap: 'wrap',
  gridGap: '8px',
  marginTop: '8px',
};

const basicTileStyle: Rule = {
  flex: '1 0 216px',
};

export default CareerPerformance;

import React, { FC, useEffect } from 'react';

import { Rule, useStyle } from '@pma/dex-wrapper';

import { ObjectiveWidgets } from 'features/general/ObjectiveWidgets';
import { Trans, useTranslation } from 'components/Translation';
import { ReviewType, Status } from 'config/enum';
import { TimelineTypes } from 'config/types';
import { KnowledgeLibraryWidget } from 'features/general/KnowledgeLibrary';
import Spinner from 'components/Spinner';

import HelpWidgets from '../HelpWidgets';
import InfoWidgets from '../InfoWidgets';
import ReviewWidgets from '../ReviewWidgets';
import Section from '../Section';
import { Review } from '../../config/types';
import { Page } from 'pages';
import { useHeaderContainer } from 'contexts/headerContext';

type Props = {
  descriptions: string[];
  startDates: string[];
  statuses: Status[];
  timelineTypes: TimelineTypes | {};
  midYearReview: Review;
  endYearReview: Review;
  colleagueUuid?: string;
  displayTimelines: boolean;
  loading: boolean;
};

const CareerPerformance: FC<Props> = ({
  descriptions,
  startDates,
  statuses,
  timelineTypes,
  midYearReview,
  endYearReview,
  displayTimelines,
  loading,
}) => {
  const { css } = useStyle();
  const { t } = useTranslation();
  const { setLinkTitle } = useHeaderContainer();
  const showMyReview = timelineTypes[ReviewType.MYR] && timelineTypes[ReviewType.EYR];
  const showAnnualReview = !timelineTypes[ReviewType.MYR] && timelineTypes[ReviewType.EYR];

  useEffect(() => {
    if (showAnnualReview) {
      setLinkTitle({ [Page.OBJECTIVES_VIEW]: t('reviews', 'Reviews') });
    }
  }, [showAnnualReview]);

  if (loading) {
    return <Spinner fullHeight />;
  }

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
      <ObjectiveWidgets />
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

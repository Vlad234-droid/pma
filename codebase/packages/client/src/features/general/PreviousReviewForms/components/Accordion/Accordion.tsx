import React from 'react';
import { useSelector } from 'react-redux';
import { getReviewsWithStatuses } from '@pma/store';

import { Accordion as AccordionSection, Panel, Section } from 'components/Accordion';
// TODO: move to src/components
import ObjectiveHeader from 'features/general/Objectives/components/ObjectiveHeader';
import { useTranslation } from 'components/Translation';
import { ReviewForm } from '../ReviewForm';
import { ReviewType } from 'config/enum';

export const Accordion = () => {
  const reviews = useSelector(getReviewsWithStatuses);
  const { t } = useTranslation();

  const accordionInfo = [
    { title: t('mid_year_review', 'Mid-year review'), canShowStatus: true, id: 0 },
    { title: t('review_type_description_eyr', 'Year-end review'), canShowStatus: true, id: 1 },
  ];

  return (
    <AccordionSection id='objective-accordion'>
      <div>
        {reviews
          ?.filter(({ reviewType }) => reviewType === ReviewType.MYR || reviewType === ReviewType.EYR)
          ?.map((item, i) => ({ ...item, ...accordionInfo[i] }))
          ?.map(({ title, canShowStatus, status, reviewType, id }) => (
            <Section key={id}>
              <ObjectiveHeader {...{ title, ...(canShowStatus ? { status } : {}) }} />
              <Panel>
                <ReviewForm reviewType={reviewType} id={id} />
              </Panel>
            </Section>
          ))}
      </div>
    </AccordionSection>
  );
};

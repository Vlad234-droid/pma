import React, { FC, useState } from 'react';
import { Trans, useTranslation } from 'components/Translation';
import { Button, Rule, useStyle, Styles, useBreakpoints } from '@dex-ddl/core';
import { Status } from 'config/enum';

import { StepIndicator } from 'components/StepIndicator/StepIndicator';
import { Header } from 'components/Header';
import { IconButton, Position } from 'components/IconButton';

import { Accordion, CreateButton, Reviews, Section, StatusBadge, ShareWidget } from 'features/Objectives';
import { PreviousReviewFilesModal } from 'features/ReviewFiles/components';

const objectives = [
  {
    id: 'test-id-1',
    title: 'Objective 1',
    subTitle: 'Resolve customer issues and answers questions',
    description: 'I want our customers to be satisfied and always return to us',
    explanations: [
      {
        title: 'How will you MEET this objective?',
        steps: ['Have a possibility to scan all items', 'Be polite'],
      },
      {
        title: 'How will you EXCEED this objective??',
        steps: ['To tell about sales and discounts', 'To help packing purchases'],
      },
    ],
  },
  {
    id: 'test-id-2',
    title: 'Objective 2',
    subTitle: 'Resolve customer issues and answers questions',
    description: 'Description of objective',
    explanations: [
      {
        title: 'How will you MEET this objective?',
        steps: ['Be polite'],
      },
    ],
  },
  {
    id: 'test-id-3',
    title: 'Objective 3',
    subTitle: 'Process return transactions',
    description: 'Description of objective',
    explanations: [
      {
        title: 'How will you MEET this objective?',
        steps: ['To tell about objectives'],
      },
    ],
  },
];

const reviews = [
  {
    id: 'test-1',
    title: 'Mid-year review',
    description: 'Pharetra donec enim aenean aliquet consectetur ultrices amet vitae',
  },
  {
    id: 'test-2',
    title: 'End-year review',
    description: 'Pharetra donec enim aenean aliquet consectetur ultrices amet vitae',
  },
];

export const TEST_ID = 'objectives-pave';

const Objectives: FC = () => {
  const { css, theme } = useStyle();
  const { t } = useTranslation();
  const [previousReviewFilesModalShow, setPreviousReviewFilesModalShow] = useState(false);

  return (
    <div className={css({ margin: '8px' })}>
      <Header title='Objectives' />
      <div className={css({ display: 'flex' })}>
        <CreateButton withIcon />
      </div>
      <div className={css(headWrapperStyles)}>
        <div className={css(timelineWrapperStyles)}>
          <StepIndicator
            currentStatus={'pending'}
            currentStep={0}
            titles={['Set objectives', 'Mid-year review', 'End year review']}
            descriptions={['April 2021', 'September 2022', 'March 2022']}
          />
        </div>
        <ShareWidget
          customStyle={{ marginTop: '16px', flex: '1 1 30%', display: 'flex', flexDirection: 'column' }}
          onClick={() => alert('share')}
        />
      </div>
      <div className={css(bodyWrapperStyles)} data-test-id={TEST_ID}>
        <Section
          title={{
            content: t('objectives', 'Objectives'),
          }}
          left={{
            content: (
              <div className={css(tileStyles)}>
                <StatusBadge status={Status.APPROVED} styles={{ background: 'transparent' }} />
              </div>
            ),
          }}
          right={{
            content: (
              <div>
                <IconButton
                  onPress={() => alert('share')}
                  graphic='share'
                  customVariantRules={{ default: iconButtonStyles }}
                  iconStyles={iconStyles}
                  iconPosition={Position.RIGHT}
                >
                  <Trans i18nKey='download'>Download</Trans>
                </IconButton>
              </div>
            ),
          }}
        >
          <Accordion objectives={objectives} />
        </Section>
        <Section
          left={{
            content: (
              <div>
                <Trans i18nKey='my_completed_reviews'>My Completed Reviews</Trans>
              </div>
            ),
          }}
          right={{
            content: (
              <div>
                <Button mode='inverse' onPress={() => alert('view')} styles={[linkStyles({ theme })]}>
                  <Trans i18nKey='view_history'>View history</Trans>
                </Button>
              </div>
            ),
          }}
        >
          {reviews.length > 0 ? (
            <Reviews reviews={reviews} />
          ) : (
            t('no_completed_reviews', 'You have no completed reviews')
          )}
        </Section>
        <Section
          left={{
            content: (
              <div>
                <Trans i18nKey='previous_review_files'>Previous Review Files</Trans>
              </div>
            ),
          }}
          right={{
            content: (
              <div>
                <Button
                  mode='inverse'
                  onPress={() => setPreviousReviewFilesModalShow(true)}
                  styles={[linkStyles({ theme })]}
                >
                  <Trans i18nKey='view_files'>View Files</Trans>
                </Button>
              </div>
            ),
          }}
        >
          <Trans i18nKey='you_have_n_files'>You have 12 files</Trans>
        </Section>
      </div>
      {previousReviewFilesModalShow && (
        <PreviousReviewFilesModal onOverlayClick={() => setPreviousReviewFilesModalShow(false)} />
      )}
    </div>
  );
};

const headWrapperStyles: Rule = () => {
  const [, isBreakpoint] = useBreakpoints();
  const mobileScreen = isBreakpoint.small || isBreakpoint.xSmall;
  return {
    display: 'flex',
    gap: '10px',
    margin: '15px 0',
    flexDirection: mobileScreen ? 'column' : 'row',
  };
};

const timelineWrapperStyles = {
  flex: '3 1 70%',
  display: 'flex',
  flexDirection: 'column',
  '& > div': {
    height: '100%',
  },
} as Styles;

const bodyWrapperStyles: Rule = {
  maxWidth: '856px',
  display: 'flex',
  flexWrap: 'nowrap',
  marginTop: '16px',
  alignItems: 'stretch',
  flexDirection: 'column',
};

const iconStyles: Rule = {
  marginLeft: '10px',
};

const iconButtonStyles: Rule = ({ theme }) => ({
  padding: '10px 20px',
  color: theme.colors.tescoBlue,
});

const tileStyles: Rule = {
  display: 'flex',
  flexDirection: 'column',
};

const linkStyles = ({ theme }) => ({
  fontSize: '14px',
  lineHeight: '18px',
  color: theme.colors.tescoBlue,
  background: 'transparent',
});

export default Objectives;

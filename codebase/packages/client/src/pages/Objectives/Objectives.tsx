import React, { FC, useEffect, useState } from 'react';
import { Trans, useTranslation } from 'components/Translation';
import { Button, Rule, useStyle, Styles, useBreakpoints } from '@dex-ddl/core';
import { Status } from 'config/enum';

import { StepIndicator } from 'components/StepIndicator/StepIndicator';
import { Header } from 'components/Header';
import { IconButton } from 'components/IconButton';

import {
  Accordion,
  CreateButton,
  Reviews,
  Section,
  StatusBadge,
  ShareWidget,
  SecondaryWidget,
  SecondaryWidgetProps,
  ReviewWidget,
} from 'features/Objectives';
import { PreviousReviewFilesModal } from 'features/ReviewFiles/components';
import { useToast, Variant } from 'features/Toast';
import useDispatch from 'hooks/useDispatch';
import { useSelector } from 'react-redux';
import {
  getObjectivesStatusSelector,
  ObjectiveActions,
  objectivesMetaSelector,
  isObjectivesOverMinUnderMaxMarkup,
  SchemaActions,
  isObjectivesNumberInStatus,
  objectivesSelector,
} from '@pma/store';
import { getObjectiveSchema } from '@pma/store/src/selectors/schema';

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
  const mappedObjectives: any = [];
  const { css, theme } = useStyle();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [previousReviewFilesModalShow, setPreviousReviewFilesModalShow] = useState(false);
  const [objectives, setObjectives] = useState([]);

  const stateSchema = useSelector(getObjectiveSchema);
  // @ts-ignore
  const {
    components = [],
    meta: { loaded: schemaLoaded = false },
  } = stateSchema;
  const formElements = components.filter((component) => component.type != 'text');

  // @ts-ignore
  const { markup = { max: 0, min: 0 } } = useSelector(getObjectiveSchema);
  const { loaded: objectivesLoaded } = useSelector(objectivesMetaSelector);
  const status = useSelector(getObjectivesStatusSelector);
  const { origin } = useSelector(objectivesSelector);
  const isAllObjectivesByNumberApproved = useSelector(
    isObjectivesNumberInStatus(
      Status.APPROVED,
      Array.from(Array(markup.min), (_, i) => i + 1),
    ),
  );

  const canCreateSingleObjective = useSelector(isObjectivesOverMinUnderMaxMarkup(markup));

  useEffect(() => {
    dispatch(SchemaActions.getSchema({ formId: 'colleague_objectives_form' }));
    dispatch(ObjectiveActions.getObjectives({ performanceCycleUuid: '', colleagueUuid: 'colleagueUuid' }));
  }, []);
  useEffect(() => {
    if (objectivesLoaded && schemaLoaded) {
      origin?.forEach((objectiveItem) => {
        const status = objectiveItem.status;
        const objective = objectiveItem?.properties?.mapJson;
        const subTitle = objective['title'] || '';
        const description = objective['description'] || '';
        const explanations = formElements
          .filter(({ key }) => !['title', 'description'].includes(key))
          .map((component) => {
            const { key, label } = component;

            return { title: label, steps: objective[key] ? [objective[key]] : [] };
          });
        mappedObjectives.push({
          id: Number(objectiveItem.number),
          title: `Objective ${objectiveItem.number}`,
          subTitle: subTitle,
          description: description,
          explanations,
          status,
        });
      });
      setObjectives(mappedObjectives);
    }
  }, [objectivesLoaded, schemaLoaded]);

  const widgets: SecondaryWidgetProps[] = [
    {
      iconGraphic: 'add',
      title: t('personal_development_plan', 'Personal development plan'),
      date: t('personal_development_plan_date', 'Added 04 Apr 2021', { date: new Date(2021, 4, 4) }),
      customStyle: { flex: '2 1 110px' },
      onClick: () => alert('View1'),
    },
    {
      iconGraphic: 'chatSq',
      title: t('feedback', 'Feedback'),
      date: t('feedback_date', 'Last updated Apr 2021', { date: new Date(2021, 4, 4) }),
      customStyle: { flex: '2 1 110px' },
      onClick: () => alert('View2'),
    },
    {
      iconGraphic: 'alert',
      title: t('overdue_actions', 'Overdue actions'),
      date: t('collegue_reminders', 'Collegue reminders'),
      customStyle: { flex: '2 1 110px' },
      onClick: () => alert('View3'),
    },
  ];

  const { addToast } = useToast();

  const handleClick = () => {
    addToast({
      id: Date.now().toString(),
      title: t('do_you_know', 'Do you know?'),
      variant: Variant.INFO,
      description: t(
        'that_you_can_submit',
        'That you can submit new objectives at anytime during the performance cycle?',
      ),
    });
  };

  return (
    <div className={css({ margin: '8px' })}>
      <Header title='Objectives' />
      {canCreateSingleObjective && isAllObjectivesByNumberApproved && (
        <div className={css({ display: 'flex' })}>
          <CreateButton withIcon useSingleStep={true} />
        </div>
      )}
      <div className={css(headWrapperStyles)}>
        <div className={css(timelineWrapperStyles)} onClick={handleClick}>
          <StepIndicator
            currentStatus={'pending'}
            currentStep={0}
            titles={['Set objectives', 'Mid-year review', 'End year review']}
            descriptions={['April 2021', 'September 2022', 'March 2022']}
          />
        </div>
        <ShareWidget
          customStyle={{ flex: '1 1 30%', display: 'flex', flexDirection: 'column' }}
          onClick={() => alert('share')}
        />
      </div>
      <div className={css(bodyWrapperStyles)} data-test-id={TEST_ID}>
        <div className={css(timelineWrapperStyles)}>
          <Section
            left={{
              content: (
                <div className={css(tileStyles)}>
                  <Trans i18nKey='business_objectives'>Business Objectives</Trans>
                  <StatusBadge status={status} styles={{ marginLeft: '10px' }} />
                </div>
              ),
            }}
            right={{
              content: (
                <div>
                  <IconButton
                    onPress={() => alert('download')}
                    graphic='download'
                    customVariantRules={{ default: iconButtonStyles }}
                    iconStyles={iconStyles}
                  >
                    <Trans i18nKey='download'>Download</Trans>
                  </IconButton>
                  <IconButton
                    onPress={() => alert('share')}
                    graphic='share'
                    customVariantRules={{ default: iconButtonStyles }}
                    iconStyles={iconStyles}
                  >
                    <Trans i18nKey='share'>Share</Trans>
                  </IconButton>
                  <IconButton
                    onPress={() => alert('print')}
                    graphic='print'
                    customVariantRules={{ default: iconButtonStyles }}
                    iconStyles={iconStyles}
                  >
                    <Trans i18nKey='print'>Print</Trans>
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
          <Section contentCustomStyle={widgetWrapperStyle}>
            {widgets.map((props, idx) => (
              <SecondaryWidget key={idx} {...props} />
            ))}
          </Section>
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
            <div data-test-id='personal' className={css(basicTileStyle)}>
              <ReviewWidget
                status={Status.AVAILABLE}
                onClick={() => console.log('ReviewWidget')}
                description={t('tiles_description_id_3', 'Your mid-year review form and results will appear here.')}
                customStyle={{ height: '182px' }}
              />
            </div>
            <div data-test-id='feedback' className={css(basicTileStyle)}>
              <ReviewWidget
                status={Status.NOT_AVAILABLE}
                onClick={() => console.log('ReviewWidget')}
                description={t('tiles_description_id_3', 'Your mid-year review form and results will appear here.')}
                customStyle={{ height: '182px' }}
              />
            </div>
          </Section>
        </div>
        <div className={css({ flex: '1 1 30%', display: 'flex', flexDirection: 'column' })} />
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

const bodyWrapperStyles: Rule = () => {
  const [, isBreakpoint] = useBreakpoints();
  const mobileScreen = isBreakpoint.small || isBreakpoint.xSmall;
  return {
    display: 'flex',
    flexWrap: 'nowrap',
    marginTop: '16px',
    alignItems: 'stretch',
    paddingBottom: '20px',
    flexDirection: mobileScreen ? 'column' : 'row',
  };
};

const basicTileStyle: Rule = {
  flex: '1 0 216px',
};

const iconStyles: Rule = {
  marginRight: '10px',
};

const iconButtonStyles: Rule = ({ theme }) => ({
  padding: '10px 10px',
  color: theme.colors.tescoBlue,
  fontWeight: 700,
});

const tileStyles: Rule = {
  display: 'flex',
  alignItems: 'center',
};

const widgetWrapperStyle: Rule = {
  display: 'flex',
  flexWrap: 'wrap',
  gridGap: '8px',
  marginTop: '8px',
  marginBottom: '20px',
};

const linkStyles = ({ theme }) => ({
  fontSize: '14px',
  lineHeight: '18px',
  color: theme.colors.tescoBlue,
  background: 'transparent',
});

export default Objectives;

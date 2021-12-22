import React, { FC, useEffect, useState } from 'react';
import { Trans, useTranslation } from 'components/Translation';
import { Button, Rule, Styles, useBreakpoints, useStyle } from '@dex-ddl/core';
import { ObjectiveType, ReviewType } from 'config/enum';
import { StepIndicator } from 'components/StepIndicator/StepIndicator';
import { IconButton } from 'components/IconButton';

import {
  Accordion,
  CreateButton,
  ObjectiveTypes as OT,
  Reviews,
  ReviewWidget,
  SecondaryWidgetProps,
  Section,
  ShareWidget,
  StatusBadge,
  transformReviewsToObjectives,
} from 'features/Objectives';
import { PreviousReviewFilesModal } from 'features/ReviewFiles/components';
import { useToast, Variant } from 'features/Toast';
import useDispatch from 'hooks/useDispatch';
import { useSelector } from 'react-redux';
import {
  colleagueUUIDSelector,
  currentUserSelector,
  getTimelineByCodeSelector,
  getTimelineByReviewTypeSelector,
  getTimelineMetaSelector,
  getTimelineSelector,
  isReviewsInStatus,
  reviewsMetaSelector,
  schemaMetaSelector,
  TimelineActions,
  timelineTypesAvailabilitySelector,
} from '@pma/store';
import OrganizationWidget from 'features/Objectives/components/OrganizationWidget/OrganizationWidget';
import { useHistory } from 'react-router-dom';
import useReviewSchema from 'features/Objectives/hooks/useReviewSchema';
import useReviews from 'features/Objectives/hooks/useReviews';
import { Page } from 'pages';

const reviews = [
  {
    id: 'test-1',
    title: 'Mid-year review',
    description: 'Pharetra donec enim aenean aliquet consectetur ultrices amet vitae',
    reviewType: ReviewType.MYR,
  },
  {
    id: 'test-2',
    title: 'Year-end review',
    description: 'Pharetra donec enim aenean aliquet consectetur ultrices amet vitae',
    reviewType: ReviewType.EYR,
  },
];

const annualReviews = [
  {
    id: 'test-3',
    title: 'Annual performance review',
    description: 'Pharetra donec enim aenean aliquet consectetur ultrices amet vitae',
  },
];

export const TEST_ID = 'objectives-pave';

const Objectives: FC = () => {
  const { css, theme } = useStyle();
  const history = useHistory();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { info } = useSelector(currentUserSelector);
  const pathParams = { colleagueUuid: info.colleagueUUID, type: ReviewType.OBJECTIVE, cycleUuid: 'CURRENT' };
  const midYearReview = useSelector(getTimelineByCodeSelector(ObjectiveType.MYR));
  const endYearReview = useSelector(getTimelineByCodeSelector(ObjectiveType.EYR));
  const [previousReviewFilesModalShow, setPreviousReviewFilesModalShow] = useState(false);
  const [objectives, setObjectives] = useState<OT.Objective[]>([]);

  const { loaded: schemaLoaded } = useSelector(schemaMetaSelector);
  const { loaded: reviewLoaded } = useSelector(reviewsMetaSelector);
  const colleagueUuid = useSelector(colleagueUUIDSelector);
  const [schema] = useReviewSchema(ReviewType.OBJECTIVE);
  const { components = [], markup = { max: 0, min: 0 } } = schema;
  const { descriptions, startDates, statuses } = useSelector(getTimelineSelector) || {};
  const timelineTypes = useSelector(timelineTypesAvailabilitySelector);
  // TODO: always true
  const canShowObjectives = true || timelineTypes[ObjectiveType.OBJECTIVE];
  const canShowMyReview = timelineTypes[ObjectiveType.MYR] && timelineTypes[ObjectiveType.EYR];
  const canShowAnnualReview = !timelineTypes[ObjectiveType.MYR] && timelineTypes[ObjectiveType.EYR];

  const formElements = components.filter((component) => component.type != 'text');

  const timelineObjective = useSelector(getTimelineByReviewTypeSelector(ReviewType.OBJECTIVE));
  const status = timelineObjective?.status || undefined;

  const [origin] = useReviews({ pathParams });
  const isAllObjectivesInSameStatus = useSelector(isReviewsInStatus(ReviewType.OBJECTIVE)(status));

  const canCreateSingleObjective = markup.max > origin?.length;

  // todo not clear where reviews might come from. remove this block when its clear
  const createdReviews: any = [];
  if (canShowMyReview) {
    createdReviews.push(...reviews);
  } else if (canShowAnnualReview) {
    createdReviews.push(...annualReviews);
  }
  // todo remove block end

  useEffect(() => {
    if (reviewLoaded && schemaLoaded) {
      setObjectives(transformReviewsToObjectives(origin, formElements));
    }
  }, [reviewLoaded, schemaLoaded]);

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

  const { loaded } = useSelector(getTimelineMetaSelector) || {};

  useEffect(() => {
    if (!loaded) dispatch(TimelineActions.getTimeline({ colleagueUuid }));
  }, [loaded]);

  return (
    <div>
      {canCreateSingleObjective && canShowObjectives && (
        <div className={css({ display: 'flex' })}>
          <CreateButton withIcon useSingleStep={true} />
        </div>
      )}
      <div className={css(headWrapperStyles)}>
        {canShowMyReview && (
          <div className={css(timelineWrapperStyles)} onClick={handleClick}>
            <StepIndicator
              mainTitle={t('performance_timeline_title', 'Your Contribution timeline')}
              titles={descriptions}
              descriptions={startDates}
              statuses={statuses}
            />
          </div>
        )}

        <div className={css(widgetsBlock)}>
          <ShareWidget customStyle={shareWidgetStyles} />

          <OrganizationWidget
            customStyle={{ flex: '1 1 30%', display: 'flex', flexDirection: 'column' }}
            onClick={() => history.push(Page.VIEW_ORGANIZATION_OBJECTIVES)}
          />
        </div>
      </div>
      <div className={css(bodyWrapperStyles)} data-test-id={TEST_ID}>
        <div className={css(timelineWrapperStyles)}>
          {canShowObjectives && (
            <Section
              left={{
                content: (
                  <div className={css(tileStyles)}>
                    <Trans i18nKey='my_objectives'>My objectives</Trans>
                    {isAllObjectivesInSameStatus && <StatusBadge status={status} styles={{ marginLeft: '10px' }} />}
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
                  </div>
                ),
              }}
            >
              <Accordion objectives={objectives} canShowStatus={!isAllObjectivesInSameStatus} />
            </Section>
          )}
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
                <div data-test-id='personal' className={css(basicTileStyle)}>
                  <ReviewWidget
                    reviewType={ReviewType.MYR}
                    status={midYearReview?.status}
                    onClick={() => console.log('ReviewWidget')}
                    onClose={() => console.log('ReviewWidget')}
                    title={'Mid-year review'}
                    description={t(
                      'tiles_description_id_3',
                      "Complete this once you've had your mid-year conversation with your line manager.",
                    )}
                    customStyle={{ height: '100%' }}
                  />
                </div>
                <div data-test-id='feedback' className={css(basicTileStyle)}>
                  <ReviewWidget
                    reviewType={ReviewType.EYR}
                    status={endYearReview?.status}
                    onClick={() => console.log('ReviewWidget')}
                    onClose={() => console.log('ReviewWidget')}
                    title={'Year-end review'}
                    description={t(
                      'tiles_description_id_3',
                      "Complete this once you've had your year-end conversation with your line manager.",
                    )}
                    customStyle={{ height: '100%' }}
                  />
                </div>
              </>
            )}
            {canShowAnnualReview && (
              <div data-test-id='feedback' className={css(basicTileStyle)}>
                <ReviewWidget
                  reviewType={ReviewType.MYR}
                  status={midYearReview.status}
                  onClick={() => console.log('ReviewWidget')}
                  onClose={() => console.log('ReviewWidget')}
                  title={'Annual performance review'}
                  description={t(
                    'tiles_description_id_3',
                    "Complete this once you've had your annual conversation with your line manager.",
                  )}
                  customStyle={{ height: '100%' }}
                />
              </div>
            )}
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
              <Reviews reviews={createdReviews} />
            ) : (
              t('no_completed_reviews', 'You have no completed reviews')
            )}
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

const widgetsBlock = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'column',
} as Rule;

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
} as Styles;

const shareWidgetStyles = {
  display: 'flex',
  flexDirection: 'column',
  marginBottom: '20px',
  width: '100%',
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
};

const linkStyles = ({ theme }) => ({
  fontSize: '14px',
  lineHeight: '18px',
  color: theme.colors.tescoBlue,
  background: 'transparent',
});

export default Objectives;

import React, { FC, useEffect, useMemo, useState } from 'react';
import { Trans, useTranslation } from 'components/Translation';
import { Button, Rule, Styles, useBreakpoints, useStyle } from '@dex-ddl/core';
import { ObjectiveType, ReviewType } from 'config/enum';

import { StepIndicator } from 'components/StepIndicator/StepIndicator';
import { IconButton } from 'components/IconButton';

import {
  Accordion,
  ObjectiveTypes as OT,
  Reviews,
  Section,
  ShareWidget,
  transformReviewsToObjectives,
} from 'features/Objectives';
import { PreviousReviewFilesModal } from 'features/ReviewFiles/components';
import { useToast, Variant } from 'features/Toast';
import useDispatch from 'hooks/useDispatch';
import { useSelector } from 'react-redux';
import {
  getTimelineSelector,
  reviewsMetaSelector,
  schemaMetaSelector,
  TimelineActions,
  timelineTypesAvailabilitySelector,
} from '@pma/store';
import { useNavigate, useParams } from 'react-router';
import useReviewSchema from 'features/Objectives/hooks/useReviewSchema';
import useReviews from 'features/Objectives/hooks/useReviews';
import OrganizationWidget from 'features/Objectives/components/OrganizationWidget/OrganizationWidget';
import { buildPath } from 'features/Routes';
import { Page } from 'pages';

const reviews = [];

const annualReviews = [
  {
    id: 'test-3',
    title: 'Annual performance review',
    description: 'Pharetra donec enim aenean aliquet consectetur ultrices amet vitae',
  },
];

export const TEST_ID = 'user-objectives-page';

export const UserObjectives: FC = () => {
  const { css, theme } = useStyle();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [, isBreakpoint] = useBreakpoints();
  const mobileScreen = isBreakpoint.small || isBreakpoint.xSmall || isBreakpoint.medium;
  const [previousReviewFilesModalShow, setPreviousReviewFilesModalShow] = useState(false);
  const [objectives, setObjectives] = useState<OT.Objective[]>([]);
  const [schema] = useReviewSchema(ReviewType.OBJECTIVE);
  const { components = [] } = schema;

  const { loaded: schemaLoaded } = useSelector(schemaMetaSelector);
  const { loaded: reviewLoaded } = useSelector(reviewsMetaSelector);
  const { uuid } = useParams<{ uuid: string }>();
  const { descriptions, startDates, statuses } = useSelector(getTimelineSelector(uuid)) || {};
  const timelineTypes = useSelector(timelineTypesAvailabilitySelector(uuid));
  const canShowObjectives = timelineTypes[ObjectiveType.OBJECTIVE];
  const canShowMyReview = timelineTypes[ObjectiveType.MYR] && timelineTypes[ObjectiveType.EYR];
  const canShowAnnualReview = !timelineTypes[ObjectiveType.MYR] && timelineTypes[ObjectiveType.EYR];
  const params = useMemo(
    () => ({ pathParams: { colleagueUuid: uuid, type: ReviewType.OBJECTIVE, cycleUuid: 'CURRENT' } }),
    [uuid],
  );
  const [origin] = useReviews(params);
  const formElements = components.filter((component) => component.type != 'text');

  // todo not clear where reviews might come from. remove this block when its clear
  const createdReviews: any = [];
  if (canShowMyReview) {
    createdReviews.push(...reviews);
  } else if (canShowAnnualReview) {
    createdReviews.push(...annualReviews);
  }

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

  useEffect(() => {
    if (uuid) dispatch(TimelineActions.getTimeline({ colleagueUuid: uuid }));
  }, [uuid]);

  useEffect(() => {
    if (reviewLoaded && schemaLoaded) {
      setObjectives(transformReviewsToObjectives(origin, formElements));
    }
  }, [reviewLoaded, schemaLoaded]);

  return (
    <div className={css(bodyBlockStyles)}>
      <div className={css(bodyWrapperStyles)} data-test-id={TEST_ID}>
        {!mobileScreen && canShowMyReview && (
          <div onClick={handleClick} className={css(timelineWrapperStyles)}>
            <StepIndicator
              mainTitle={t('performance_timeline_title', 'Your Contribution timeline')}
              titles={descriptions}
              descriptions={startDates}
              statuses={statuses}
            />
          </div>
        )}
        <div className={css(timelineWrapperStyles)}>
          {canShowObjectives && (
            <Section
              left={{
                content: <div className={css(tileStyles)}>User objectives</div>,
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
                  </div>
                ),
              }}
            >
              <Accordion objectives={objectives} canShowStatus={true} isButtonsVisible={false} />
            </Section>
          )}

          <Section
            left={{
              content: <div>User Completed Reviews</div>,
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
      </div>
      <div className={css(headWrapperStyles)}>
        {mobileScreen && canShowMyReview && (
          <div className={css(timelineWrapperStyles)}>
            <StepIndicator
              mainTitle={t('performance_timeline_title', 'Your Contribution timeline')}
              titles={descriptions}
              descriptions={startDates}
              statuses={statuses}
            />
          </div>
        )}

        <div className={css(widgetsBlock)}>
          <ShareWidget stopShare={true} customStyle={shareWidgetStyles} />
          <OrganizationWidget
            customStyle={{ flex: '1 1 30%', display: 'flex', flexDirection: 'column' }}
            onClick={() => navigate(buildPath(Page.STRATEGIC_DRIVERS))}
          />
        </div>
      </div>
      {previousReviewFilesModalShow && (
        <PreviousReviewFilesModal onOverlayClick={() => setPreviousReviewFilesModalShow(false)} />
      )}
    </div>
  );
};

const bodyBlockStyles: Rule = () => {
  const [, isBreakpoint] = useBreakpoints();
  const mobileScreen = isBreakpoint.small || isBreakpoint.xSmall || isBreakpoint.medium;
  return {
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'center',
    flexDirection: mobileScreen ? 'column-reverse' : 'row',
  };
};

const widgetsBlock: Rule = () => {
  const [, isBreakpoint] = useBreakpoints();
  const mobileScreen = isBreakpoint.small || isBreakpoint.xSmall || isBreakpoint.medium;

  return {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    width: '100%',
    gap: '10px',
    paddingBottom: mobileScreen ? '20px' : '0px',
  };
};

const headWrapperStyles: Rule = () => {
  const [, isBreakpoint] = useBreakpoints();
  const mobileScreen = isBreakpoint.small || isBreakpoint.xSmall || isBreakpoint.medium;
  return {
    flex: '1 1 30%',
    width: mobileScreen ? '100%' : '30%',
    display: 'flex',
    flexDirection: 'column',
    paddingLeft: mobileScreen ? '0px' : '20px',
  };
};

const timelineWrapperStyles = {
  display: 'flex',
  flexDirection: 'column',
  marginBottom: '20px',
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
    alignItems: 'stretch',
    flexDirection: mobileScreen ? 'column' : 'column',
  };
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

const linkStyles = ({ theme }) => ({
  fontSize: '14px',
  lineHeight: '18px',
  color: theme.colors.tescoBlue,
  background: 'transparent',
});

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
import { useParams } from 'react-router';
import useReviewSchema from 'features/Objectives/hooks/useReviewSchema';
import useReviews from 'features/Objectives/hooks/useReviews';

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
    <div className={css({ margin: '8px' })}>
      <div className={css(headWrapperStyles)}>
        {canShowMyReview && (
          <div className={css(timelineWrapperStyles)} onClick={handleClick}>
            <StepIndicator
              mainTitle={'User Contribution timeline'}
              titles={descriptions}
              descriptions={startDates}
              statuses={statuses}
            />
          </div>
        )}
        <ShareWidget stopShare={true} customStyle={shareWidgetStyles} />
      </div>
      <div className={css(bodyWrapperStyles)} data-test-id={TEST_ID}>
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

const shareWidgetStyles = {
  flex: '1 1 30%',
  display: 'flex',
  flexDirection: 'column',
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

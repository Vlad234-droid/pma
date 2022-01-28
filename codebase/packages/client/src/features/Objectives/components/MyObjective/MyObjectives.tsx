import React, { FC, useEffect, useMemo, useState } from 'react';
import { Trans, useTranslation } from 'components/Translation';
import { Button, Rule, Styles, useBreakpoints, useStyle } from '@dex-ddl/core';
import { ObjectiveType, ReviewType, Status } from 'config/enum';
import { StepIndicator } from 'components/StepIndicator/StepIndicator';
import { IconButton } from 'components/IconButton';
import { downloadPDF, ObjectiveDocument, usePDF } from '@pma/pdf-renderer';
import { canEditAllObjectiveFn, REVIEW_MODIFICATION_MODE, reviewModificationModeFn } from '../../utils';

import {
  Accordion,
  CreateButton,
  ObjectiveTypes as OT,
  Reviews,
  ReviewWidget,
  Section,
  ShareWidget,
  StatusBadge,
  transformReviewsToObjectives,
} from 'features/Objectives';
import { PreviousReviewFilesModal } from 'features/ReviewFiles/components';
import useDispatch from 'hooks/useDispatch';
import { useSelector } from 'react-redux';
import {
  colleagueUUIDSelector,
  countByStatusReviews,
  countByTypeReviews,
  filterReviewsByTypeSelector,
  getReviewSchema,
  getTimelineByCodeSelector,
  getTimelineMetaSelector,
  getTimelineSelector,
  isReviewsInStatus,
  isReviewsNumbersInStatus,
  ReviewsActions,
  reviewsMetaSelector,
  schemaMetaSelector,
  TimelineActions,
  timelineTypesAvailabilitySelector,
} from '@pma/store';
import OrganizationWidget from 'features/Objectives/components/OrganizationWidget/OrganizationWidget';
import { useNavigate } from 'react-router-dom';
import useReviewSchema from 'features/Objectives/hooks/useReviewSchema';
import { Page } from 'pages';
import { buildPath } from 'features/Routes';
import EditButton from '../Buttons/EditButton';

const reviews = [];

const annualReviews = [
  {
    id: 'test-3',
    title: 'Annual performance review',
    description: 'Pharetra donec enim aenean aliquet consectetur ultrices amet vitae',
  },
];

export const TEST_ID = 'my-objectives-page';

const MyObjectives: FC = () => {
  const { css, theme } = useStyle();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const originObjectives = useSelector(filterReviewsByTypeSelector(ReviewType.OBJECTIVE));
  const midYearReview = useSelector(getTimelineByCodeSelector(ObjectiveType.MYR));
  const endYearReview = useSelector(getTimelineByCodeSelector(ObjectiveType.EYR));
  const [previousReviewFilesModalShow, setPreviousReviewFilesModalShow] = useState(false);
  const [objectives, setObjectives] = useState<OT.Objective[]>([]);

  const document = useMemo(() => <ObjectiveDocument items={objectives} />, [objectives.length]);

  const [instance, updateInstance] = usePDF({ document });

  const { loaded: schemaLoaded } = useSelector(schemaMetaSelector);
  const { loaded: reviewLoaded } = useSelector(reviewsMetaSelector);
  const colleagueUuid = useSelector(colleagueUUIDSelector);
  const [schema] = useReviewSchema(ReviewType.OBJECTIVE) || {};
  const { components = [], markup = { max: 0, min: 0 } } = schema;
  const { descriptions, startDates, statuses } = useSelector(getTimelineSelector) || {};
  const timelineTypes = useSelector(timelineTypesAvailabilitySelector) || {};
  const canShowObjectives = timelineTypes[ObjectiveType.OBJECTIVE];
  const canShowMyReview = timelineTypes[ObjectiveType.MYR] && timelineTypes[ObjectiveType.EYR];
  const canShowAnnualReview = !timelineTypes[ObjectiveType.MYR] && timelineTypes[ObjectiveType.EYR];

  const formElements = components.filter((component) => component.type != 'text');

  const timelineObjective = useSelector(getTimelineByCodeSelector(ReviewType.OBJECTIVE)) || {};
  const status = timelineObjective?.status || undefined;
  const isAllObjectivesInSameStatus = useSelector(isReviewsInStatus(ReviewType.OBJECTIVE)(status));
  const countReviews = useSelector(countByTypeReviews(ReviewType.OBJECTIVE)) || 0;
  const objectiveSchema = useSelector(getReviewSchema(ReviewType.OBJECTIVE));
  const countDraftReviews = useSelector(countByStatusReviews(ReviewType.OBJECTIVE, Status.DRAFT)) || 0;
  const countDeclinedReviews = useSelector(countByStatusReviews(ReviewType.OBJECTIVE, Status.DECLINED)) || 0;

  const reviewsMinNumbersInStatusApproved = useSelector(
    isReviewsNumbersInStatus(ReviewType.OBJECTIVE)(Status.APPROVED, markup.min),
  );

  const reviewModificationMode = reviewModificationModeFn(countReviews, objectiveSchema);
  const canEditAllObjective = canEditAllObjectiveFn({ objectiveSchema, countDraftReviews, countDeclinedReviews });
  const createIsAvailable =
    (reviewsMinNumbersInStatusApproved ||
      timelineObjective.status === Status.DRAFT ||
      originObjectives?.length === 0) &&
    countReviews < markup.max &&
    reviewModificationMode !== REVIEW_MODIFICATION_MODE.NONE;

  // todo not clear where reviews might come from. remove this block when its clear
  const createdReviews: any = [];
  if (canShowMyReview) {
    createdReviews.push(...reviews);
  } else if (canShowAnnualReview) {
    createdReviews.push(...annualReviews);
  }
  // todo remove block end

  useEffect(() => {
    if (objectives.length) {
      updateInstance();
    }
  }, [objectives.length]);

  useEffect(() => {
    if (reviewLoaded && schemaLoaded) {
      setObjectives(transformReviewsToObjectives(originObjectives, formElements));
    }
  }, [reviewLoaded, schemaLoaded]);

  useEffect(() => {
    if (colleagueUuid) {
      dispatch(TimelineActions.getTimeline({ colleagueUuid }));
    }
  }, [colleagueUuid]);

  useEffect(() => {
    if (colleagueUuid && canShowObjectives) {
      dispatch(
        ReviewsActions.getColleagueReviews({ pathParams: { colleagueUuid: colleagueUuid, cycleUuid: 'CURRENT' } }),
      );
    }
  }, [colleagueUuid, canShowObjectives]);

  return (
    <div data-test-id={TEST_ID}>
      {createIsAvailable && (
        <div className={css({ display: 'flex' })}>
          <CreateButton
            withIcon
            useSingleStep={reviewModificationMode === REVIEW_MODIFICATION_MODE.SINGLE}
            buttonText='Create objective'
          />
        </div>
      )}
      <div className={css(headWrapperStyles)}>
        {canShowMyReview && (
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
          <ShareWidget customStyle={shareWidgetStyles} />

          <OrganizationWidget
            customStyle={{ flex: '1 1 30%', display: 'flex', flexDirection: 'column' }}
            onClick={() => navigate(buildPath(Page.STRATEGIC_DRIVERS))}
          />
        </div>
      </div>
      <div className={css(bodyWrapperStyles)}>
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
                      onPress={() => downloadPDF(instance.url!, 'objectives.pdf')}
                      graphic='download'
                      customVariantRules={{ default: iconButtonStyles }}
                      iconStyles={iconStyles}
                    >
                      <Trans i18nKey='download'>Download</Trans>
                    </IconButton>
                    {canEditAllObjective && (
                      <EditButton
                        isSingleObjectivesEditMode={false}
                        buttonText={t('edit_all', 'Edit all')}
                        icon={'edit'}
                        styles={borderButtonStyles}
                      />
                    )}
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
                    startTime={midYearReview?.startTime}
                    endTime={midYearReview?.endTime}
                    lastUpdatedTime={midYearReview?.lastUpdatedTime}
                    onClick={() => console.log('ReviewWidget')}
                    onClose={() => console.log('ReviewWidget')}
                    title={'Mid-year review'}
                    customStyle={{ height: '100%' }}
                  />
                </div>
                <div data-test-id='feedback' className={css(basicTileStyle)}>
                  <ReviewWidget
                    reviewType={ReviewType.EYR}
                    status={endYearReview?.status}
                    startTime={endYearReview?.startTime}
                    endTime={endYearReview?.endTime}
                    lastUpdatedTime={endYearReview?.lastUpdatedTime}
                    onClick={() => console.log('ReviewWidget')}
                    onClose={() => console.log('ReviewWidget')}
                    title={'Year-end review'}
                    customStyle={{ height: '100%' }}
                  />
                </div>
              </>
            )}
            {canShowAnnualReview && (
              <div data-test-id='feedback' className={css(basicTileStyle)}>
                <ReviewWidget
                  reviewType={ReviewType.EYR}
                  status={endYearReview.status}
                  startTime={endYearReview?.startTime}
                  endTime={endYearReview?.endTime}
                  lastUpdatedTime={endYearReview?.lastUpdatedTime}
                  onClick={() => console.log('ReviewWidget')}
                  onClose={() => console.log('ReviewWidget')}
                  title={'Annual performance review'}
                  customStyle={{ height: '100%' }}
                />
              </div>
            )}
          </Section>
          <Section
            left={{
              content: (
                <div>
                  <Trans i18nKey='my_completed_reviews'>My completed Reviews</Trans>
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
  fontWeight: theme.font.weight.bold,
});

const borderButtonStyles: Rule = ({ theme }) => ({
  border: `1px solid ${theme.colors.tescoBlue}`,
  borderRadius: '30px',
  padding: '10px 20px',
  color: theme.colors.tescoBlue,
  fontWeight: theme.font.weight.bold,
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

export default MyObjectives;

import React, { FC, useEffect, useMemo, useState } from 'react';
import { Trans, useTranslation } from 'components/Translation';
import { Button, Rule, Styles, useBreakpoints, useStyle } from '@dex-ddl/core';
import { ObjectiveType, ReviewType, Status } from 'config/enum';
import { StepIndicator } from 'components/StepIndicator/StepIndicator';
import { IconButton } from 'components/IconButton';
import { downloadPDF, ObjectiveDocument, usePDF } from '@pma/pdf-renderer';
import { canEditAllObjectiveFn, REVIEW_MODIFICATION_MODE, reviewModificationModeFn } from '../../utils';
import { useHeaderContainer } from 'contexts/headerContext';

import {
  Accordion,
  CreateButton,
  ObjectiveTypes as OT,
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
  getPreviousReviewFilesSelector,
  getReviewSchema,
  getTimelineByCodeSelector,
  getTimelineSelector,
  isReviewsInStatus,
  isReviewsNumbersInStatus,
  PreviousReviewFilesActions,
  ReviewsActions,
  reviewsMetaSelector,
  schemaMetaSelector,
  TimelineActions,
  timelineTypesAvailabilitySelector,
  getTimelineMetaSelector,
} from '@pma/store';
import OrganizationWidget from 'features/Objectives/components/OrganizationWidget/OrganizationWidget';
import { useNavigate } from 'react-router-dom';
import useReviewSchema from 'features/Objectives/hooks/useReviewSchema';
import { Page } from 'pages';
import { buildPath } from 'features/Routes';
import Spinner from 'components/Spinner';
import EditButton from '../Buttons/EditButton';
import { File } from '../../../ReviewFiles/components/components/File';

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
  const { setLinkTitle } = useHeaderContainer();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [, isBreakpoint] = useBreakpoints();
  const mobileScreen = isBreakpoint.small || isBreakpoint.xSmall || isBreakpoint.medium;

  const originObjectives = useSelector(filterReviewsByTypeSelector(ReviewType.OBJECTIVE));
  const midYearReview = useSelector(getTimelineByCodeSelector(ObjectiveType.MYR, 'me'));
  const endYearReview = useSelector(getTimelineByCodeSelector(ObjectiveType.EYR, 'me'));
  const [previousReviewFilesModalShow, setPreviousReviewFilesModalShow] = useState(false);
  const [objectives, setObjectives] = useState<OT.Objective[]>([]);

  const document = useMemo(() => <ObjectiveDocument items={objectives} />, [JSON.stringify(objectives)]);

  const [instance, updateInstance] = usePDF({ document });

  const { loaded: schemaLoaded } = useSelector(schemaMetaSelector);
  const { loaded: reviewLoaded } = useSelector(reviewsMetaSelector);
  const { loaded: timelineLoaded } = useSelector(getTimelineMetaSelector);
  const colleagueUuid = useSelector(colleagueUUIDSelector);
  const [schema] = useReviewSchema(ReviewType.OBJECTIVE) || {};
  const { components = [], markup = { max: 0, min: 0 } } = schema;
  const { descriptions, startDates, statuses } = useSelector(getTimelineSelector(colleagueUuid)) || {};
  const timelineTypes = useSelector(timelineTypesAvailabilitySelector(colleagueUuid)) || {};
  const timelineObjective = useSelector(getTimelineByCodeSelector(ReviewType.OBJECTIVE, 'me')) || {};
  const status = timelineObjective?.status || undefined;
  const isAllObjectivesInSameStatus = useSelector(isReviewsInStatus(ReviewType.OBJECTIVE)(status));

  const canShowObjectives = timelineTypes[ObjectiveType.OBJECTIVE];
  const canShowMyReview = timelineTypes[ObjectiveType.MYR] && timelineTypes[ObjectiveType.EYR];
  const canShowAnnualReview = !timelineTypes[ObjectiveType.MYR] && timelineTypes[ObjectiveType.EYR];

  const formElements = components.filter((component) => component.type != 'text');

  const countReviews = useSelector(countByTypeReviews(ReviewType.OBJECTIVE)) || 0;
  const objectiveSchema = useSelector(getReviewSchema(ReviewType.OBJECTIVE));
  const countDraftReviews = useSelector(countByStatusReviews(ReviewType.OBJECTIVE, Status.DRAFT)) || 0;
  const countDeclinedReviews = useSelector(countByStatusReviews(ReviewType.OBJECTIVE, Status.DECLINED)) || 0;
  const files: File[] = useSelector(getPreviousReviewFilesSelector) || [];

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

  useEffect(() => {
    dispatch(PreviousReviewFilesActions.getPreviousReviewFiles({ colleagueUUID: colleagueUuid }));
  }, []);

  // todo remove block end
  useEffect(() => {
    if (objectives.length) {
      updateInstance();
    }
  }, [JSON.stringify(objectives)]);

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

  useEffect(() => {
    if (canShowAnnualReview) {
      setLinkTitle({ [Page.OBJECTIVES_VIEW]: t('reviews', 'Reviews') });
    }
  }, [canShowAnnualReview]);

  return (
    <div data-test-id={TEST_ID}>
      {createIsAvailable && (
        <div className={css({ display: 'flex', marginBottom: '20px' })}>
          <CreateButton
            withIcon
            useSingleStep={reviewModificationMode === REVIEW_MODIFICATION_MODE.SINGLE}
            buttonText='Create objective'
          />
        </div>
      )}
      <div className={css(bodyBlockStyles)}>
        <div className={css(bodyWrapperStyles)}>
          {!timelineLoaded ? <Spinner id='1' /> : (
            <>
              {!mobileScreen && canShowMyReview && (
                <div className={css(timelineWrapperStyles)}>
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
                      content: (
                        <div className={css(tileStyles)}>
                          <Trans i18nKey='my_objectives'>My objectives</Trans>
                          {isAllObjectivesInSameStatus && ![Status.STARTED, Status.NOT_STARTED].includes(status) && (
                            <StatusBadge status={status} styles={statusBadgeStyle} />
                          )}
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
                    {!schemaLoaded ? <Spinner /> : objectives.length ? (
                      <Accordion objectives={objectives} canShowStatus={!isAllObjectivesInSameStatus} />
                    ) : (
                      <div className={css(emptyBlockStyle)}>
                        <Trans i18nKey={'no_objectives_created'}>No objectives created</Trans>
                      </div>
                    )}
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
                          <Trans i18nKey='view_files'>View files</Trans>
                        </Button>
                      </div>
                    ),
                  }}
                >
                  <div className={css(emptyBlockStyle)}>
                    <Trans>{`You have ${files.length || 'no'} files`}</Trans>
                  </div>
                </Section>
              </div>
            </>
          )}
        </div>
        <div className={css(widgetWrapper)}>
          {!timelineLoaded && (
            <div className={css(timelineWrapperWidget)}>
              <Spinner id='2' />
            </div>
          )}
          {mobileScreen && canShowMyReview && timelineLoaded && (
            <div className={css(timelineWrapperWidget)}>
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

            <ShareWidget customStyle={shareWidgetStyles} />

            <OrganizationWidget
              customStyle={{ flex: '1 1 30%', display: 'flex', flexDirection: 'column' }}
              onClick={() => navigate(buildPath(Page.STRATEGIC_DRIVERS))}
            />
          </div>
        </div>
      </div>

      {previousReviewFilesModalShow && (
        <PreviousReviewFilesModal
          onOverlayClick={() => setPreviousReviewFilesModalShow(false)}
          colleagueUUID={colleagueUuid}
        />
      )}
    </div>
  );
};

const widgetWrapper: Rule = () => {
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
    paddingBottom: mobileScreen ? '20px' : '0px',
  };
};

const timelineWrapperStyles = {
  flex: '3 1 70%',
  display: 'flex',
  flexDirection: 'column',
} as Styles;

const timelineWrapperWidget = {
  display: 'flex',
  flexDirection: 'column',
  marginBottom: '20px',
} as Rule;

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
    width: '100%',
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
  color: theme.colors.tescoBlue,
  fontWeight: theme.font.weight.bold,
  padding: '10px 20px 10px 20px',
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
  fontSize: theme.font.fixed.f14.fontSize,
  lineHeight: theme.font.fixed.f14.lineHeight,
  color: theme.colors.tescoBlue,
  background: 'transparent',
});

const statusBadgeStyle: Rule = { marginLeft: '10px' };
const emptyBlockStyle: Rule = { paddingBottom: '20px' };

export default MyObjectives;

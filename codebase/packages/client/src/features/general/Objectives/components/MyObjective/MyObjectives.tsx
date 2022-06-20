import React, { FC, useEffect, useMemo, useState } from 'react';
import { Button, CreateRule, Rule, Styles, useStyle } from '@pma/dex-wrapper';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
  colleagueUUIDSelector,
  countByStatusReviews,
  countByTypeReviews,
  currentUserSelector,
  filterReviewsByTypeSelector,
  getPreviousReviewFilesSelector,
  getReviewSchema,
  getTimelineByCodeSelector,
  getTimelineMetaSelector,
  getTimelineSelector,
  isReviewsNumbersInStatus,
  ObjectiveSharingActions,
  PreviousReviewFilesActions,
  ReviewsActions,
  reviewsMetaSelector,
  SchemaActions,
  schemaMetaSelector,
  TimelineActions,
  timelinesExistSelector,
  timelinesMetaSelector,
  timelineTypesAvailabilitySelector,
} from '@pma/store';

import { CreateButton, ObjectiveTypes as OT, Section, transformReviewsToObjectives } from 'features/general/Objectives';
import { ReviewWidget } from 'features/general/ReviewWidget';
import { PreviousReviewFilesModal } from 'features/general/ReviewFiles/components';
import { ShareWidget } from 'features/general/ShareWidget';
import useDispatch from 'hooks/useDispatch';
import { OrganizationWidget } from 'features/general/OrganizationWidget';
import { CompletedReviewsModal } from 'features/general/CompletedReviews';
import { USER } from 'config/constants';
import { Page } from 'pages';
import { buildPath } from 'features/general/Routes';
import Spinner from 'components/Spinner';
import { Trans, useTranslation } from 'components/Translation';
import { ObjectiveType, ReviewType, Status } from 'config/enum';
import { StepIndicator } from 'components/StepIndicator/StepIndicator';
import { useHeaderContainer } from 'contexts/headerContext';
import { usePermissionByTenant, tenant } from 'features/general/Permission';
import { canEditAllObjectiveFn, REVIEW_MODIFICATION_MODE, reviewModificationModeFn } from '../../utils';
import { File } from '../../../ReviewFiles/components/components/File';
import { Objectives } from './Objectives';

export const TEST_ID = 'my-objectives-page';

// TODO: move to separate component
const WidgetBlock = () => {
  const navigate = useNavigate();
  const { css } = useStyle();

  const hasPermission = usePermissionByTenant([tenant.GENERAL]);
  return (
    <div className={css(widgetsBlock)}>
      <ShareWidget stopShare={true} sharing={false} customStyle={shareWidgetStyles} />
      <ShareWidget stopShare={false} sharing={true} customStyle={shareWidgetStyles} />
      {hasPermission && (
        <OrganizationWidget
          customStyle={organizationWidgetStyles}
          onClick={() => navigate(buildPath(Page.STRATEGIC_DRIVERS))}
        />
      )}
    </div>
  );
};

// TODO: move to separate component
const ReviewBlock: FC<{ canShow: Boolean }> = ({ canShow }) => {
  const midYearReview = useSelector(getTimelineByCodeSelector(ObjectiveType.MYR, USER.current));
  const endYearReview = useSelector(getTimelineByCodeSelector(ObjectiveType.EYR, USER.current));
  const { t } = useTranslation();
  const { css } = useStyle();
  if (!canShow) return null;

  return (
    <>
      <div data-test-id='personal' className={css(basicTileStyle)}>
        <ReviewWidget
          reviewType={ReviewType.MYR}
          status={midYearReview?.summaryStatus}
          startTime={midYearReview?.startTime}
          endTime={midYearReview?.endTime}
          lastUpdatedTime={midYearReview?.lastUpdatedTime}
          title={t('mid_year_review', 'Mid-year review')}
          customStyle={{ height: '100%' }}
        />
      </div>
      <div data-test-id='feedback' className={css(basicTileStyle)}>
        <ReviewWidget
          reviewType={ReviewType.EYR}
          status={endYearReview?.summaryStatus}
          startTime={endYearReview?.startTime}
          endTime={endYearReview?.endTime}
          lastUpdatedTime={endYearReview?.lastUpdatedTime}
          title={t('review_type_description_eyr', 'Year-end review')}
          customStyle={{ height: '100%' }}
        />
      </div>
    </>
  );
};

// TODO: move part of codebase to page
const MyObjectives: FC = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { css, theme, matchMedia } = useStyle();
  const { setLinkTitle } = useHeaderContainer();

  const mobileScreen = matchMedia({ xSmall: true, small: true, medium: true }) || false;

  const originObjectives = useSelector(filterReviewsByTypeSelector(ReviewType.OBJECTIVE));
  const endYearReview = useSelector(getTimelineByCodeSelector(ObjectiveType.EYR, USER.current));

  const [previousReviewFilesModalShow, setPreviousReviewFilesModalShow] = useState(false);
  const [isCompletedReviewsModalOpen, setCompletedReviewsModalOpen] = useState(false);
  const [objectives, setObjectives] = useState<OT.Objective[]>([]);

  const { loaded: schemaLoaded } = useSelector(schemaMetaSelector);
  const { loaded: reviewLoaded } = useSelector(reviewsMetaSelector);
  const { loaded: timelineLoaded } = useSelector(getTimelineMetaSelector);
  const colleagueUuid = useSelector(colleagueUUIDSelector);
  const timelinesExist = useSelector(timelinesExistSelector(colleagueUuid));
  const { loaded: timelinesLoaded } = useSelector(timelinesMetaSelector());
  const schema = useSelector(getReviewSchema(ReviewType.OBJECTIVE));
  const { components = [], markup = { max: 0, min: 0 } } = schema;
  const { descriptions, startDates, summaryStatuses } = useSelector(getTimelineSelector(colleagueUuid)) || {};
  const timelineTypes = useSelector(timelineTypesAvailabilitySelector(colleagueUuid)) || {};
  const timelineObjective = useSelector(getTimelineByCodeSelector(ReviewType.OBJECTIVE, USER.current)) || {};

  const canShowObjectives = timelineTypes[ObjectiveType.OBJECTIVE];
  const canShowMyReview = timelineTypes[ObjectiveType.MYR] && timelineTypes[ObjectiveType.EYR];
  const canShowAnnualReview = !timelineTypes[ObjectiveType.MYR] && timelineTypes[ObjectiveType.EYR];

  const formElements = components.filter((component) => component.type != 'text');

  const { info } = useSelector(currentUserSelector);
  const countReviews = useSelector(countByTypeReviews(ReviewType.OBJECTIVE)) || 0;
  const objectiveSchema = useSelector(getReviewSchema(ReviewType.OBJECTIVE));
  const countDraftReviews = useSelector(countByStatusReviews(ReviewType.OBJECTIVE, Status.DRAFT)) || 0;
  const countDeclinedReviews = useSelector(countByStatusReviews(ReviewType.OBJECTIVE, Status.DECLINED)) || 0;
  const countWaitingForApprovalReviews =
    useSelector(countByStatusReviews(ReviewType.OBJECTIVE, Status.WAITING_FOR_APPROVAL)) || 0;
  const files: File[] = useSelector(getPreviousReviewFilesSelector) || [];

  const reviewsMinNumbersInStatusApproved = useSelector(
    isReviewsNumbersInStatus(ReviewType.OBJECTIVE)(Status.APPROVED, markup.min),
  );

  const reviewModificationMode = reviewModificationModeFn(countReviews, objectiveSchema);
  const canEditAllObjective = canEditAllObjectiveFn({
    objectiveSchema,
    countDraftReviews,
    countDeclinedReviews,
    countWaitingForApprovalReviews,
  });
  const createIsAvailable =
    (reviewsMinNumbersInStatusApproved ||
      timelineObjective.status === Status.DRAFT ||
      originObjectives?.length === 0) &&
    countReviews < markup.max &&
    reviewModificationMode !== REVIEW_MODIFICATION_MODE.NONE;

  const renderStepIndicator: Boolean = (mobileScreen && canShowMyReview && timelineLoaded) || false;

  const pathParams = useMemo(() => ({ colleagueUuid: info.colleagueUUID, cycleUuid: 'CURRENT' }), [info.colleagueUUID]);
  const isValidPathParams = pathParams.colleagueUuid;

  useEffect(() => {
    dispatch(PreviousReviewFilesActions.getPreviousReviewFiles({ colleagueUUID: colleagueUuid }));
  }, []);

  useEffect(() => {
    isValidPathParams && dispatch(ObjectiveSharingActions.checkSharing(pathParams));
    isValidPathParams && dispatch(ObjectiveSharingActions.getSharings(pathParams));
  }, [isValidPathParams]);

  useEffect(() => {
    if (colleagueUuid) {
      dispatch(TimelineActions.getTimeline({ colleagueUuid }));
    }
  }, [colleagueUuid]);

  useEffect(() => {
    if (timelinesLoaded && !timelinesExist) {
      navigate(`/${Page.NOT_FOUND}`);
    }
  }, [timelinesLoaded, timelinesExist]);

  useEffect(() => {
    if (reviewLoaded && schemaLoaded) {
      setObjectives(transformReviewsToObjectives(originObjectives, formElements));
    }
  }, [reviewLoaded, schemaLoaded]);

  useEffect(() => {
    if (canShowAnnualReview) {
      setLinkTitle({ [Page.OBJECTIVES_VIEW]: t('reviews', 'Reviews') });
    }
  }, [canShowAnnualReview]);

  useEffect(() => {
    if (canShowObjectives) {
      dispatch(ReviewsActions.getReviews({ pathParams }));
    }

    return () => {
      dispatch(ReviewsActions.clearReviewData());
    };
  }, [canShowObjectives]);

  useEffect(() => {
    dispatch(SchemaActions.getSchema({ colleagueUuid }));

    return () => {
      dispatch(SchemaActions.clearSchemaData());
    };
  }, [colleagueUuid]);

  return (
    <div data-test-id={TEST_ID}>
      <CreateButton
        withIcon
        useSingleStep={reviewModificationMode === REVIEW_MODIFICATION_MODE.SINGLE}
        buttonText='Create objective'
        isAvailable={createIsAvailable}
      />
      <div className={css(bodyBlockStyles({ mobileScreen }))}>
        <div className={css(bodyWrapperStyles)}>
          {!timelineLoaded ? (
            <Spinner id='1' />
          ) : (
            <>
              {!mobileScreen && canShowMyReview && (
                <div className={css(timelineWrapperStyles)}>
                  <StepIndicator
                    mainTitle={t('performance_timeline_title', 'Your Contribution timeline')}
                    titles={descriptions}
                    descriptions={startDates}
                    statuses={summaryStatuses}
                  />
                </div>
              )}
              <div className={css(timelineWrapperStyles)}>
                <Objectives
                  canShowObjectives={canShowObjectives}
                  objectives={objectives}
                  canEditAllObjective={canEditAllObjective}
                />
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
                  <ReviewBlock canShow={canShowMyReview} />

                  {canShowAnnualReview && (
                    <div data-test-id='feedback' className={css(basicTileStyle)}>
                      <ReviewWidget
                        reviewType={ReviewType.EYR}
                        status={endYearReview.status}
                        startTime={endYearReview?.startTime}
                        endTime={endYearReview?.endTime}
                        lastUpdatedTime={endYearReview?.lastUpdatedTime}
                        title={t('annual_performance_review', 'Annual performance review')}
                        customStyle={{ height: '100%' }}
                      />
                    </div>
                  )}
                </Section>
                <Section
                  left={{
                    content: (
                      <div className={css(title)}>
                        <Trans i18nKey='completed_reviews'>Completed Reviews</Trans>
                      </div>
                    ),
                  }}
                  right={{
                    content: (
                      <div>
                        <Button
                          mode='inverse'
                          onPress={() => setCompletedReviewsModalOpen(true)}
                          styles={[linkStyles({ theme })]}
                        >
                          <Trans className={css(title)} i18nKey='view_history'>
                            View history
                          </Trans>
                        </Button>
                      </div>
                    ),
                  }}
                >
                  <div className={css(emptyBlockStyle)}>
                    <Trans i18nKey='no_completed_reviews'>You have no completed reviews</Trans>
                  </div>
                </Section>
                <Section
                  left={{
                    content: (
                      <div className={css(title)}>
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
                          <Trans className={css(title)} i18nKey='view_files'>
                            View files
                          </Trans>
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
        <div className={css(widgetWrapper({ mobileScreen }))}>
          {!timelineLoaded && (
            <div className={css(timelineWrapperWidget)}>
              <Spinner id='2' />
            </div>
          )}
          {renderStepIndicator && (
            <div className={css(timelineWrapperWidget)}>
              <StepIndicator
                mainTitle={t('performance_timeline_title', 'Your Contribution timeline')}
                titles={descriptions}
                descriptions={startDates}
                statuses={summaryStatuses}
              />
            </div>
          )}
          <WidgetBlock />
        </div>
      </div>

      {previousReviewFilesModalShow && (
        <PreviousReviewFilesModal
          onOverlayClick={() => setPreviousReviewFilesModalShow(false)}
          colleagueUUID={colleagueUuid}
        />
      )}
      {isCompletedReviewsModalOpen && <CompletedReviewsModal onClose={() => setCompletedReviewsModalOpen(false)} />}
    </div>
  );
};

const title: Rule = ({ theme }) => {
  return {
    fontSize: theme.font.fixed.f16.fontSize,
    lineHeight: theme.font.fixed.f16.lineHeight,
    letterSpacing: '0px',
  };
};

const widgetWrapper: CreateRule<{ mobileScreen: boolean }> = ({ mobileScreen }) => ({
  flex: '1 1 30%',
  width: mobileScreen ? '100%' : '30%',
  display: 'flex',
  flexDirection: 'column',
  paddingLeft: mobileScreen ? '0px' : '20px',
});

const bodyBlockStyles: CreateRule<{ mobileScreen: boolean }> = ({ mobileScreen }) => ({
  display: 'flex',
  alignItems: 'flex-start',
  justifyContent: 'center',
  flexDirection: mobileScreen ? 'column-reverse' : 'row',
});

const widgetsBlock: Rule = () => {
  return {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    width: '100%',
    gap: '20px',
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

const organizationWidgetStyles: Rule = ({ theme }) => {
  return {
    fontSize: theme.font.fixed.f16.fontSize,
    lineHeight: theme.font.fixed.f16.lineHeight,
    letterSpacing: '0px',
    flex: '1 1 30%',
    display: 'flex',
    flexDirection: 'column',
  };
};

const shareWidgetStyles: Rule = ({ theme }) => {
  return {
    fontSize: theme.font.fixed.f16.fontSize,
    lineHeight: theme.font.fixed.f16.lineHeight,
    letterSpacing: '0px',
    display: 'flex',
    flexDirection: 'column',
    marginBottom: '20px',
    width: '100%',
  };
};

const bodyWrapperStyles: Rule = () => ({
  display: 'flex',
  flexWrap: 'nowrap',
  alignItems: 'stretch',
  flexDirection: 'column',
  width: '100%',
});

const basicTileStyle: Rule = {
  flex: '1 0 216px',
};

const tileStyles: Rule = ({ theme }) => ({
  ...theme.font.fixed.f18,
  letterSpacing: '0px',
  display: 'flex',
  alignItems: 'center',
});

const widgetWrapperStyle: Rule = {
  display: 'flex',
  flexWrap: 'wrap',
  gridGap: '8px',
  marginTop: '8px',
};

const linkStyles = ({ theme }) => ({
  fontSize: theme.font.fixed.f14.fontSize,
  lineHeight: theme.font.fixed.f14.lineHeight,
  letterSpacing: '0px',
  color: theme.colors.tescoBlue,
  background: 'transparent',
});

const emptyBlockStyle: Rule = ({ theme }) => {
  return {
    paddingBottom: '20px',
    fontSize: theme.font.fixed.f16.fontSize,
    lineHeight: theme.font.fixed.f16.lineHeight,
    letterSpacing: '0px',
  };
};

export default MyObjectives;

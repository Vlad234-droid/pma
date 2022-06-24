import React, { FC, useEffect, useMemo, useState } from 'react';

import { CreateRule, Rule, Styles, useStyle } from '@pma/dex-wrapper';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import {
  colleagueUUIDSelector,
  filterReviewsByTypeSelector,
  getReviewSchema,
  getTimelineMetaSelector,
  getTimelineSelector,
  ObjectiveSharingActions,
  ReviewsActions,
  reviewsMetaSelector,
  SchemaActions,
  schemaMetaSelector,
  TimelineActions,
  timelinesExistSelector,
  timelinesMetaSelector,
  timelineTypesAvailabilitySelector,
} from '@pma/store';

import { CreateButton, ObjectiveTypes as OT, transformReviewsToObjectives } from 'features/general/Objectives';
import useDispatch from 'hooks/useDispatch';
import { Page } from 'pages';
import Spinner from 'components/Spinner';
import { useTranslation } from 'components/Translation';
import { ObjectiveType, ReviewType } from 'config/enum';
import { StepIndicator } from 'components/StepIndicator/StepIndicator';
import { useHeaderContainer } from 'contexts/headerContext';

import { ObjectivesSection } from '../DinamicBlocks/ObjectivesSection';
import { ReviewFilesSection, CompletedReviewsSection, MyReviewsSection } from '../Sections';
import { WidgetBlock } from '../Widgets/WidgetBlock';

export const TEST_ID = 'my-objectives-page';

// TODO: move part of codebase to page
const MyObjectives: FC = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { css, matchMedia } = useStyle();
  const { setLinkTitle } = useHeaderContainer();

  const mobileScreen = matchMedia({ xSmall: true, small: true, medium: true }) || false;

  const originObjectives = useSelector(filterReviewsByTypeSelector(ReviewType.OBJECTIVE));

  const [objectives, setObjectives] = useState<OT.Objective[]>([]);

  const { loaded: schemaLoaded } = useSelector(schemaMetaSelector);
  const { loaded: reviewLoaded } = useSelector(reviewsMetaSelector);
  const { loaded: timelineLoaded } = useSelector(getTimelineMetaSelector);
  const colleagueUuid = useSelector(colleagueUUIDSelector);
  const timelinesExist = useSelector(timelinesExistSelector(colleagueUuid));
  const { loaded: timelinesLoaded } = useSelector(timelinesMetaSelector());
  const schema = useSelector(getReviewSchema(ReviewType.OBJECTIVE));
  const { components = [] } = schema;
  const { descriptions, startDates, summaryStatuses } = useSelector(getTimelineSelector(colleagueUuid)) || {};
  const timelineTypes = useSelector(timelineTypesAvailabilitySelector(colleagueUuid)) || {};

  const canShowObjectives = timelineTypes[ObjectiveType.OBJECTIVE];
  const hasYearReview = timelineTypes[ObjectiveType.MYR] && timelineTypes[ObjectiveType.EYR];
  const canShowAnnualReview = !timelineTypes[ObjectiveType.MYR] && timelineTypes[ObjectiveType.EYR];

  const formElements = components.filter((component) => component.type != 'text');

  const renderStepIndicator: Boolean = (mobileScreen && hasYearReview) || false;

  const pathParams = useMemo(() => ({ colleagueUuid, cycleUuid: 'CURRENT' }), [colleagueUuid]);
  const isValidPathParams = pathParams.colleagueUuid;

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
      <CreateButton withIcon />
      <div className={css(bodyBlockStyles({ mobileScreen }))}>
        <div className={css(bodyWrapperStyles)}>
          {!timelineLoaded ? (
            <Spinner id='1' />
          ) : (
            <>
              {!mobileScreen && hasYearReview && (
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
                {canShowObjectives && <ObjectivesSection objectives={objectives} />}
                <MyReviewsSection />
                <CompletedReviewsSection />
                <ReviewFilesSection />
              </div>
            </>
          )}
        </div>
        <div className={css(widgetWrapper({ mobileScreen }))}>
          {!timelineLoaded ? (
            <div className={css(timelineWrapperWidget)}>
              <Spinner id='2' />
            </div>
          ) : (
            <>
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
            </>
          )}
          <WidgetBlock />
        </div>
      </div>
    </div>
  );
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

const bodyWrapperStyles: Rule = () => ({
  display: 'flex',
  flexWrap: 'nowrap',
  alignItems: 'stretch',
  flexDirection: 'column',
  width: '100%',
});

export default MyObjectives;

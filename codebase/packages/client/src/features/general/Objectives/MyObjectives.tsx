import React, { FC, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
  colleagueUUIDSelector,
  filterReviewsByTypeSelector,
  getReviewSchema,
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

import { ObjectiveTypes as OT, transformReviewsToObjectives } from './';
import useDispatch from 'hooks/useDispatch';
import { Page } from 'pages';
import { useTranslation } from 'components/Translation';
import { useHeaderContainer } from 'contexts/headerContext';
import { ObjectiveType, ReviewType } from 'config/enum';

// todo think hove resolve on page level
import { ObjectivesSection } from './components/DinamicBlocks/ObjectivesSection';

export const TEST_ID = 'my-objectives-page';
const CURRENT = 'CURRENT';

// TODO: move part of codebase to page
const MyObjectives: FC = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { setLinkTitle } = useHeaderContainer();

  const originObjectives = useSelector(filterReviewsByTypeSelector(ReviewType.OBJECTIVE));

  const [objectives, setObjectives] = useState<OT.Objective[]>([]);

  const { loaded: schemaLoaded } = useSelector(schemaMetaSelector);
  const { loaded: reviewLoaded } = useSelector(reviewsMetaSelector);
  const colleagueUuid = useSelector(colleagueUUIDSelector);
  const timelinesExist = useSelector(timelinesExistSelector(colleagueUuid));
  const { loaded: timelinesLoaded } = useSelector(timelinesMetaSelector());
  const schema = useSelector(getReviewSchema(ReviewType.OBJECTIVE));
  const { components = [] } = schema;
  const timelineTypes = useSelector(timelineTypesAvailabilitySelector(colleagueUuid)) || {};

  const canShowObjectives = timelineTypes[ObjectiveType.OBJECTIVE];
  const canShowAnnualReview = !timelineTypes[ObjectiveType.MYR] && timelineTypes[ObjectiveType.EYR];

  const formElements = components.filter((component) => component.type != 'text');

  useEffect(() => {
    colleagueUuid && dispatch(ObjectiveSharingActions.checkSharing({ colleagueUuid, cycleUuid: CURRENT }));
    colleagueUuid && dispatch(ObjectiveSharingActions.getSharings({ colleagueUuid, cycleUuid: CURRENT }));
  }, [colleagueUuid]);

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
      dispatch(ReviewsActions.getReviews({ pathParams: { colleagueUuid, cycleUuid: CURRENT } }));
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

  return <div data-test-id={TEST_ID}>{canShowObjectives && <ObjectivesSection objectives={objectives} />}</div>;
};

export default MyObjectives;

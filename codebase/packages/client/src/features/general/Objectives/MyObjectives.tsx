import React, { FC, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
  colleagueUUIDSelector,
  ObjectiveSharingActions,
  SchemaActions,
  TimelineActions,
  timelinesExistSelector,
  timelinesMetaSelector,
  timelineTypesAvailabilitySelector,
  timelineStartedSelector,
  userCycleTypeSelector,
} from '@pma/store';

import useDispatch from 'hooks/useDispatch';
import { Page } from 'pages';
import { useTranslation } from 'components/Translation';
import { useHeaderContainer } from 'contexts/headerContext';
import { CycleType, ReviewType } from 'config/enum';

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

  const colleagueUuid = useSelector(colleagueUUIDSelector);
  const timelinesExist = useSelector(timelinesExistSelector(colleagueUuid));
  const { loaded: timelinesLoaded } = useSelector(timelinesMetaSelector());
  const timelineTypes = useSelector(timelineTypesAvailabilitySelector(colleagueUuid)) || {};
  const cycleType = useSelector(userCycleTypeSelector);

  const isAvailable = useSelector(timelineStartedSelector(colleagueUuid));

  const canShowAnnualReview = !timelineTypes[ReviewType.MYR] && timelineTypes[ReviewType.EYR];

  const isEYRTimeline =
    canShowAnnualReview && !timelineTypes[ReviewType.OBJECTIVE] && !timelineTypes[ReviewType.QUARTER];

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
    if (canShowAnnualReview) {
      setLinkTitle({ [Page.REVIEWS_VIEW]: t('reviews', 'Reviews') });
    }
  }, [canShowAnnualReview]);

  useEffect(() => {
    dispatch(SchemaActions.getSchema({ colleagueUuid }));

    return () => {
      dispatch(SchemaActions.clearSchemaData());
    };
  }, [colleagueUuid]);

  if (!isAvailable || isEYRTimeline || cycleType === CycleType.HIRING) return null;

  return (
    <div data-test-id={TEST_ID}>
      <ObjectivesSection />
    </div>
  );
};

export default MyObjectives;

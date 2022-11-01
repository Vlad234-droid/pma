import React, { FC, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
  colleagueUUIDSelector,
  ReviewSharingActions,
  SchemaActions,
  TimelineActions,
  timelinesExistSelector,
  timelinesMetaSelector,
  timelineTypesAvailabilitySelector,
  timelineStartedSelector,
  userCurrentCycleTypeSelector,
  colleagueCurrentCycleSelector,
  currentUserSelector,
} from '@pma/store';

import useDispatch from 'hooks/useDispatch';
import { Page } from 'pages';
import { CycleType, ReviewType } from 'config/enum';

// todo think hove resolve on page level
import ObjectiveAccordion from './components/ObjectivesSection';

export const TEST_ID = 'my-objectives-page';
const CURRENT = 'CURRENT';

// TODO: move part of codebase to page
const MyObjectives: FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const colleagueUuid = useSelector(colleagueUUIDSelector);
  const { managerUUID } = useSelector(currentUserSelector).info;
  const timelinesExist = useSelector(timelinesExistSelector(colleagueUuid));
  const { loaded: timelinesLoaded } = useSelector(timelinesMetaSelector);
  const timelineTypes = useSelector(timelineTypesAvailabilitySelector(colleagueUuid)) || {};
  const cycleType = useSelector(userCurrentCycleTypeSelector);
  const currentCycle = useSelector(colleagueCurrentCycleSelector(colleagueUuid));

  const isAvailable = useSelector(timelineStartedSelector(colleagueUuid));

  const canShowAnnualReview = !timelineTypes[ReviewType.MYR] && timelineTypes[ReviewType.EYR];

  const isEYRTimeline =
    canShowAnnualReview && !timelineTypes[ReviewType.OBJECTIVE] && !timelineTypes[ReviewType.QUARTER];

  useEffect(() => {
    colleagueUuid &&
      dispatch(ReviewSharingActions.checkSharing({ colleagueUuid, cycleUuid: CURRENT, code: 'OBJECTIVE' }));
    managerUUID && dispatch(ReviewSharingActions.getSharings({ colleagueUuid: managerUUID, code: 'OBJECTIVE' }));
  }, [colleagueUuid]);

  useEffect(() => {
    if (colleagueUuid) {
      dispatch(SchemaActions.getSchema({ colleagueUuid }));
      dispatch(TimelineActions.getTimeline({ colleagueUuid, cycleUuid: currentCycle }));
    }
  }, [colleagueUuid]);

  useEffect(() => {
    if (timelinesLoaded && !timelinesExist) {
      navigate(`/${Page.NOT_FOUND}`);
    }
  }, [timelinesLoaded, timelinesExist]);

  if (!isAvailable || isEYRTimeline || cycleType === CycleType.HIRING) return null;

  return (
    <div data-test-id={TEST_ID}>
      <ObjectiveAccordion />
    </div>
  );
};

export default MyObjectives;

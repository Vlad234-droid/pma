import React, { FC, useEffect } from 'react';
import { useSelector } from 'react-redux';
import {
  colleagueUUIDSelector,
  ReviewSharingActions,
  SchemaActions,
  TimelineActions,
  timelineTypesAvailabilitySelector,
  timelineStartedSelector,
  userCurrentCycleTypeSelector,
  colleagueCurrentCycleSelector,
} from '@pma/store';

import useDispatch from 'hooks/useDispatch';
import { CycleType, ReviewType } from 'config/enum';
import ObjectiveAccordion from './components/ObjectivesSection';

export const TEST_ID = 'my-objectives-page';

const MyObjectives: FC = () => {
  const dispatch = useDispatch();
  const colleagueUuid = useSelector(colleagueUUIDSelector);
  const currentCycle = useSelector(colleagueCurrentCycleSelector(colleagueUuid));
  const timelineTypes = useSelector(timelineTypesAvailabilitySelector(colleagueUuid, currentCycle)) || {};
  const cycleType = useSelector(userCurrentCycleTypeSelector);

  const isAvailable = useSelector(timelineStartedSelector(colleagueUuid, currentCycle));

  const canShowAnnualReview = !timelineTypes[ReviewType.MYR] && timelineTypes[ReviewType.EYR];

  const isEYRTimeline =
    canShowAnnualReview && !timelineTypes[ReviewType.OBJECTIVE] && !timelineTypes[ReviewType.QUARTER];

  useEffect(() => {
    colleagueUuid &&
      dispatch(ReviewSharingActions.checkSharing({ colleagueUuid, cycleUuid: currentCycle, code: 'OBJECTIVE' }));
    colleagueUuid && dispatch(ReviewSharingActions.getSharings({ colleagueUuid, code: 'OBJECTIVE' }));
  }, [colleagueUuid]);

  useEffect(() => {
    if (colleagueUuid && currentCycle) {
      dispatch(SchemaActions.getSchema({ colleagueUuid, cycleUuid: currentCycle }));
      dispatch(TimelineActions.getTimeline({ colleagueUuid, cycleUuid: currentCycle }));
    }
  }, [colleagueUuid, currentCycle]);

  if (!isAvailable || isEYRTimeline || cycleType === CycleType.HIRING) return null;

  return (
    <div data-test-id={TEST_ID}>
      <ObjectiveAccordion colleagueUuid={colleagueUuid} />
    </div>
  );
};

export default MyObjectives;

import { colleagueCurrentCycleSelector, colleagueUUIDSelector, PDPActions, TimelineActions } from '@pma/store';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export const useFetchCommonData = () => {
  const dispatch = useDispatch();
  const colleagueUuid = useSelector(colleagueUUIDSelector);
  const currentCycle = useSelector(colleagueCurrentCycleSelector(colleagueUuid));

  useEffect(() => {
    if (colleagueUuid) {
      dispatch(TimelineActions.getTimeline({ colleagueUuid, cycleUuid: currentCycle }));
      dispatch(PDPActions.getPDPGoal({}));
    }
  }, [colleagueUuid]);
};

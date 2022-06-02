import { colleagueUUIDSelector, PDPActions, TimelineActions } from '@pma/store';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export const useFetchCommonData = () => {
  const dispatch = useDispatch();
  const colleagueUuid = useSelector(colleagueUUIDSelector);

  useEffect(() => {
    if (colleagueUuid) {
      dispatch(TimelineActions.getTimeline({ colleagueUuid }));
      dispatch(PDPActions.getPDPGoal({}));
    }
  }, [colleagueUuid]);
};

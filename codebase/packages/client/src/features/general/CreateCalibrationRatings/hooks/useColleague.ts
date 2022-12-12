import { useEffect } from 'react';
import { ColleagueActions } from '@pma/store';
import useDispatch from 'hooks/useDispatch';

export const useColleague = (colleagueUuid, colleagueLoaded) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(ColleagueActions.getColleagueByUuid({ colleagueUuid }));
  }, [colleagueUuid, colleagueLoaded]);
};

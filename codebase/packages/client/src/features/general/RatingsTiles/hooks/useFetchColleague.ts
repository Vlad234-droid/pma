import { useEffect } from 'react';
import { ColleaguesActions } from '@pma/store';
import { useDispatch } from 'react-redux';

export const useFetchColleague = (uuid: string | undefined): void => {
  const dispatch = useDispatch();
  useEffect(() => {
    if (!uuid) return;
    dispatch(ColleaguesActions.getColleague({ colleagueUuid: uuid }));
    return () => {
      dispatch(ColleaguesActions.clearColleague());
    };
  }, [uuid]);
};

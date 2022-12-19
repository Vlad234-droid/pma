import { useEffect } from 'react';
import { ColleagueActions, getColleagueMetaSelector } from '@pma/store';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import useDispatch from 'hooks/useDispatch';

export const useColleague = () => {
  const { userUuid: colleagueUuid } = useParams<{ uuid: string; userUuid: string }>() as {
    userUuid: string;
  };
  const dispatch = useDispatch();
  const { loaded, loading } = useSelector(getColleagueMetaSelector);

  useEffect(() => {
    dispatch(ColleagueActions.getColleagueByUuid({ colleagueUuid }));
  }, [colleagueUuid, loaded]);
  return { loading };
};

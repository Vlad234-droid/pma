import { useEffect } from 'react';
import useDispatch from './useDispatch';
import { ColleagueActions, getColleagueSelector, getColleagueMetaSelector } from '@pma/store';
import { useSelector } from 'react-redux';
import { Tenant } from '../utils';

function useColleagueTenant(uuid: string): { tenant: Tenant; loading: boolean; loaded: boolean } {
  const dispatch = useDispatch();
  const { loaded, loading } = useSelector(getColleagueMetaSelector);
  const colleague = useSelector(getColleagueSelector);

  useEffect(() => {
    if (uuid && !loaded) dispatch(ColleagueActions.getColleagueByUuid({ colleagueUuid: uuid }));
  }, [uuid, loaded]);

  useEffect(() => {
    return () => {
      dispatch(ColleagueActions.clearColleagueData());
    };
  }, []);

  const tenant = (colleague?.tenant?.code as Tenant) || null;

  return { tenant, loading, loaded };
}

export default useColleagueTenant;

import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { ColleagueActions, getColleagueSelector, getColleagueMetaSelector } from '@pma/store';
import { Tenant } from 'features/general/Permission';
import useDispatch from './useDispatch';

function useColleagueTenant(uuid: string): { tenant: Tenant; loading: boolean; loaded: boolean } {
  const dispatch = useDispatch();
  const { loaded, loading } = useSelector(getColleagueMetaSelector);
  const colleague = useSelector(getColleagueSelector);

  useEffect(() => {
    dispatch(ColleagueActions.getColleagueByUuid({ colleagueUuid: uuid }));
  }, [uuid, loaded]);

  const tenant = (colleague?.tenant?.code as Tenant) || null;

  return { tenant, loading, loaded };
}

export default useColleagueTenant;

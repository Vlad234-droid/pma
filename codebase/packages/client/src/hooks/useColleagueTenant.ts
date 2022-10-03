import { useEffect } from 'react';
import useDispatch from './useDispatch';
import { ColleagueActions, getColleagueSelector, getColleagueMetaSelector } from '@pma/store';
import { useSelector } from 'react-redux';
import { Tenant } from '../utils';

function useColleagueTenant({ uuid }): { tenant: Tenant | null; loading; loaded } {
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

  const tenantCode = colleague?.tenant?.code as Tenant;

  return { tenant: tenantCode || null, loading, loaded };
}

export default useColleagueTenant;

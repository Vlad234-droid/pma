import { useContext } from 'react';
import authContext from 'contexts/authContext';
import { checkPermissions } from '../utils';

export default (tenant: Array<string>) => {
  const { tenant: userTenant } = useContext(authContext);

  return checkPermissions(tenant, [userTenant]);
};

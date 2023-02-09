import { useContext } from 'react';
import authContext from 'contexts/authContext';
import { checkPermissions } from '../utils';

export default (actions: Array<string>, notActions?: Array<string>) => {
  const { roles } = useContext(authContext);
  if (notActions) {
    return !checkPermissions(notActions, roles) && checkPermissions(actions, roles);
  }
  return checkPermissions(actions, roles);
};

import { useContext } from 'react';
import authContext from 'contexts/authContext';
import { checkPermissions } from '../utils';

export default (actions: Array<string>) => {
  const { roles } = useContext(authContext);
  return checkPermissions(actions, roles);
};

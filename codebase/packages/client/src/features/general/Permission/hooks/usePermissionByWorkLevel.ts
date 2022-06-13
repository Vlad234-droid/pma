import { useContext } from 'react';
import authContext from 'contexts/authContext';
import { checkPermissions } from '../utils';

export default (actions: Array<string>) => {
  const { userWorkLevel } = useContext(authContext);

  return checkPermissions(actions, userWorkLevel);
};

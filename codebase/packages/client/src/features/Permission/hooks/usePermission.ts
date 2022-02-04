import { useSelector } from 'react-redux';
import { checkPermissions } from '@pma/store';
import { PermissionProps } from '../components/PermissionProvider';

export const usePermission = (props: PermissionProps) => {
  return useSelector(checkPermissions(props));
};

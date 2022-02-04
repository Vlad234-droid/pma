import React, { FC } from 'react';
import { usePermission } from '../hooks';
import { role } from '../constants';

export type PermissionProps = {
  roles?: Array<role>;
  workLevels?: Array<string>;
  reviewTypes?: Array<string>;
};

type Props = {
  children: React.ReactElement<any, string> | null;
};

export const PermissionProvider: FC<Props & PermissionProps> = ({ roles, workLevels, reviewTypes, children }) => {
  const hasPermission = usePermission({ roles, workLevels, reviewTypes });
  return hasPermission ? children : null;
};

import React, { FC, useMemo } from 'react';
import { useTenant } from 'features/general/Permission';

export const InnerList: FC<{ name: string }> = ({ name }) => {
  const tenant = useTenant();
  const List = useMemo(
    () =>
      React.lazy(() =>
        import(`burger-menu/${tenant}/admin/components/${name}`).then((module) => ({ default: module.default })),
      ),
    [],
  );
  return <List />;
};

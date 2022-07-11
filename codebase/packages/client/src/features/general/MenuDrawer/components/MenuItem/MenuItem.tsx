import React, { FC, useMemo } from 'react';
import { useTenant } from 'features/general/Permission';

const MenuItem: FC<{ name: string }> = ({ name }) => {
  const tenant = useTenant();
  const Menu = useMemo(
    () => React.lazy(() => import(`burger-menu/${tenant}/${name}`).then((module) => ({ default: module.default }))),
    [],
  );
  return <Menu />;
};

export default MenuItem;

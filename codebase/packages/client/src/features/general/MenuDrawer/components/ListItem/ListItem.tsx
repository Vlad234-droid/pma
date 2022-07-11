import React, { FC, useMemo } from 'react';

import { useTenant } from 'features/general/Permission';

const ListItem: FC<{ name: string }> = ({ name }) => {
  const tenant = useTenant();

  const List = useMemo(
    () => React.lazy(() => import(`burger-menu/${tenant}/${name}`).then((module) => ({ default: module.default }))),
    [],
  );
  return <List />;
};

export default ListItem;

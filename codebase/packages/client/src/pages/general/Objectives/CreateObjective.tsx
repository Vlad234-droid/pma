import React, { useMemo, FC } from 'react';
import { useTenant } from 'features/general/Permission';

const CreateObjective: FC = React.memo(() => {
  const tenant = useTenant();
  const Block = useMemo(
    () => React.lazy(() => import(`features/${tenant}/ObjectivesForm`).then((module) => ({ default: module.default }))),
    [],
  );

  return <Block />;
});

export default CreateObjective;

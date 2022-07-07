import React, { useMemo } from 'react';
import { useTenant } from 'features/general/Permission';

export const ObjectivesSection = React.memo(() => {
  const tenant = useTenant();
  const Block = useMemo(
    () =>
      React.lazy(() =>
        import(`features/${tenant}/ObjectiveAccordion`).then((module) => ({ default: module.ObjectivesSection })),
      ),
    [],
  );

  return <Block />;
});

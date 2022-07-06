import React, { useMemo } from 'react';
import { getTenant, Tenant } from 'utils';

export const ObjectivesSection = React.memo(() => {
  const tenant: Tenant = getTenant();
  const Block = useMemo(
    () =>
      React.lazy(() =>
        import(`features/${tenant}/ObjectiveAccordion`).then((module) => ({ default: module.ObjectivesSection })),
      ),
    [],
  );

  return <Block />;
});

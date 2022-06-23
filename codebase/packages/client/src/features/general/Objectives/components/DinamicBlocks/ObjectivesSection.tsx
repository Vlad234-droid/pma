import React, { useMemo, FC } from 'react';
import { getTenant, Tenant } from 'utils';
import { ObjectiveTypes } from 'features/general/Objectives';

// todo think on same type between tenant
type Props = {
  objectives: ObjectiveTypes.Objective[];
};

export const ObjectivesSection: FC<Props> = React.memo((props) => {
  const tenant: Tenant = getTenant();
  const Block = useMemo(
    () =>
      React.lazy(() =>
        import(`features/${tenant}/ObjectiveAccordion`).then((module) => ({ default: module.ObjectivesSection })),
      ),
    [],
  );

  return <Block {...props} />;
});

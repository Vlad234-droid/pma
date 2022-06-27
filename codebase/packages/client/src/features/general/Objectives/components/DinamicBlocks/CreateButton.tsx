import React, { useMemo, FC } from 'react';
import { getTenant, Tenant } from 'utils';

// todo think on same type between tenant
type Props = {
  withIcon?: boolean;
};

export const CreateButton: FC<Props> = React.memo((props) => {
  const tenant: Tenant = getTenant();
  const Block = useMemo(
    () =>
      React.lazy(() =>
        import(`features/${tenant}/ObjectivesForm`).then((module) => ({ default: module.CreateButton })),
      ),
    [],
  );

  return <Block {...props} />;
});

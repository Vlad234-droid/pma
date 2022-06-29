import React, { useMemo, FC } from 'react';
import { useTenant } from 'features/general/Permission';

// todo think on same type between tenant
type Props = {
  withIcon?: boolean;
};

export const CreateObjective: FC<Props> = React.memo((props) => {
  const tenant = useTenant();
  const Block = useMemo(
    () =>
      React.lazy(() =>
        import(`features/${tenant}/ObjectivesForm`).then((module) => ({ default: module.CreateButton })),
      ),
    [],
  );

  return <Block {...props} />;
});

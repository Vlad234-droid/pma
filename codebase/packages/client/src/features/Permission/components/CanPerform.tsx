import { FC, ReactElement } from 'react';

import { usePermission } from '../hooks';

type Props = {
  perform: Array<string>;
  yes: () => ReactElement;
  no?: () => ReactElement | null;
};

const CanPerform: FC<Props> = ({ perform, yes, no = () => null }) => {
  const hasPermission = usePermission(perform);

  return hasPermission ? yes() : no();
};

export default CanPerform;

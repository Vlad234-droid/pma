import React, { FC } from 'react';

import { default as useLayoutEffect } from 'hooks/useLayoutEffect';
import { default as useMobileDetect } from 'hooks/useMobileDetect';

type Props = {
  isOpen: boolean;
  children: JSX.Element;
};

const ModalWrapper: FC<Props> = ({ isOpen, children }) => {
  const detectMobile = useMobileDetect();
  useLayoutEffect(isOpen, detectMobile.isMobile());
  return <>{children}</>;
};

export default ModalWrapper;

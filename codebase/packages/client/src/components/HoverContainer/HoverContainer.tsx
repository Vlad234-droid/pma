import React, { FC, useState } from 'react';
import { useStyle } from '@pma/dex-wrapper';
import { HoverContainerProps as Props } from './types';

export const TEST_ID = 'test-hover-container-id';

const HoverContainer: FC<Props> = ({ children, message, isActive }) => {
  const [hover, setHover] = useState<boolean>(false);
  const { css } = useStyle();
  return (
    <div
      data-test-id={TEST_ID}
      className={css({ position: 'relative' })}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      {children}
      {isActive && hover && message}
    </div>
  );
};

export default HoverContainer;

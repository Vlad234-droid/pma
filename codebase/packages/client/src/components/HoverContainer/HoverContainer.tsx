import React, { FC, useState } from 'react';
import { useStyle } from '@pma/dex-wrapper';
import { HoverContainerProps as Props } from './types';

const HoverContainer: FC<Props> = ({ children, message, isActive }) => {
  const [hover, setHover] = useState<boolean>(false);
  const { css } = useStyle();
  return (
    <div className={css({ position: 'relative' })}>
      <span onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
        {children}
      </span>
      {isActive && hover && message}
    </div>
  );
};

export default HoverContainer;

import React, { FC } from 'react';
import { useStyle } from '@dex-ddl/core';
import { Graphics, Icon } from '../Icon';

export const StatusIcon: FC<{
  first?: boolean;
  last?: boolean;
  color: string;
  graphics: Graphics;
}> = ({ first, last, color, graphics }) => {
  const { css } = useStyle();
  const translateFirst = first ? 'translateX(25%)' : '';
  const translateLast = last ? 'translateX(-25%)' : '';
  const transform = `translateY(-50%) ${translateFirst} ${translateLast}`;
  return (
    <div
      className={css({
        display: 'flex',
        transform: transform,
        position: 'absolute',
        zIndex: 1,
      })}
    >
      <Icon graphic={graphics} fill={color} />
    </div>
  );
};

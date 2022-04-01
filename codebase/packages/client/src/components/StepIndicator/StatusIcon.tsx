import React, { FC } from 'react';
import { useStyle } from '@pma/dex-wrapper';
import { Graphics, Icon } from '../Icon';

export const StatusIcon: FC<{
  color: string;
  graphics: Graphics;
}> = ({ color, graphics }) => {
  const { css } = useStyle();
  const transform = `translateY(-50%)`;
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

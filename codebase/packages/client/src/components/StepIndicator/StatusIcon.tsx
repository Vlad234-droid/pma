import React, { FC } from 'react';
import { useStyle } from '../../styles';

export const StatusIcon: FC<{ icon: string; first?: boolean; last?: boolean }> = ({ icon, first, last }) => {
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
      <img className={css({ maxWidth: 'inherit' })} src={icon} alt='StatusIcon' />
    </div>
  );
};

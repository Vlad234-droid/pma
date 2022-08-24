import React, { FC } from 'react';
import { Graphics, Icon } from 'components/Icon';
import { Rule, useStyle, Colors } from '@pma/dex-wrapper';

type Props = {
  graphic: Graphics;
  title: string;
  count: string;
  color?: Colors;
};

export const PriorityElement: FC<Props> = ({ graphic, count, title, color }) => {
  const { css } = useStyle();

  return (
    <div className={css(containerStyles)}>
      <Icon graphic={graphic} iconStyles={{ marginRight: '6px', width: '20px', height: '20px' }} color={color} />
      <span>
        {title}: <span className={css({ fontWeight: 'bold' })}>{count}</span>
      </span>
    </div>
  );
};

const containerStyles: Rule = {
  display: 'flex',
  flexDirection: 'row',
  marginBottom: '8px',
  alignItems: 'center',
};

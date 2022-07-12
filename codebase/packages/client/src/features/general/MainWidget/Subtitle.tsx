import React, { FC } from 'react';
import { Rule, useStyle } from '@pma/dex-wrapper';
import { Graphics, Icon } from 'components/Icon';

type Props = {
  invertColors?: boolean;
  graphic: Graphics;
};

export const Subtitle: FC<Props> = ({ invertColors, graphic, children }) => {
  const { css } = useStyle();

  return (
    <div className={css(descriptionStyle)}>
      <span className={css(iconStyle)}>
        {invertColors ? <Icon graphic={graphic} invertColors /> : <Icon graphic={graphic} backgroundRadius={12} />}
      </span>
      {children}
    </div>
  );
};

const descriptionStyle: Rule = () => ({
  paddingLeft: '33px',
});

const iconStyle: Rule = () => ({
  display: 'flex',
  position: 'absolute',
  left: 0,
  '& > span': { display: 'flex' },
});

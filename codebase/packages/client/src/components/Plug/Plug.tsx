import React, { FC, CSSProperties } from 'react';
import { Rule, Styles, theme } from '@pma/dex-wrapper';

import { TileWrapper } from 'components/Tile';
import { Notification } from 'components/Notification';
import { Graphics } from '../Icon';

type PlugProps = {
  text: string;
  closable?: boolean;
  graphic?: Graphics;
  customStyle?: Styles | CSSProperties | Rule | {};
};

export const Plug: FC<PlugProps> = ({ text, customStyle = {}, closable = false, graphic = 'information' }) => {
  return (
    <TileWrapper
      customStyle={{
        padding: '24px 24px 24px 24px',
        maxWidth: '100%',
        ...customStyle,
      }}
    >
      <Notification
        closable={closable}
        graphic={graphic}
        iconColor='link'
        text={text}
        customStyle={{
          background: theme.colors.tescoLightGray,
        }}
      />
    </TileWrapper>
  );
};

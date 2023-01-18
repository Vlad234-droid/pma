import React, { FC } from 'react';
import { Rule, theme, Colors, colors } from '@pma/dex-wrapper';

import { Graphics } from 'components/Icon';

import BaseWidget from 'components/BaseWidget';

type Props = {
  graphics: Graphics;
  title: string;
  onClick: () => void;
  background?: Colors;
  isDisabled?: boolean;
};

const Widget: FC<Props> = ({ graphics, title, onClick, background, isDisabled = false }) => {
  return (
    <BaseWidget
      iconGraphic={graphics}
      title={title}
      onClick={onClick}
      hover={false}
      withButton={false}
      size={'32px'}
      customStyle={{
        fontSize: theme.font.fixed.f16.fontSize,
        lineHeight: theme.font.fixed.f16.lineHeight,
        letterSpacing: '0px',
        ...tileWrapperStyles,
        ...(background ? { background: colors[background] } : {}),
        ...(!isDisabled ? { cursor: 'pointer' } : { opacity: 0.6, pointerEvents: 'none' }),
        '& span': {
          '&:last-child': {
            fontSize: theme.font.fixed.f16.fontSize,
            marginBottom: '8px',
          },
        },
      }}
    />
  );
};

export default Widget;

const tileWrapperStyles: Rule = { minWidth: '350px' };

import React, { FC } from 'react';
import { useStyle, Styles, CreateRule } from '@pma/dex-wrapper';

import { Graphics, Icon } from 'components/Icon';

export const IconWithText: FC<{ text: string; graphic: Graphics; onClick?: () => void | undefined }> = ({
  text,
  graphic,
  onClick,
}) => {
  const { css } = useStyle();
  return (
    //@ts-ignore
    <div className={css(wrapper({ active: !!onClick }))} onClick={onClick}>
      <Icon graphic={graphic} iconStyles={{ width: '18px', height: '18px' }} />
      <p>{text}</p>
    </div>
  );
};

const wrapper: CreateRule<{ active: boolean }> =
  ({ active }) =>
  ({ theme }) => {
    return {
      ...(active && { cursor: 'pointer' }),
      display: 'inline-flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      gap: '8px',
      '& > p': {
        fontSize: theme.font.fixed.f14.fontSize,
        lineHeight: theme.font.fixed.f14.lineHeight,
        color: theme.colors.tescoBlue,
        margin: 0,
      },
    } as Styles;
  };

import React, { FC } from 'react';
import { colors, Rule, useStyle } from '@pma/dex-wrapper';

export type LinkButtonProps = {
  onClick: () => void;
  children: string;
};

const LinkButton: FC<LinkButtonProps> = ({ onClick, children }) => {
  const { css } = useStyle();

  return (
    <button onClick={onClick} className={css(btnStyle)}>
      {children}
    </button>
  );
};

const btnStyle: Rule = ({ theme }) => {
  return {
    fontSize: theme.font.fixed.f16.fontSize,
    lineHeight: theme.font.fixed.f16.lineHeight,
    letterSpacing: '0px',
    color: colors.tescoBlue,
    cursor: 'pointer',
    border: 'none',
    backgroundColor: 'transparent',
  };
};

export default LinkButton;

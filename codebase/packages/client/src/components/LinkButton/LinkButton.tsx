import React, { FC } from 'react';
import { colors, useStyle } from '@pma/dex-wrapper';

export type LinkButtonProps = {
  onClick: () => void;
  children: string;
};

const LinkButton: FC<LinkButtonProps> = ({ onClick, children }) => {
  const { css } = useStyle();

  return (
    <button
      onClick={onClick}
      className={css({
        fontSize: '16px',
        lineHeight: '20px',
        color: colors.tescoBlue,
        cursor: 'pointer',
        border: 'none',
        backgroundColor: 'transparent',
      })}
    >
      {children}
    </button>
  );
};

export default LinkButton;

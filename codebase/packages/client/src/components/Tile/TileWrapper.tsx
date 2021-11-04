import React, { FC, HTMLProps } from 'react';
import { CreateRule, Theme, useStyle, Colors, colors } from '@dex-ddl/core';

export type TileWrapperProps = {
  boarder?: boolean;
  hover?: boolean;
  background?: Colors;
  children: any;
  customStyle?: React.CSSProperties | {};
};

type Props = HTMLProps<HTMLInputElement> & TileWrapperProps;

export const TileWrapper: FC<Props> = ({
  boarder = true,
  hover = false,
  customStyle = {},
  background = 'white',
  children,
}) => {
  const { css, theme } = useStyle();

  return (
    <div className={css(containerStyle({ hover, background, theme }), borderStyle({ boarder, theme }), customStyle)}>
      {children}
    </div>
  );
};

const containerStyle: CreateRule<{ hover: boolean; background: Colors; theme: Theme }> = (props) => {
  if (props == null) return {};
  const { hover, background, theme } = props;
  const style = {
    margin: 0,
    padding: 0,
    background: colors[background],
    color: background === 'tescoBlue' ? colors.white : colors.base,
    borderRadius: theme.border.radius.md,
    overflow: 'hidden',
  };
  if (hover) {
    return {
      ...style,
      '&:hover': {
        ...(background === 'white' ? { background: '#F3F9FC', opacity: 0.9 } : { opacity: 0.8 }),
        cursor: 'pointer',
      },
    };
  }
  return style;
};
const borderStyle: CreateRule<{ boarder: boolean; theme: Theme }> = (props) => {
  if (props == null) return {};
  const { boarder } = props;
  if (boarder) {
    return {
      border: 0,
      boxShadow: '3px 3px 1px 1px rgba(0, 0, 0, 0.05)',
    };
  }
  return {};
};

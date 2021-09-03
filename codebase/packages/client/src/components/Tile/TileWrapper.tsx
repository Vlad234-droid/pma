import React, { FC, HTMLProps } from 'react';

import { useStyle, CreateRule, Theme } from 'styles';

export type TileWrapperProps = {
  boarder?: boolean;
  hover?: boolean;
  children: JSX.Element | JSX.Element[] | string;
  customStyle?: React.CSSProperties | {};
};

type Props = HTMLProps<HTMLInputElement> & TileWrapperProps;

export const TileWrapper: FC<Props> = ({ boarder = true, hover = false, customStyle = {}, children }) => {
  const { css, theme } = useStyle(boarder);

  return (
    <div className={css(containerStyle({ hover, theme }), borderStyle({ boarder, theme }), customStyle)}>
      {children}
    </div>
  );
};

const containerStyle: CreateRule<{ hover: boolean; theme: Theme }> = (props) => {
  if (props == null) return {};
  const { hover, theme } = props;
  const style = {
    margin: 0,
    padding: 0,
    background: theme.colors.white,
    borderRadius: theme.borderRadius.md,
    overflow: 'hidden',
    flex: '1 0 0%',
  };
  if (hover) {
    return {
      ...style,
      '&:hover': {
        opacity: 0.9,
        backgroundColor: theme.colors.whiteHover,
        cursor: 'pointer',
      },
    };
  }
  return style;
};
const borderStyle: CreateRule<{ boarder: boolean; theme: Theme }> = (props) => {
  if (props == null) return {};
  const { boarder, theme } = props;
  if (boarder) {
    return {
      border: `1px solid ${theme.colors.boarder}`,
      boxShadow: '3px 3px 1px 1px rgba(0, 0, 0, 0.05)',
    };
  }
  return {};
};

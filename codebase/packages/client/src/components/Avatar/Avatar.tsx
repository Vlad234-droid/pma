import React, { FC, HTMLProps } from 'react';
import { useStyle, CreateRule, Icon } from '@pma/dex-wrapper';

export type AvatarProps = {
  img?: string;
  size?: number;
};

type Props = HTMLProps<HTMLInputElement> & AvatarProps;

const contentStyle: CreateRule<{ size?: number }> =
  ({ size = 56 }) =>
  ({ theme }) => ({
    display: 'inline-block',
    minWidth: `${size}px`,
    width: `${size}px`,
    height: `${size}px`,
    lineHeight: `${size}px`,
    fontSize: `${size / 2}px`,
    background: '#ccc',
    borderRadius: '50%',
    whiteSpace: 'nowrap',
    textAlign: 'center',
    verticalAlign: 'middle',
    overflow: 'hidden',
    '& svg': {
      width: `${size / 2}px`,
      height: `${size / 2}px`,
      color: 'inherit',
      fontStyle: 'normal',
      lineHeight: 0,
      textAlign: 'center',
      textTransform: 'none',
      '& path': {
        stroke: theme.colors.white,
      },
    },
  });

const imageStyle = {
  display: 'block',
  width: '100%',
  height: '100%',
};

export const Avatar: FC<Props> = ({ img, size = 56 }) => {
  const { css } = useStyle();
  return (
    <span data-test-id='avatar' className={css(contentStyle({ size }))}>
      {img ? <img style={imageStyle} src={img} /> : <Icon graphic='account' testId={'test-id-account-icon'} />}
    </span>
  );
};

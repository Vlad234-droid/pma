import React, { FC, HTMLProps } from 'react';

import { Rule, useStyle, useBreakpoints } from 'styles';
import { TileWrapper } from './TileWrapper';
import { Icon } from '../Icon';

export type TileProps = {
  title: string;
  description: string;
  event?: string;
  boarder?: boolean;
  hover?: boolean;
  link?: string;
  img?: string;
  customStyle?: React.CSSProperties | {};
};

type Props = HTMLProps<HTMLInputElement> & TileProps;

export const BasicTile: FC<Props> = ({
  boarder = true,
  hover = false,
  title,
  description,
  event,
  link,
  img,
  customStyle = {},
}) => {
  const { css } = useStyle(boarder);

  return (
    <TileWrapper
      boarder={boarder}
      hover={hover}
      customStyle={{
        ...customStyle,
      }}
    >
      <a className={css(wrapperStyle)} href={link}>
        {img && (
          <div>
            <img className={css(imageStyle)} src={img} />
          </div>
        )}
        <div className={css(bodyStyle)}>
          <div className={css(titleStyle)}>{title}</div>
          <div className={css(descriptionStyle)}>{description}</div>
          {event && (
            <div className={css(descriptionStyle)}>
              <Icon graphic='calender' />
              {event}
            </div>
          )}
        </div>
      </a>
    </TileWrapper>
  );
};

const bodyStyle = {
  padding: '24px',
  color: '#333333',
};

const wrapperStyle: Rule = () => {
  const [, isBreakpoint] = useBreakpoints();
  const mobileScreen = isBreakpoint.small || isBreakpoint.xSmall;
  if (mobileScreen) {
    return {
      display: 'flex',
      textDecoration: 'none',
      minWidth: '300px',
    };
  }
  return {
    textDecoration: 'none',
  };
};

const imageStyle: Rule = () => {
  const [, isBreakpoint] = useBreakpoints();
  const mobileScreen = isBreakpoint.small || isBreakpoint.xSmall;
  if (mobileScreen) {
    return {
      width: '100px',
      minWidth: '100px',
      objectFit: 'cover',
      height: '100%',
    };
  }
  return {
    textDecoration: '100%',
  };
};

const titleStyle: Rule = ({ theme }) => {
  const [, isBreakpoint] = useBreakpoints();
  const mobileScreen = isBreakpoint.small || isBreakpoint.xSmall;
  return {
    color: theme.colors.link,
    fontSize: mobileScreen ? '16px' : '18px',
    lineHeight: mobileScreen ? '20px' : '22px',
    fontWeight: theme.font.bold,
    paddingBottom: '10px',
  };
};

const descriptionStyle = {
  fontSize: '14px',
  lineHeight: '18px',
  ':not(:last-child)': {
    paddingBottom: '20px',
  },
};

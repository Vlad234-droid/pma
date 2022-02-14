import React, { FC, HTMLProps, ReactElement } from 'react';

import { CreateRule, Rule, useBreakpoints, useStyle } from '@dex-ddl/core';
import { TileWrapper } from './TileWrapper';
import { Icon } from '../Icon';

export type TileProps = {
  title: string;
  description?: string;
  event?: string;
  boarder?: boolean;
  hover?: boolean;
  link?: string;
  img?: string | ReactElement;
  icon?: boolean;
  customStyle?: React.CSSProperties | {};
  imgCustomStyle?: React.CSSProperties | {};
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
  imgCustomStyle = {},
  icon = false,
  children,
}) => {
  const { css } = useStyle();

  const handleLinkClick = () => {
    if (!link) {
      return;
    }
    const aEl = window.document.createElement('a');
    aEl.href = link;
    aEl.dispatchEvent(new MouseEvent('click'));
  };

  return (
    <TileWrapper
      boarder={boarder}
      hover={hover}
      customStyle={{
        ...customStyle,
      }}
    >
      <div className={css(wrapperStyle({ icon }))} onClick={handleLinkClick}>
        {img && (
          <div className={css(imgCustomStyle)}>
            {typeof img === 'string' && <img className={css(imageStyle({ icon }))} src={img} />}
            {typeof img === 'object' && img}
          </div>
        )}
        <div className={css(bodyStyle)}>
          <div className={css(titleStyle)}>{title}</div>
          {description && <div className={css(descriptionStyle)}>{description}</div>}
          {children}
          {event && (
            <div className={css(descriptionStyle)}>
              <Icon graphic='calender' iconStyles={{ verticalAlign: 'middle' }} />
              {event}
            </div>
          )}
        </div>
      </div>
    </TileWrapper>
  );
};

const bodyStyle = {
  padding: '10px 14px 14px 14px',
  color: '#333333',
};

const wrapperStyle: CreateRule<{ icon: boolean }> = ({ icon }) => {
  const [, isBreakpoint] = useBreakpoints();
  const mobileScreen = isBreakpoint.small || isBreakpoint.xSmall;
  if (mobileScreen) {
    return {
      display: 'flex',
      textDecoration: 'none',
      minWidth: '300px',
      ...(icon && { flexDirection: 'column' }),
    };
  }
  return {
    textDecoration: 'none',
  };
};

const imageStyle: CreateRule<{ icon: boolean }> = ({ icon }) => {
  const [, isBreakpoint] = useBreakpoints();
  const mobileScreen = isBreakpoint.small || isBreakpoint.xSmall;
  if (icon) {
    return {
      width: '100%',
    };
  }
  if (mobileScreen) {
    return {
      width: '100px',
      minWidth: '100px',
      objectFit: 'cover',
      height: '100%',
    };
  }
  return {
    width: '100%',
  };
};

const titleStyle: Rule = ({ theme }) => {
  const [, isBreakpoint] = useBreakpoints();
  const mobileScreen = isBreakpoint.small || isBreakpoint.xSmall;
  return {
    color: theme.colors.link,
    fontSize: mobileScreen ? '16px' : '18px',
    lineHeight: mobileScreen ? '20px' : '22px',
    fontWeight: theme.font.weight.bold,
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

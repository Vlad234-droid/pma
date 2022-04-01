import React, { FC, HTMLProps, ReactElement } from 'react';

import { CreateRule, Rule, useBreakpoints, useStyle } from '@pma/dex-wrapper';
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
  tearget?: HTMLAnchorElement['target'];
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
  target = '_self',
}) => {
  const { css } = useStyle();

  const handleLinkClick = () => {
    if (!link) {
      return;
    }
    const aEl = window.document.createElement('a');
    aEl.href = link;
    aEl.target = target;
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
      <div className={css(wrapperStyle({ icon, isLink: !!link }))} onClick={handleLinkClick}>
        {img && (
          <div className={css(imgCustomStyle)}>
            {typeof img === 'string' && (
              <div className={css(imageWrapperRule, loadingRule)}>
                <img className={css(imageStyle)} src={img} />
              </div>
            )}
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

const wrapperStyle: CreateRule<{ icon: boolean; isLink: boolean }> = ({ icon, isLink }) => {
  const [, isBreakpoint] = useBreakpoints();
  const mobileScreen = isBreakpoint.small || isBreakpoint.xSmall;
  return {
    ...(mobileScreen
      ? {
          display: 'flex',
          minWidth: '300px',
          ...(icon && { flexDirection: 'column' }),
        }
      : {}),
    textDecoration: 'none',
    cursor: isLink ? 'pointer' : 'inheritance',
  };
};

const imageWrapperRule: Rule = () => {
  const [, isBreakpoint] = useBreakpoints();
  const mobileScreen = isBreakpoint.small || isBreakpoint.xSmall;

  return {
    height: '100%',
    position: 'relative',
    minWidth: mobileScreen ? '100px' : 'auto',
    paddingTop: mobileScreen ? 'auto' : '66%', // 6:4
  };
};

const loadingRule: Rule = {
  animation: 'skeleton-loading 1s linear infinite alternate',
};

const imageStyle: Rule = () => {
  const [, isBreakpoint] = useBreakpoints();
  const mobileScreen = isBreakpoint.small || isBreakpoint.xSmall;
  return {
    objectFit: 'cover',
    width: '100%',
    minWidth: mobileScreen ? '100px' : 'auto',
    height: mobileScreen ? '100%' : 'auto',
    position: 'absolute',
    top: 0,
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

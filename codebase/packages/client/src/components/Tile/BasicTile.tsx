import React, { FC, HTMLProps, ReactElement } from 'react';
import { CreateRule, Rule, useMedia, useStyle } from '@pma/dex-wrapper';
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
  target = '_self',
}) => {
  const { css } = useStyle();
  const { matchMedia } = useMedia();
  const mobileScreen = matchMedia({ xSmall: true, small: true }) || false;

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
              <div className={css(imageWrapperRule({ mobileScreen }), loadingRule)}>
                <img className={css(imageStyle({ mobileScreen }))} src={img} />
              </div>
            )}
            {typeof img === 'object' && img}
          </div>
        )}
        <div className={css(bodyStyle)}>
          <div className={css(titleStyle({ mobileScreen }))}>{title}</div>
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

const bodyStyle: Rule = ({ theme }) => ({
  padding: '10px 14px 14px 14px',
  color: theme.colors.base,
});

const wrapperStyle: CreateRule<{ icon: boolean; isLink: boolean }> = ({ icon, isLink }) => {
  const { matchMedia } = useMedia();
  const mobileScreen = matchMedia({ xSmall: true, small: true }) || false;

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

const imageWrapperRule: CreateRule<{ mobileScreen: boolean }> = ({ mobileScreen }) => ({
  height: '100%',
  position: 'relative',
  minWidth: mobileScreen ? '100px' : 'auto',
  paddingTop: mobileScreen ? 'auto' : '66%', // 6:4
});

const loadingRule: Rule = {
  animation: 'skeleton-loading 1s linear infinite alternate',
};

const imageStyle: CreateRule<{ mobileScreen: boolean }> = ({ mobileScreen }) => ({
  objectFit: 'cover',
  width: '100%',
  minWidth: mobileScreen ? '100px' : 'auto',
  height: mobileScreen ? '100%' : 'auto',
  position: 'absolute',
  top: 0,
});

const titleStyle: CreateRule<{ mobileScreen: boolean }> =
  ({ mobileScreen }) =>
  ({ theme }) => ({
    color: theme.colors.link,
    fontSize: mobileScreen ? theme.font.fixed.f16.fontSize : theme.font.fixed.f18.fontSize,
    lineHeight: mobileScreen ? theme.font.fixed.f16.lineHeight : theme.font.fixed.f18.lineHeight,
    letterSpacing: '0px',
    fontWeight: theme.font.weight.bold,
    paddingBottom: '10px',
  });

const descriptionStyle = ({ theme }) => ({
  fontSize: theme.font.fixed.f14.fontSize,
  lineHeight: theme.font.fixed.f14.lineHeight,
  letterSpacing: '0px',
  ':not(:last-child)': {
    paddingBottom: '20px',
  },
});

import React, { FC, HTMLProps, ReactElement } from 'react';
import { colors, CreateRule, Rule, useMedia, useStyle } from '@pma/dex-wrapper';
import { TileWrapper } from './TileWrapper';
import { Icon } from '../Icon';

export const TEST_ID = 'TEST_ID';
export const TEST_ICON = 'TEST_ICON';

export type TileProps = {
  title: string;
  description?: string;
  event?: string;
  boarder?: boolean;
  hover?: boolean;
  link?: string;
  img?: string | ReactElement;
  imgDescription?: string;
  icon?: boolean;
  customStyle?: React.CSSProperties | {};
  imgCustomStyle?: React.CSSProperties | {};
  disabled?: boolean;
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
  imgDescription,
  customStyle = {},
  imgCustomStyle = {},
  icon = false,
  children,
  target = '_self',
  disabled,
}) => {
  const { css } = useStyle();
  const { matchMedia } = useMedia();
  const mobileScreen = matchMedia({ xSmall: true, small: true }) || false;

  const handleLinkClick = () => {
    if (disabled || !link) {
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
      hover={!disabled && hover}
      customStyle={{
        ...customStyle,
      }}
    >
      <div
        data-test-id={TEST_ID}
        className={css(wrapperStyle({ icon, isLink: !disabled && !!link }))}
        onClick={handleLinkClick}
      >
        {img && (
          <div className={css(imgCustomStyle)}>
            {typeof img === 'string' && (
              <div className={css(imageWrapperRule({ mobileScreen }), !disabled ? loadingRule : {})}>
                <img className={css(imageStyle({ mobileScreen, disabled }))} src={img} alt={imgDescription} />
              </div>
            )}
            {typeof img === 'object' && Object.keys(img).length > 0 && img}
          </div>
        )}
        <div className={css(bodyStyle({ disabled }))}>
          <div className={css(titleStyle({ mobileScreen, disabled }))}>{title}</div>
          {description && <div className={css(descriptionStyle)}>{description}</div>}
          {children}
          {event && (
            <div className={css(descriptionStyle)}>
              <Icon testId={TEST_ICON} graphic='calender' iconStyles={{ verticalAlign: 'middle' }} />
              {event}
            </div>
          )}
        </div>
      </div>
    </TileWrapper>
  );
};

const bodyStyle: CreateRule<{ disabled?: boolean }> =
  ({ disabled }) =>
  ({ theme }) => ({
    padding: '10px 14px 14px 14px',
    color: disabled ? colors.darkBlue : theme.colors.base,
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

const imageStyle: CreateRule<{ mobileScreen: boolean; disabled?: boolean }> = ({ mobileScreen, disabled }) => ({
  objectFit: 'cover',
  width: '100%',
  minWidth: mobileScreen ? '100px' : 'auto',
  height: mobileScreen ? '100%' : 'auto',
  position: 'absolute',
  top: 0,
  filter: disabled ? 'grayscale(100%)' : undefined,
  opacity: disabled ? '0.7' : undefined,
});

const titleStyle: CreateRule<{ mobileScreen: boolean; disabled?: boolean }> =
  ({ mobileScreen, disabled }) =>
  ({ theme }) => ({
    color: disabled ? colors.darkBlue : theme.colors.link,
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

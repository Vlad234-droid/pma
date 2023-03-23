import React, { FC, useState } from 'react';
import { useStyle, colors, Colors, Rule, CreateRule } from '@pma/dex-wrapper';
import { IconButton } from '../IconButton';
import { Graphics, Icon } from '../Icon';

export type NotificationProps = {
  graphic: Graphics;
  iconColor: Colors;
  text: string;
  customStyle?: React.CSSProperties | {};
  onClick?: () => void;
  closable?: boolean;
  testId?: string;
  title?: string;
};

const Notification: FC<NotificationProps> = ({
  graphic,
  iconColor,
  text,
  customStyle = {},
  onClick,
  closable = true,
  testId = '',
  title,
}) => {
  const { css } = useStyle();
  const [show, setStatus] = useState(true);
  const handleOnClick = () => {
    setStatus(false);
    if (onClick) {
      onClick();
    }
  };

  if (!show) {
    return null;
  }

  return (
    <div data-test-id={testId} className={css(wrapperStyle({ title: !!title }), customStyle)}>
      <div className={css({ paddingLeft: '5px', paddingTop: '1px', alignItems: 'center', display: 'flex' })}>
        <Icon graphic={graphic} fill={colors[iconColor]} />
      </div>
      <div className={css(textWrapperStyle)}>
        {title && <div className={css(titleStyle)}>{title} </div>}
        <div className={css(textStyle)}>{text}</div>
      </div>
      {closable && (
        <IconButton
          graphic='cancel'
          customVariantRules={{
            default: buttonDefaultStyle,
          }}
          iconStyles={{ width: '14px', height: '14px' }}
          onPress={handleOnClick}
        />
      )}
    </div>
  );
};

export default Notification;

const wrapperStyle: CreateRule<{ title: boolean }> =
  ({ title }) =>
  ({ theme }) => ({
    background: theme.colors.dustyGray,
    display: 'flex',
    padding: '12px',
    borderRadius: '10px',
    letterSpacing: '0px',
    alignItems: title ? 'flex-start' : 'center',
  });

const textWrapperStyle: Rule = {
  display: 'flex',
  flexDirection: 'column',
};

const titleStyle: Rule = ({ theme }) => ({
  color: theme.colors.tescoBlue,
  fontSize: theme.font.fixed.f16.fontSize,
  lineHeight: theme.font.fixed.f20.lineHeight,
  fontWeight: theme.font.weight.bold,
  letterSpacing: '0px',
  paddingLeft: '8px',
});

const textStyle: Rule = ({ theme }) => ({
  color: theme.colors.base,
  fontSize: theme.font.fixed.f14.fontSize,
  lineHeight: theme.font.fixed.f14.lineHeight,
  letterSpacing: '0px',
  paddingLeft: '8px',
});

const buttonDefaultStyle: Rule = {
  marginLeft: 'auto',
  '> svg path': {
    fill: colors.base,
  },
} as Rule;

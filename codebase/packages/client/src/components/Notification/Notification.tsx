import React, { FC, useState } from 'react';
import { useStyle, colors, Colors, Rule } from '@dex-ddl/core';
import { IconButton } from '../IconButton';
import { Graphics, Icon } from '../Icon';

export type NotificationProps = {
  graphic: Graphics;
  iconColor: Colors;
  text: string;
  customStyle?: React.CSSProperties | {};
  onClick?: () => void;
};

const Notification: FC<NotificationProps> = ({ graphic, iconColor, text, customStyle = {}, onClick }) => {
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
    <div className={css(wrapperStyle, customStyle)}>
      <div className={css({ paddingLeft: '5px', alignItems: 'center', display: 'flex' })}>
        <Icon graphic={graphic} fill={colors[iconColor]} iconStyles={{ width: '16px', height: '16px' }} />
      </div>
      <div className={css(textStyle)}>{text}</div>
      <IconButton
        graphic='decline'
        customVariantRules={{
          default: buttonDefaultStyle,
        }}
        iconStyles={{ width: '14px', height: '14px' }}
        onPress={handleOnClick}
      />
    </div>
  );
};

export default Notification;

const wrapperStyle: Rule = {
  background: colors.dustyGray,
  display: 'flex',
  padding: '12px',
  borderRadius: '10px',
  alignItems: 'center',
};

const textStyle: Rule = {
  color: colors.base,
  fontSize: '14px',
  lineHeight: '18px',
  paddingLeft: '5px',
};

const buttonDefaultStyle: Rule = {
  marginLeft: 'auto',
  '> svg path': {
    fill: colors.base,
  },
} as Rule;
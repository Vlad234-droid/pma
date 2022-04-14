import React, { FC } from 'react';
import { Rule, useStyle } from '@pma/dex-wrapper';

import { IconButton, Position } from 'components/IconButton';

import { Trans } from '../Translation';
import { Graphics } from '../Icon';

type Props = {
  onClick: () => void;
  iconPosition?: Position;
  graphic: Graphics;
};

const IconButtonDefault: FC<Props> = ({ onClick, iconPosition = Position.RIGHT, graphic }) => {
  const { css } = useStyle();

  return (
    <IconButton
      customVariantRules={{ default: iconBtnStyle }}
      iconPosition={iconPosition}
      onPress={onClick}
      graphic={graphic}
      iconProps={{ invertColors: true }}
      iconStyles={iconArrowRightStyle}
    >
      <Trans className={css(btnStyle)} i18nKey='give_feedback'>
        Give feedback
      </Trans>
    </IconButton>
  );
};

export default IconButtonDefault;

const btnStyle: Rule = ({ theme }) => {
  return {
    fontSize: theme.font.fixed.f16.fontSize,
    lineHeight: theme.font.fixed.f16.lineHeight,
    letterSpacing: '0px',
  };
};

const iconArrowRightStyle: Rule = ({ theme }) => {
  return {
    fontSize: theme.font.fixed.f16.fontSize,
    lineHeight: theme.font.fixed.f16.lineHeight,
    letterSpacing: '0px',
    height: '17px',
    margin: '3px 9px 0px 3px',
  };
};

const iconBtnStyle: Rule = ({ theme }) => ({
  padding: '12px 7px 12px 20px',
  display: 'flex',
  height: '40px',
  borderRadius: '20px',
  justifyContent: 'space-between',
  alignItems: 'center',
  outline: 0,
  background: theme.colors.tescoBlue,
  color: theme.colors.white,
  cursor: 'pointer',
  width: '176px',
  border: `2px solid ${theme.colors.link}`,
  whiteSpace: 'nowrap',
  fontWeight: 'bold',
});

import React, { FC } from 'react';
import { CreateRule, Rule } from '@pma/dex-wrapper';
import { IconButton, Position } from 'components/IconButton';
import { Graphics } from 'components/Icon';

type Props = {
  onPress: () => void;
  isDisabled: boolean;
  name: string;
  graphic: Graphics;
};

export const Button: FC<Props> = ({ onPress, isDisabled, name, graphic }) => (
  <IconButton
    isDisabled={isDisabled}
    onPress={onPress}
    graphic={graphic}
    customVariantRules={{
      default: iconButtonStyles({ disabled: false }),
      disabled: iconButtonStyles({ disabled: true }),
    }}
    iconStyles={iconStyles}
    iconPosition={Position.LEFT}
    iconProps={{ size: '16px' }}
  >
    {name}
  </IconButton>
);

const iconButtonStyles: CreateRule<{ disabled: boolean }> =
  ({ disabled }) =>
  ({ theme }) => ({
    padding: '10px 10px',
    color: theme.colors.tescoBlue,
    fontWeight: theme.font.weight.bold,
    ...theme.font.fixed.f14,
    letterSpacing: '0px',
    opacity: disabled ? 0.6 : 1,
  });

const iconStyles: Rule = { marginRight: '5px' };

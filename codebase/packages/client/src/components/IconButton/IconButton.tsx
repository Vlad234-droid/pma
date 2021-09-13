import React, { FC, memo } from 'react';

import { AriaButtonProps } from '@react-types/button';

import { Rule, Button } from '@dex-ddl/core';

import { Icon, IconProps, Graphics } from '../Icon';

type VariantRule = {
  default?: Rule;
  disabled?: Rule;
};

export type IconButtonProps = {
  graphic: Graphics;
  iconStyles?: Rule;
  iconProps?: Omit<IconProps, 'graphic' | 'iconStyles'>;
  customVariantRules?: VariantRule;
} & AriaButtonProps<'div'>;

export const IconButton: FC<IconButtonProps> = memo(
  ({ graphic, iconStyles, iconProps, customVariantRules = {}, isDisabled, children, ...props }) => (
    <Button
      {...props}
      isDisabled={isDisabled}
      styles={[buttonBaseRule, getVariantRule(customVariantRules, isDisabled)]}
    >
      <Icon graphic={graphic} iconStyles={iconStyles} {...iconProps} />
      {children}
    </Button>
  ),
);

const getVariantRule = ({ default: d = {}, disabled = {} }: VariantRule, isDisabled?: boolean): Rule =>
  isDisabled ? disabled : d;

const buttonBaseRule: Rule = {
  display: 'inline-flex',
  justifyContent: 'center',
  alignItems: 'center',
  cursor: 'pointer',
  padding: 0,
  outline: 0,
  border: 0,

  // reset button styles
  borderRadius: undefined,
  height: undefined,
  background: undefined,
  color: undefined,
};

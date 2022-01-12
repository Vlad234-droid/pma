import React, { FC, memo } from 'react';

import { AriaButtonProps } from '@react-types/button';

import { Rule, Button } from '@dex-ddl/core';

import { Icon, IconProps, Graphics } from '../Icon';

export type VariantRule = {
  default?: Rule;
  disabled?: Rule;
};

export enum Position {
  RIGHT = 'right',
  LEFT = 'left',
}

export type IconButtonProps = {
  graphic: Graphics;
  iconStyles?: Rule;
  iconProps?: Omit<IconProps, 'graphic' | 'iconStyles'>;
  customVariantRules?: VariantRule;
  iconPosition?: Position;
} & AriaButtonProps<'div'>;

export const IconButton: FC<IconButtonProps> = memo(
  ({ graphic, iconStyles, iconProps, customVariantRules = {}, isDisabled, children, iconPosition, ...props }) => {
    const getContent = () => {
      const content = [<Icon data-test-id={graphic} key='icon' graphic={graphic} iconStyles={iconStyles} {...iconProps} />, children];
      if (iconPosition === Position.RIGHT) return [content[1], content[0]];

      return content;
    };

    return (
      <Button
        {...props}
        isDisabled={isDisabled}
        styles={[buttonBaseRule, getVariantRule(customVariantRules, isDisabled)]}
      >
        {getContent()}
      </Button>
    );
  },
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

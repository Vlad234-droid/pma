import React, { FC, useRef, memo, ButtonHTMLAttributes } from 'react';

import { ButtonAria, useButton } from '@react-aria/button';
import type { AriaButtonProps } from '@react-types/button';

import { useStyle, Rule } from 'styles';

import { Icon, IconProps, Graphics } from '../Icon';

export type IconButtonProps = {
  graphic: Graphics;
  styles: Rule[];
  iconStyles?: Rule;
  iconProps?: Omit<IconProps, 'graphic' | 'iconStyles'>;
  customVariantRules?: Partial<VariantRule>;
} & AriaButtonProps<'button'>;

export const IconButton: FC<IconButtonProps> = memo((props) => {
  const ref = useRef(null);

  const { buttonProps } = useButton(
    {
      ...props,
      elementType: 'button',
    },
    ref,
  ) as ButtonAria<ButtonHTMLAttributes<HTMLButtonElement>>;

  const { graphic, styles = [], iconStyles, iconProps, customVariantRules = {}, children } = props;

  const { css } = useStyle();

  const variant = getVariant({ buttonProps });

  return (
    <button
      {...buttonProps}
      ref={ref}
      className={css(buttonBaseRule, variantRules(customVariantRules)[variant], ...styles)}
    >
      <>
        <Icon graphic={graphic} iconStyles={iconStyles} {...iconProps} />
        {children}
      </>
    </button>
  );
});

IconButton.displayName = 'IconButton';

type Variant = 'default' | 'disabled';

type VariantRule = { [K in Variant]: Rule };

type VariantParams = {
  buttonProps: React.ButtonHTMLAttributes<HTMLButtonElement>;
};

const getVariant = ({ buttonProps }: VariantParams): Variant => {
  if (buttonProps.disabled) return 'disabled';

  return 'default';
};

const variantRules = (customVariantRules: Partial<VariantRule>): VariantRule => {
  return {
    default: customVariantRules.default ?? {},
    disabled: customVariantRules.disabled ?? {},
  };
};

const buttonBaseRule: Rule = {
  display: 'inline-flex',
  justifyContent: 'center',
  alignItems: 'center',
  cursor: 'pointer',
  padding: 0,
  outline: 0,
  border: 0,
};

import React, { FC, useRef } from 'react';

import { useButton } from '@react-aria/button';
import type { AriaButtonProps } from '@react-types/button';

import { useStyle, Styles, Rule } from '@dex-ddl/core';

type Mode = 'default' | 'inverse';

export type ButtonProps = {
  mode?: Mode;
  styles?: Styles | Rule;
} & AriaButtonProps;

export const Button: FC<ButtonProps> = React.memo((props) => {
  const ref = useRef(null);
  const { buttonProps } = useButton(
    {
      ...props,
      elementType: 'div',
    },
    ref,
  );

  const { children, isDisabled, mode = 'default', styles } = props;

  const { css } = useStyle();

  const variant = getVariant({
    mode,
    isDisabled,
  });

  return (
    <div
      {...buttonProps}
      ref={ref}
      className={css(variantRules[variant], {
        display: 'flex',
        height: '40px',
        paddingLeft: '12px',
        paddingRight: '12px',
        borderRadius: '20px',
        justifyContent: 'center',
        alignItems: 'center',
        outline: 0,
        ...styles,
      })}
    >
      {children}
    </div>
  );
});

Button.displayName = 'Button';

type VariantOptions = {
  mode: Mode;
  isDisabled?: boolean;
};

const getVariant = ({ mode, isDisabled }: VariantOptions): Variant => {
  if (isDisabled) {
    return 'disabled';
  }

  return mode;
};

type Variant = Mode | 'disabled';

const variantRules: Record<Variant, Rule> = {
  default: ({ theme }) => ({
    background: theme.colors.tescoBlue,
    color: theme.colors.white,
    cursor: 'pointer',
  }),

  inverse: ({ theme }) => ({
    background: theme.colors.white,
    color: theme.colors.tescoBlue,
    cursor: 'pointer',
  }),

  disabled: ({ theme }) => ({
    background: theme.colors.link50,
    color: theme.colors.white,
  }),
};

import React, { FC, PropsWithChildren, memo, useMemo, useRef } from 'react';

import { useButton } from '@react-aria/button';

import { Rule, useStyle } from '@pma/dex-wrapper';

import type { AriaButtonProps } from '@react-types/button';

type Mode = 'default' | 'inverse';

export type ButtonProps = {
  mode?: Mode;
  styles?: Rule[];
} & AriaButtonProps<'div'>;

export const Button: FC<PropsWithChildren<ButtonProps>> = memo((props) => {
  const ref = useRef(null);
  const { buttonProps } = useButton(
    {
      ...props,
      elementType: 'div',
    },
    ref,
  );

  // eslint-disable-next-line react/prop-types
  const { children, isDisabled, mode = 'default', styles = [] } = props;

  const { css } = useStyle(['lineHeight'], 'remove');

  const variant = useMemo(() => (isDisabled ? 'disabled' : mode), [isDisabled, mode]);

  return (
    <div
      {...buttonProps}
      ref={ref}
      className={css(
        variantRules[variant],
        {
          display: 'flex',
          height: '40px',
          paddingLeft: '12px',
          paddingRight: '12px',
          borderRadius: '20px',
          justifyContent: 'center',
          alignItems: 'center',
          lineHeight: '0',
          outline: 0,
        },
        ...styles,
      )}
    >
      {children}
    </div>
  );
});

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

  disabled: ({ colors }) => ({
    background: colors.link50,
    color: colors.white,
    opacity: 0.4,
  }),
};

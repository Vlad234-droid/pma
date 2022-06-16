import React, { FC } from 'react';
import { CreateRule, Rule, useStyle } from '@pma/dex-wrapper';
import { Icon as IconComponent } from 'components/Icon';

export type FormWrapper = {
  onClose: () => void;
  children: JSX.Element;
  paddingBottom?: number;
};

const FormWrapper: FC<FormWrapper> = ({ onClose, children, paddingBottom = 0 }) => {
  const { css, matchMedia } = useStyle();
  const mobileScreen = matchMedia({ xSmall: true, small: true }) || false;

  return (
    <div className={css(containerStyle({ paddingBottom }))}>
      <div className={css(wrapperStyle({ mobileScreen }))}>
        <span className={css(iconLeftPositionStyle({ mobileScreen }))} onClick={onClose}>
          <IconComponent graphic='arrowLeft' invertColors={true} />
        </span>
        {children}
      </div>
    </div>
  );
};

// const containerStyle: Rule = { height: '100%' };
const containerStyle: CreateRule<{ paddingBottom: number }> = ({ paddingBottom }) => ({
  height: '100%',
  paddingBottom: `${paddingBottom}px`,
});

const wrapperStyle: CreateRule<{ mobileScreen: boolean }> =
  ({ mobileScreen }) =>
  ({ theme }) => ({
    height: '100%',
    overflow: 'auto',
    padding: mobileScreen ? `0 ${theme.spacing.s4}` : `0 ${theme.spacing.s10}`,
  });

const iconLeftPositionStyle: CreateRule<{ mobileScreen: boolean }> =
  ({ mobileScreen }) =>
  ({ theme }) => ({
    position: 'fixed',
    top: theme.spacing.s5,
    left: mobileScreen ? theme.spacing.s5 : theme.spacing.s10,
    textDecoration: 'none',
    border: 'none',
    cursor: 'pointer',
  });

export default FormWrapper;

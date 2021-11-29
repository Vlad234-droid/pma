import React, { FC } from 'react';
import { SuccessModalProps } from './type';
import { Button, Rule, Styles, useBreakpoints, useStyle } from '@dex-ddl/core';
import { Trans } from 'components/Translation';

const SuccessModal: FC<SuccessModalProps> = ({ setModalSuccess, setOpenMainModal, setSelectedPerson }) => {
  const { css } = useStyle();

  return (
    <div className={css(WrapperSuccessContainer)}>
      <div className={css(Success_img)}>
        <svg width='165' height='164' viewBox='0 0 165 164' fill='none' xmlns='http://www.w3.org/2000/svg'>
          <circle opacity='0.1' cx='82.5' cy='82.0002' r='65.2653' fill='#009E47' />
          <path d='M51.9166 78.5832L70.9166 97.5832L112.083 56.4165' stroke='#009E47' strokeWidth='1.2' />
          <circle cx='82' cy='82' r='65' stroke='#009E47' strokeWidth='1.2' />
        </svg>
      </div>
      <h2 className={css(Done_text)}>Done!</h2>
      <p className={css(Description)}>Your feedback downloaded to your device</p>
      <div className={css(Absolute_style)}>
        <div className={css(Container_Styled)}>
          <div className={css(Align_Buttons_style)}>
            <Button
              styles={[font_style, Button_OK_style]}
              onPress={() => {
                setModalSuccess(() => false);
                setOpenMainModal(() => false);
                setSelectedPerson(() => null);
              }}
            >
              <Trans>Okay</Trans>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
const font_style: Rule = ({ theme }) => {
  return theme.font.fixed.f16;
};

const Button_OK_style: Rule = ({ theme }) => {
  return {
    fontWeight: theme.font.weight.bold,
    width: '49%',
    margin: `${theme.spacing.s0} ${theme.spacing.s0_5}`,
    background: theme.colors.tescoBlue,
    border: `${theme.border.width.b1} solid ${theme.colors.tescoBlue}`,
    color: `${theme.colors.white}`,
  };
};

const Align_Buttons_style: Rule = ({ theme }) => {
  const [, isBreakpoint] = useBreakpoints();
  const mobileScreen = isBreakpoint.small || isBreakpoint.xSmall;
  return {
    padding: mobileScreen ? theme.spacing.s6 : theme.spacing.s8,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  };
};

const Absolute_style: Rule = {
  position: 'absolute',
  left: 0,
  bottom: 0,
  width: '100%',
};
const Container_Styled: Rule = ({ theme }) => ({
  position: 'relative',
  bottom: theme.spacing.s0,
  left: theme.spacing.s0,
  right: theme.spacing.s0,
  borderTop: `${theme.border.width.b1} solid ${theme.colors.backgroundDarkest}`,
});

const WrapperSuccessContainer: Rule = {
  paddingTop: '40px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'column',
};
const Success_img: Rule = {
  width: '164px',
  height: '164px',
  '& > img': {
    width: '100%',
    maxHeight: '100%',
  },
} as Styles;

const Done_text: Rule = {
  fontWeight: 'bold',
  fontSize: '28px',
  lineHeight: '32px',
  margin: '20px 0px 16px 0px',
};

const Description: Rule = {
  maxWidth: '357px',
  margin: '0px',
  fontWeight: 'normal',
  fontSize: '24px',
  lineHeight: '28px',
  textAlign: 'center',
};

export default SuccessModal;

import React, { FC } from 'react';
import { Button, Rule, Styles, useBreakpoints, useStyle } from '@pma/dex-wrapper';
import { Trans } from 'components/Translation';

export const WRAPPER = 'success-wrapper';

type Props = {
  onSuccess: () => void;
};

const SuccessModal: FC<Props> = ({ onSuccess }) => {
  const { css } = useStyle();

  return (
    <div className={css(WrapperSuccessContainer)} data-test-id={WRAPPER}>
      <div className={css(SuccessImg)}>
        <svg width='165' height='164' viewBox='0 0 165 164' fill='none' xmlns='http://www.w3.org/2000/svg'>
          <circle opacity='0.1' cx='82.5' cy='82.0002' r='65.2653' fill='#009E47' />
          <path d='M51.9166 78.5832L70.9166 97.5832L112.083 56.4165' stroke='#009E47' strokeWidth='1.2' />
          <circle cx='82' cy='82' r='65' stroke='#009E47' strokeWidth='1.2' />
        </svg>
      </div>
      <h2 className={css(DoneText)}>Done!</h2>
      <p className={css(Description)}>
        <Trans key='you_downloaded_your_feedback_to_your_device'>You downloaded your feedback to your device</Trans>
      </p>
      <div className={css(AbsoluteStyle)}>
        <div className={css(ContainerStyled)}>
          <div className={css(AlignButtonsStyle)}>
            <Button styles={[fontStyle, ButtonOkStyle]} onPress={onSuccess}>
              <Trans>Okay</Trans>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
const fontStyle: Rule = ({ theme }) => {
  return theme.font.fixed.f16;
};

const ButtonOkStyle: Rule = ({ theme }) => {
  return {
    fontWeight: theme.font.weight.bold,
    width: '49%',
    margin: `${theme.spacing.s0} ${theme.spacing.s0_5}`,
    background: theme.colors.tescoBlue,
    border: `${theme.border.width.b1} solid ${theme.colors.tescoBlue}`,
    color: `${theme.colors.white}`,
  };
};

const AlignButtonsStyle: Rule = ({ theme }) => {
  const [, isBreakpoint] = useBreakpoints();
  const mobileScreen = isBreakpoint.small || isBreakpoint.xSmall;
  return {
    padding: mobileScreen ? theme.spacing.s6 : theme.spacing.s8,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  };
};

const AbsoluteStyle: Rule = {
  position: 'absolute',
  left: 0,
  bottom: 0,
  width: '100%',
};
const ContainerStyled: Rule = ({ theme }) => ({
  position: 'relative',
  bottom: theme.spacing.s0,
  left: theme.spacing.s0,
  right: theme.spacing.s0,
  // @ts-ignore
  borderTop: `${theme.border.width.b1} solid ${theme.colors.lightGray}`,
});

const WrapperSuccessContainer: Rule = {
  paddingTop: '40px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'column',
};
const SuccessImg: Rule = {
  width: '164px',
  height: '164px',
  '& > img': {
    width: '100%',
    maxHeight: '100%',
  },
} as Styles;

const DoneText: Rule = {
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

import React, { FC } from 'react';
import { Rule, Styles, useStyle } from '@pma/dex-wrapper';
import { Trans } from 'components/Translation';
import { ButtonsWrapper } from 'components/ButtonsWrapper';

export const WRAPPER = 'success-wrapper';

type Props = {
  onSuccess: () => void;
};

const SuccessModal: FC<Props> = ({ onSuccess }) => {
  const { css } = useStyle();

  return (
    <div className={css(wrapperSuccessContainer)} data-test-id={WRAPPER}>
      <div className={css(successImg)}>
        <svg width='165' height='164' viewBox='0 0 165 164' fill='none' xmlns='http://www.w3.org/2000/svg'>
          <circle opacity='0.1' cx='82.5' cy='82.0002' r='65.2653' fill='#009E47' />
          <path d='M51.9166 78.5832L70.9166 97.5832L112.083 56.4165' stroke='#009E47' strokeWidth='1.2' />
          <circle cx='82' cy='82' r='65' stroke='#009E47' strokeWidth='1.2' />
        </svg>
      </div>
      <h2 className={css(doneText)}>Done!</h2>
      <p className={css(description)}>
        <Trans key='you_downloaded_your_feedback_to_your_device'>You downloaded your feedback to your device</Trans>
      </p>
      <ButtonsWrapper isValid={true} single={true} rightIcon={false} rightTextNotIcon='okay' onRightPress={onSuccess} />
    </div>
  );
};

const wrapperSuccessContainer: Rule = {
  paddingTop: '40px',
  display: 'flex',
  justifyContent: 'start',
  alignItems: 'center',
  flexDirection: 'column',
  height: '100%',
  overflow: 'auto',
  padding: '8px',
};
const successImg: Rule = {
  width: '164px',
  height: '164px',
  '& > img': {
    width: '100%',
    maxHeight: '100%',
  },
} as Styles;

const doneText: Rule = {
  fontWeight: 'bold',
  fontSize: '28px',
  lineHeight: '32px',
  margin: '20px 0px 16px 0px',
};

const description: Rule = {
  maxWidth: '357px',
  margin: '0px',
  fontWeight: 'normal',
  fontSize: '24px',
  lineHeight: '28px',
  textAlign: 'center',
};

export default SuccessModal;

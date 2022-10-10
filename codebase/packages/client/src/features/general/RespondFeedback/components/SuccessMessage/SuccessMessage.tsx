import React, { FC } from 'react';
import { Rule, Styles, useStyle } from '@pma/dex-wrapper';
import success from 'images/success.jpg';
import { Trans } from 'components/Translation';
import { ButtonsWrapper } from 'components/ButtonsWrapper';

export const OK_BTN = 'ok_btn';
export const SUCCESS_MODAL_WRAPPER = 'success_modal_wrapper';

type Props = {
  targetColleagueProfile: any;
  onSuccess: () => void;
};

const SuccessMessage: FC<Props> = ({ targetColleagueProfile, onSuccess }) => {
  const { css } = useStyle();

  return (
    <div data-test-id={SUCCESS_MODAL_WRAPPER} className={css(wrapperSuccessContainer)}>
      <div className={css(successImg)}>
        <img src={success} alt='success' />
      </div>
      <h2 className={css(doneText)}>
        <Trans i18nKey='done'>Done</Trans>!
      </h2>
      <p className={css(description)}>
        {`${targetColleagueProfile?.colleague?.profile?.firstName} ${targetColleagueProfile?.colleague?.profile?.lastName}`}{' '}
        <Trans i18nKey='will_now_be_able_to_see_your_feedback'>will now be able to see your feedback</Trans>
      </p>
      <ButtonsWrapper single={true} rightIcon={false} rightTextNotIcon='okay' isValid={true} onRightPress={onSuccess} />
    </div>
  );
};

const wrapperSuccessContainer: Rule = {
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

export default SuccessMessage;

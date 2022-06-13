import React, { FC } from 'react';
import { Rule, Styles, useStyle } from '@pma/dex-wrapper';
import success from 'images/success.jpg';
import { Trans } from 'components/Translation';
import { useNavigate } from 'react-router-dom';
import { ButtonsWrapper } from 'components/ButtonsWrapper';
import { ArrowLeftIcon } from 'components/ArrowLeftIcon';
import { buildPath } from 'features/general/Routes';
import { Page } from 'pages';

const SuccessMessage: FC = () => {
  const { css } = useStyle();
  const navigate = useNavigate();
  return (
    <div className={css(wrapperSuccessContainer)}>
      <div className={css(successImg)}>
        <img src={success} alt='success' />
      </div>
      <h2 className={css(doneText)}>
        <Trans i18nKey='done'>Done</Trans>!
      </h2>
      <p className={css(description)}>
        <Trans i18nKey='your_feedback_request_has_been_shared'>Your feedback request has been shared.</Trans>
      </p>

      <ButtonsWrapper
        isValid={true}
        single={true}
        rightIcon={false}
        rightTextNotIcon='okay'
        onRightPress={() => {
          navigate(buildPath(Page.FEEDBACK));
        }}
      />
      <ArrowLeftIcon
        onClick={() => {
          navigate(buildPath(Page.FEEDBACK));
        }}
      />
    </div>
  );
};

const wrapperSuccessContainer: Rule = {
  paddingTop: '40px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'column',
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

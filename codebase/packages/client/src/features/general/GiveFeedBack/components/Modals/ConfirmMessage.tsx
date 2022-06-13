import React, { FC } from 'react';
import { Rule, useStyle } from '@pma/dex-wrapper';
import { Trans } from 'components/Translation';
import { ArrowLeftIcon } from 'components/ArrowLeftIcon';
import { ButtonsWrapper } from 'components/ButtonsWrapper';

export const CONFIRM_WRAPPER = 'confirm-message';

type ConfirmModalType = {
  onConfirm: () => void;
  goBack: () => void;
};

const ConfirmMessage: FC<ConfirmModalType> = ({ onConfirm, goBack }) => {
  const { css } = useStyle();
  return (
    <div data-test-id={CONFIRM_WRAPPER}>
      <div className={css(ImgContent_style)}>
        <h3 className={css(info_content_style, { marginTop: '0px' })}>
          <Trans i18nKey='before_you_send_this_feedback'>
            Before you send this feedback, please check it is about something you&apos;ve observed during a first-hand
            interaction with this colleague.
          </Trans>
        </h3>
        <h3 className={css(info_content_style)}>
          <Trans i18nKey='not_related_to_a_specific_situation'>
            Feedback that&apos;s not related to a specific situation with a colleague should be shared in the Every
            Voice Matters survey.
          </Trans>
        </h3>
      </div>

      <ButtonsWrapper
        isValid={true}
        onLeftPress={goBack}
        onRightPress={onConfirm}
        leftText='go_back'
        rightIcon={false}
        rightTextNotIcon='confirm'
      />

      <ArrowLeftIcon onClick={goBack} />
    </div>
  );
};

const ImgContent_style: Rule = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  marginTop: '2vh',
};

const info_content_style: Rule = {
  maxWidth: '86%',
  color: '#595959',
  textAlign: 'center',
  fontWeight: 'normal',
};

export default ConfirmMessage;

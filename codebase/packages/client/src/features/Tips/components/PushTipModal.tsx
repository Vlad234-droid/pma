import React, { FC, useState } from 'react';
import { useStyle, Rule, Modal, Button } from '@dex-ddl/core';
import { TipsProps } from '../types';
import success from 'images/success.jpg';
import { Trans } from 'components/Translation';

export type PushTipModalProps = {
  handleCloseModal: () => void;
  handleConfirm: () => void;
  card: TipsProps;
};

export const PUSH_TIP_MODAL = 'push-tip-modal';
export const CONFIRM_PUSH_BTN = 'confirm-push-btn';
export const CLOSE_PUSH_TIP_MODAL_BTN = 'close-push-tip-modal-btn';

const PushTipModal: FC<PushTipModalProps> = ({ card, handleCloseModal, handleConfirm }) => {
  const { css, theme } = useStyle();

  const [successText, showSuccessText] = useState(false);

  const handlePushTip = () => {
    handleConfirm();
    showSuccessText(true);
  };

  return (
    <Modal modalPosition='middle' modalContainerRule={[modalWrapper]}>
      {successText ? (
        <div className={css(modalInner)}>
          <img src={success} alt='success' />
          <div className={css(modalTitle)}><Trans i18nKey='done'>Done</Trans>!</div>
          <div className={css(modalSubTitleStyle)}>
            <Trans i18nKey='tip_pushed_successfully'>Tip pushed successfully</Trans>.
          </div>
          <div className={css(modalBtnsWrap)}>
            <Button onPress={handleCloseModal} styles={[modalBtn, { margin: '0 auto' }]}>
              <Trans i18nKey='close'>Close</Trans>
            </Button>
          </div>
        </div>
      ) : (
        <div className={css(modalInner)} data-test-id={PUSH_TIP_MODAL}>
          <div className={css(modalTitle)}><Trans i18nKey='push_tip'>Push Tip</Trans></div>
          <div className={css(modalSubTitleStyle)}>
            <Trans i18nKey='do_you_want_to_push_the_below_tip'>Do you want to push the below Tip</Trans>?
          </div>
          <div className={css(modalText)}>
            <span className={css({ fontWeight: 700 })}><Trans i18nKey='title'>Title</Trans>:</span> {card.title}
          </div>
          <div className={css(modalText)}>
            <span className={css({ fontWeight: 700 })}><Trans i18nKey='description'>Description</Trans>:</span> {card.description}
          </div>
          <div className={css(modalText)}>
            <span className={css({ fontWeight: 700 })}><Trans i18nKey='target'>Target</Trans>:</span> {card.targetOrganisation.name}
          </div>
          <div className={css(modalBtnsWrap)}>
            <Button
              data-test-id={CLOSE_PUSH_TIP_MODAL_BTN}
              onPress={handleCloseModal}
              mode='inverse'
              styles={[modalBtn, { border: `1px solid ${theme.colors.tescoBlue}` }]}
            >
              <Trans i18nKey='cancel'>Cancel</Trans>
            </Button>
            <Button data-test-id={CONFIRM_PUSH_BTN} onPress={handlePushTip} styles={[modalBtn]}>
              <Trans i18nKey='confirm'>Confirm</Trans>
            </Button>
          </div>
        </div>
      )}
    </Modal>
  );
};

const modalWrapper: Rule = {
  padding: '24px 30px',
  maxWidth: '500px',
  width: 'calc(100% - 50px)',
};

const modalInner: Rule = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'flex-start',
  textAlign: 'center',
}

const modalTitle: Rule = ({ theme }) => {
  return {
    fontSize: theme.font.fixed.f20.fontSize,
    lineHeight: theme.font.fixed.f20.lineHeight,
    fontWeight: theme.font.weight.bold,
    marginBottom: '8px',
  };
};

const modalSubTitleStyle: Rule = ({ theme }) => {
  return {
    fontSize: theme.font.fixed.f16.fontSize,
    lineHeight: theme.font.fixed.f16.lineHeight,
    marginBottom: '20px',
  };
};

const modalText: Rule = ({ theme }) => {
  return {
    fontSize: theme.font.fixed.f16.fontSize,
    lineHeight: theme.font.fixed.f16.lineHeight,
    marginBottom: '5px',
  };
};

const modalBtnsWrap: Rule = () => {
  return {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    marginTop: '20px',
  };
};

const modalBtn: Rule = ({ theme }) => {
  return {
    fontWeight: theme.font.weight.bold,
    width: '50%',
    margin: '0 5px',
    height: 'auto',
    padding: '10px 16px',
  };
};

export default PushTipModal;

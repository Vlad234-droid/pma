import React, { FC, useState } from 'react';
import { useStyle, Rule, Modal, Button } from '@dex-ddl/core';
import { TipsProps } from '../types';
import success from 'images/success.jpg';

export type PushTipModalProps = {
  handleCloseModal: () => void;
  handleConfirm: () => void;
  card: TipsProps;
};

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
        <>
          <img src={success} alt='success' />
          <div className={css(modalTitle)}>Done!</div>
          <div className={css(modalSubTitleStyle)}>Tip pushed successfully.</div>
          <div className={css(modalBtnsWrap)}>
            <Button onPress={handleCloseModal} styles={[modalBtn, { margin: '0 auto' }]}>
              Close
            </Button>
          </div>
        </>
      ) : (
        <>
          <div className={css(modalTitle)}>Push Tip</div>
          <div className={css(modalSubTitleStyle)}>Do you want to push the below Tip?</div>
          <div className={css(modalText)}>
            <span className={css({ fontWeight: 700 })}>Title:</span> {card.title}
          </div>
          <div className={css(modalText)}>
            <span className={css({ fontWeight: 700 })}>Description:</span> {card.description}
          </div>
          <div className={css(modalText)}>
            <span className={css({ fontWeight: 700 })}>Target:</span> {card.targetOrganisation.name}
          </div>
          <div className={css(modalBtnsWrap)}>
            <Button
              onPress={handleCloseModal}
              mode='inverse'
              styles={[modalBtn, { border: `1px solid ${theme.colors.tescoBlue}` }]}
            >
              Cancel
            </Button>
            <Button onPress={handlePushTip} styles={[modalBtn]}>
              Confirm
            </Button>
          </div>
        </>
      )}
    </Modal>
  );
};

const modalWrapper: Rule = () => {
  return {
    padding: '24px 30px',
    maxWidth: '500px',
    width: 'calc(100% - 50px)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    textAlign: 'center',
  };
};

const modalTitle: Rule = ({theme}) => {
  return {
    fontSize: theme.font.fixed.f20.fontSize,
    lineHeight: theme.font.fixed.f20.lineHeight,
    fontWeight: theme.font.weight.bold,
    marginBottom: '8px',
  };
};

const modalSubTitleStyle: Rule = ({theme}) => {
  return {
    fontSize: theme.font.fixed.f16.fontSize,
    lineHeight: theme.font.fixed.f16.lineHeight,
    marginBottom: '20px',
  };
};

const modalText: Rule = ({theme}) => {
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

const modalBtn: Rule = ({theme}) => {
  return {
    fontWeight: theme.font.weight.bold,
    width: '50%',
    margin: '0 5px',
    height: 'auto',
    padding: '10px 16px',
  };
};

export default PushTipModal;

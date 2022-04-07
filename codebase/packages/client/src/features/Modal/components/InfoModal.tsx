import React, { FC, HTMLProps } from 'react';

import { Button, CreateRule, Modal, Rule, useStyle } from '@pma/dex-wrapper';

export type ConfirmModal = {
  title: string;
  description?: string;
  onCancel: () => void;
  onOverlayClick?: () => void;
};

type Props = HTMLProps<HTMLInputElement> & ConfirmModal;

const InfoModal: FC<Props> = ({ title, description, onCancel, onOverlayClick }) => {
  const { css, matchMedia } = useStyle();
  const mobileScreen = matchMedia({ xSmall: true, small: true }) || false;

  return (
    <Modal
      modalPosition={'middle'}
      modalContainerRule={[containerRule({ mobileScreen })]}
      title={{
        content: title,
        styles: [titleStyle],
      }}
      onOverlayClick={onOverlayClick}
    >
      {description && (
        <div
          data-test-id={'info-modal-description'}
          className={css({
            padding: '16px 0',
          })}
        >
          {description}
        </div>
      )}

      <div
        className={css({
          display: 'flex',
          justifyContent: 'center',
        })}
      >
        <Button styles={[btnOkStyle]} onPress={onCancel}>
          Ok
        </Button>
      </div>
    </Modal>
  );
};

const titleStyle: Rule = {
  fontWeight: 700,
  fontSize: '20px',
  lineHeight: '24px',
  marginBottom: '32px',
  textAlign: 'center',
};

const containerRule: CreateRule<{
  mobileScreen: boolean;
}> = ({ mobileScreen }) => ({
  width: mobileScreen ? '345px' : '500px',
  padding: '24px 38px 24px',
});

const btnOkStyle: Rule = (theme) => ({
  background: 'white',
  border: `1px solid ${theme.colors.tescoBlue}`,
  fontSize: '16px',
  lineHeight: '20px',
  fontWeight: 'bold',
  color: `${theme.colors.tescoBlue}`,
  width: '50%',
  margin: '0px 4px',
});

export default InfoModal;

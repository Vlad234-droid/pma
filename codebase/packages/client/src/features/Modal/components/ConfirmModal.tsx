import React, { FC, HTMLProps } from 'react';
import { useBreakpoints, useStyle, CreateRule, Modal, Styles } from '@dex-ddl/core';
import { Button } from 'components/Button';

export type ConfirmModal = {
  title: string;
  description?: string;
  onCancel: () => void;
  onSave: () => void;
  onOverlayClick?: () => void;
};

type Props = HTMLProps<HTMLInputElement> & ConfirmModal;

const ConfirmModal: FC<Props> = ({ title, description, onCancel, onSave, onOverlayClick }) => {
  const { theme, css } = useStyle();
  const [, isBreakpoint] = useBreakpoints();
  const mobileScreen = isBreakpoint.small || isBreakpoint.xSmall;

  return (
    <Modal
      modalPosition={'middle'}
      modalContainerRule={[containerRule({ mobileScreen })]}
      title={{
        content: title,
        styles: [
          {
            fontWeight: 700,
            fontSize: '20px',
            lineHeight: '24px',
          } as Styles,
        ],
      }}
      onOverlayClick={onOverlayClick}
    >
      {description && (
        <div
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
        <Button
          styles={{
            background: 'white',
            border: `1px solid ${theme.colors.tescoBlue}`,
            fontSize: '16px',
            lineHeight: '20px',
            fontWeight: 'bold',
            color: `${theme.colors.tescoBlue}`,
            width: '50%',
            margin: '0px 4px',
          }}
          onPress={onCancel}
        >
          Cancel
        </Button>
        <Button
          styles={{
            background: `${theme.colors.tescoBlue}`,
            fontSize: '16px',
            lineHeight: '20px',
            fontWeight: 'bold',
            width: '50%',
            margin: '0px 4px 1px 4px',
          }}
          onPress={onSave}
        >
          Submit
        </Button>
      </div>
    </Modal>
  );
};

const containerRule: CreateRule<{
  mobileScreen: boolean;
}> = ({ mobileScreen }) => ({
  width: mobileScreen ? '345px' : '500px',
  padding: '24px 38px 24px',
});

export default ConfirmModal;

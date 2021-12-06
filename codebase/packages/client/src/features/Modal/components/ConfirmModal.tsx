import React, { FC, HTMLProps } from 'react';
import { Trans } from 'components/Translation';

import { useBreakpoints, useStyle, CreateRule, Modal, Button } from '@dex-ddl/core';

export type ConfirmModal = {
  title: string;
  description?: string;
  onCancel: () => void;
  onSave: () => void;
  onOverlayClick?: () => void;
  submitBtnTitle?: string;
};

type Props = HTMLProps<HTMLInputElement> & ConfirmModal;

const ConfirmModal: FC<Props> = ({ title, description, onCancel, onSave, onOverlayClick, submitBtnTitle }) => {
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
          },
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
          styles={[
            {
              background: 'white',
              border: `1px solid ${theme.colors.tescoBlue}`,
              fontSize: '16px',
              lineHeight: '20px',
              fontWeight: 'bold',
              color: `${theme.colors.tescoBlue}`,
              width: '50%',
              margin: '0px 4px',
            },
          ]}
          onPress={onCancel}
        >
          <Trans i18nKey='cancel'>Cancel</Trans>
        </Button>
        <Button
          styles={[
            {
              background: `${theme.colors.tescoBlue}`,
              fontSize: '16px',
              lineHeight: '20px',
              fontWeight: 'bold',
              width: '50%',
              margin: '0px 4px 1px 4px',
            },
          ]}
          onPress={onSave}
        >
          {submitBtnTitle || <Trans i18nKey='submit'>Submit</Trans>}
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

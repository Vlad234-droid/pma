import React, { FC, HTMLProps, useState } from 'react';
import { Trans } from 'components/Translation';
import { Textarea } from 'components/Form';

import { useBreakpoints, useStyle, CreateRule, Modal, Button, fontWeight } from '@dex-ddl/core';

export type ConfirmDeclineModalProps = {
  title: string;
  description?: string;
  onClose: () => void;
  onSave: (reason?) => void;
  onOverlayClick?: () => void;
};

type Props = HTMLProps<HTMLInputElement> & ConfirmDeclineModalProps;

const ConfirmDeclineModal: FC<Props> = ({ title, description, onClose, onSave, onOverlayClick }) => {
  const [reason, setReason] = useState('');
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
            fontWeight: fontWeight.bold,
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
      <div className={css({ padding: '20px 0' })}>
        <Textarea onChange={(e) => setReason(e.target.value)} value={reason} />
      </div>

      <div
        className={css({
          display: 'flex',
          justifyContent: 'center',
        })}
      >
        <Button
          styles={[
            {
              background: theme.colors.white,
              border: `1px solid ${theme.colors.tescoBlue}`,
              fontSize: '16px',
              lineHeight: '20px',
              fontWeight: 'bold',
              color: `${theme.colors.tescoBlue}`,
              width: '50%',
              margin: '0px 4px',
            },
          ]}
          onPress={onClose}
        >
          <Trans i18nKey='cancel'>Cancel</Trans>
        </Button>
        <Button
          isDisabled={!reason}
          styles={[
            {
              background: `${theme.colors.tescoBlue}`,
              fontSize: '16px',
              lineHeight: '20px',
              fontWeight: 'bold',
              width: '50%',
              margin: '0px 4px 1px 4px',
            },
            !reason ? { opacity: '0.6' } : {},
          ]}
          onPress={() => {
            onSave({ reason });
            onClose();
          }}
        >
          <Trans i18nKey='submit'>Submit</Trans>
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

export default ConfirmDeclineModal;

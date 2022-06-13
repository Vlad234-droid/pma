import React, { FC, HTMLProps } from 'react';
import { Trans } from 'components/Translation';

import { useStyle, CreateRule, Modal, Button } from '@pma/dex-wrapper';

export type ModalErrorProps = {
  title: string;
  description?: string;
  onClose: () => void;
  onOverlayClick?: () => void;
};

export const TEST_DESCRIPTION_ID = 'test-description';
export const TEST_CLOSE = 'test-close';

type Props = HTMLProps<HTMLInputElement> & ModalErrorProps;

const ModalError: FC<Props> = ({ title, description, onClose, onOverlayClick, children }) => {
  const { css, theme, matchMedia } = useStyle();
  const mobileScreen = matchMedia({ xSmall: true, small: true }) || false;

  return (
    <Modal
      modalPosition={'middle'}
      modalContainerRule={[containerRule({ mobileScreen })]}
      title={{
        content: title,
        styles: [
          {
            fontWeight: 700,
            ...theme.font.fixed.f20,
          },
        ],
      }}
      onOverlayClick={onOverlayClick}
    >
      {description && (
        <div
          data-test-id={TEST_DESCRIPTION_ID}
          className={css({
            padding: '16px 0',
          })}
        >
          {description}
        </div>
      )}
      {children}
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
              border: `2px solid ${theme.colors.tescoBlue}`,
              fontSize: theme.font.fixed.f16.fontSize,
              lineHeight: theme.font.fixed.f16.lineHeight,
              fontWeight: theme.font.weight.bold,
              color: `${theme.colors.tescoBlue}`,
              width: '50%',
              margin: '0px 4px',
            },
          ]}
          data-test-id={TEST_CLOSE}
          onPress={onClose}
        >
          <Trans i18nKey='close'>Close</Trans>
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

export default ModalError;

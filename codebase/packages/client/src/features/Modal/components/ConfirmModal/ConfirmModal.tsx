import React, { FC, HTMLProps } from 'react';
import { Trans } from 'components/Translation';

import { useBreakpoints, useStyle, CreateRule, Modal, Button, Rule } from '@dex-ddl/core';

export type ConfirmModal = {
  title: string;
  description?: string;
  onCancel: () => void;
  onSave: () => void;
  onOverlayClick?: () => void;
  submitBtnTitle?: JSX.Element;
  canSubmit?: boolean;
  visibleCancelBtn?: boolean;
};

type Props = HTMLProps<HTMLInputElement> & ConfirmModal;

const ConfirmModal: FC<Props> = ({
  title,
  description,
  onCancel,
  onSave,
  onOverlayClick,
  submitBtnTitle = <Trans i18nKey='submit'>Submit</Trans>,
  canSubmit = true,
  children,
  visibleCancelBtn = true,
}) => {
  const { css } = useStyle();
  const [, isBreakpoint] = useBreakpoints();
  const mobileScreen = isBreakpoint.small || isBreakpoint.xSmall;

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
          className={css({
            padding: '16px 0px 0px 0px',
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
          marginTop: '22px',
        })}
      >
        {visibleCancelBtn && (
          <Button styles={[cancelBtn]} onPress={onCancel}>
            <Trans i18nKey='cancel'>Cancel</Trans>
          </Button>
        )}

        <Button isDisabled={!canSubmit} styles={[saveBtn, !canSubmit ? { opacity: '0.6' } : {}]} onPress={onSave}>
          {submitBtnTitle}
        </Button>
      </div>
    </Modal>
  );
};

const cancelBtn: Rule = ({ theme }) => ({
  background: 'white',
  border: `1px solid ${theme.colors.tescoBlue}`,
  fontSize: '16px',
  lineHeight: '20px',
  fontWeight: 'bold',
  color: `${theme.colors.tescoBlue}`,
  width: '50%',
  margin: '0px 4px',
});

const saveBtn: Rule = ({ theme }) => ({
  background: `${theme.colors.tescoBlue}`,
  fontSize: '16px',
  lineHeight: '20px',
  fontWeight: 'bold',
  width: '50%',
  margin: '0px 4px 1px 4px',
});

const titleStyle: Rule = {
  fontWeight: 700,
  fontSize: '20px',
  lineHeight: '24px',
};

const containerRule: CreateRule<{
  mobileScreen: boolean;
}> = ({ mobileScreen }) => ({
  width: mobileScreen ? '345px' : '500px',
  padding: '24px 38px 24px',
});

export default ConfirmModal;

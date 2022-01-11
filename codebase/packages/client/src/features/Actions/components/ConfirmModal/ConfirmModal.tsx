import React, { FC, HTMLProps, useState } from 'react';
import { useBreakpoints, useStyle, CreateRule, Modal, Button, fontWeight } from '@dex-ddl/core';

import { Trans } from 'components/Translation';
import { ColleagueInfo } from 'features/MyTeam';
import { Employee } from 'config/types';

type RenderContent = (setReason: (reason: string) => void) => JSX.Element;

export type ConfirmAcceptModalProps = {
  title?: string;
  onClose: () => void;
  onSave: (hasReason?: boolean, reason?: string) => void;
  onOverlayClick?: () => void;
  hasReason?: boolean;
  review?: Employee;
  reason?: string;
};

type Props = HTMLProps<HTMLInputElement> & ConfirmAcceptModalProps;

const ConfirmModal: FC<Props> = ({
  title,
  reason,
  children,
  hasReason = false,
  onClose,
  onSave,
  onOverlayClick,
  review,
}) => {
  const { theme, css } = useStyle();
  const [, isBreakpoint] = useBreakpoints();
  const mobileScreen = isBreakpoint.small || isBreakpoint.xSmall;

  const canSubmit = hasReason ? Boolean(reason?.length) : true;

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
      <div>
        {review && (
          <div className={css({ padding: '16px 0 0'})}>
            <ColleagueInfo
              firstName={review.firstName}
              lastName={review.lastName}
              jobName={review.jobName}
              businessType={review.businessType}
            />
          </div>
        )}
        {children}
      </div>
      <div
        className={css({
          display: 'flex',
          justifyContent: 'center',
        })}
      >
        <Button
          data-test-id='cancel-btn'
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
          data-test-id='submit-btn'
          isDisabled={!canSubmit}
          styles={[
            {
              background: `${theme.colors.tescoBlue}`,
              fontSize: '16px',
              lineHeight: '20px',
              fontWeight: 'bold',
              width: '50%',
              margin: '0px 4px 1px 4px',
            },
            !canSubmit ? { opacity: '0.6' } : {},
          ]}
          onPress={() => onSave(hasReason, reason)}
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

export default ConfirmModal;

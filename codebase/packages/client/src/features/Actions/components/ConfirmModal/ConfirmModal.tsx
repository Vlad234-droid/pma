import React, { FC, HTMLProps } from 'react';
import { useStyle } from '@dex-ddl/core';

import { ColleagueInfo } from 'features/MyTeam';
import { Employee } from 'config/types';
import ConfirmModal from 'components/ConfirmModal';

export type ConfirmAcceptModalProps = {
  title?: string;
  onClose: () => void;
  onSave: (hasReason?: boolean, reason?: string) => void;
  onOverlayClick?: () => void;
  hasReason?: boolean;
  employee?: Employee;
  reason?: string;
  submitBtnText?: JSX.Element;
};

type Props = HTMLProps<HTMLInputElement> & ConfirmAcceptModalProps;

const Modal: FC<Props> = ({
  title,
  reason,
  children,
  hasReason = false,
  onClose,
  onSave,
  onOverlayClick,
  employee,
  submitBtnText
}) => {
  const { css } = useStyle();

  const canSubmit = hasReason ? Boolean(reason?.length) : true;

  return (
    <ConfirmModal
      title={title}
      onClose={onClose}
      onSave={() => onSave(hasReason, reason)}
      canSubmit={canSubmit}
      onOverlayClick={onOverlayClick}
      submitBtnText={submitBtnText}
    >
      <div>
        {employee && (
          <div className={css({ padding: '16px 0 0' })}>
            <ColleagueInfo
              firstName={employee.firstName}
              lastName={employee.lastName}
              jobName={employee.jobName}
              businessType={employee.businessType}
            />
          </div>
        )}
        {children}
      </div>
    </ConfirmModal>
  )
};

export default Modal;

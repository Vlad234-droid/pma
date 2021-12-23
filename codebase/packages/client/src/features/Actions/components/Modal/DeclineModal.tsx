import React, { FC } from 'react';
import { useStyle } from '@dex-ddl/core';

import { ReviewForApproval } from 'config/types';
import { ReviewType } from 'config/enum';
import { Select } from 'components/Form';

import ConfirmModal from './ConfirmModal';

const options = [
  { value: 'Aligned to strategic priorities', label: 'Aligned to strategic priorities' },
  { value: 'Ambitious enough', label: 'Ambitious enough' },
  { value: 'Easily assessable', label: 'Easily assessable' },
  { value: 'Something else', label: 'Something else' },
  { value: 'I will pick up with you offline', label: 'I will pick up with you offline' },
];

type Props = {
  onSave: (reason: string) => void;
  onClose: () => void;
  review?: ReviewForApproval;
  reviewType: ReviewType;
};

const DeclineModal: FC<Props> = ({ onSave, onClose, review, reviewType }) => {
  const { css } = useStyle();
  const isObjective = reviewType === ReviewType.OBJECTIVE;

  return (
    <ConfirmModal
      title={'Decline reason'}
      hasReason={isObjective}
      renderContent={(setReason) => (
        <div className={css({ padding: '20px 0' })}>
          {isObjective ? (
            <Select options={options} placeholder='Please select' onChange={(e) => setReason(e.target.value)} />
          ) : (
            `You are going to reject this form as it doesn’t reflect the conversation you had with your colleague. Please pick up with them directly to discuss more.`
          )}
        </div>
      )}
      onSave={onSave}
      onClose={onClose}
      review={review}
    />
  );
};

export default DeclineModal;

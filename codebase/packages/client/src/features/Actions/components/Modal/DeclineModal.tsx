import React, { FC } from 'react';
import { useStyle } from '@dex-ddl/core';

import { ReviewForApproval } from 'config/types';
import { ReviewType } from 'config/enum';
import { Select } from 'components/Form';
import { useTranslation } from 'components/Translation';

import ConfirmModal from './ConfirmModal';
import { getDeclineReasonOptions } from '../../utils';

type Props = {
  onSave: (reason: string) => void;
  onClose: () => void;
  review?: ReviewForApproval;
  reviewType: ReviewType;
};

const DeclineModal: FC<Props> = ({ onSave, onClose, review, reviewType }) => {
  const { css } = useStyle();
  const { t } = useTranslation();
  const isObjective = reviewType === ReviewType.OBJECTIVE;
  const options = getDeclineReasonOptions(t);

  return (
    <ConfirmModal
      title={t('decline_reason', 'Decline reason')}
      hasReason={isObjective}
      renderContent={(setReason) => (
        <div className={css({ padding: '20px 0' })}>
          {isObjective ? (
            <Select
              options={options}
              placeholder={t('please_select', 'Please select')}
              onChange={(event, value) => setReason(value as string)}
            />
          ) : (
            t(
              'decline_review_agreement',
              `You are going to reject this form as it doesn’t reflect the conversation you had with your colleague. Please pick up with them directly to discuss more.`,
            )
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

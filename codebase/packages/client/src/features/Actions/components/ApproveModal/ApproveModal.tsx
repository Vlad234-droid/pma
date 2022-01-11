import React, { FC } from 'react';

import { useTranslation } from 'components/Translation';

import ConfirmModal from '../ConfirmModal';

type Props = {
  onSave: (reason?: string) => void;
  onClose: () => void;
};

const ApproveModal: FC<Props> = ({ onSave, onClose }) => {
  const { t } = useTranslation();

  return (
    <ConfirmModal
      title={t('submit_objectives_or_reviews', 'Submit objectives or reviews')}
      onSave={onSave}
      onClose={onClose}
    >
      <div>{t('approve_objectives_or_reviews', 'Are you sure you want to approve objectives or reviews?')}</div>
    </ConfirmModal>
  );
};

export default ApproveModal;

import React, { FC } from 'react';
import { useStyle } from '@dex-ddl/core';

import { useTranslation } from 'components/Translation';
import { Status } from 'config/enum';

import ConfirmModal from '../ConfirmModal';

type Props = {
  onSave: () => void;
  onClose: () => void;
  type: Status;
};

const ConfirmApproveModal: FC<Props> = ({ onSave, onClose, type }) => {
  const { t } = useTranslation();
  const { css } = useStyle();

  console.log('type', type);

  return (
    <ConfirmModal
      title={t('submit_objectives_or_reviews', 'Submit objectives or reviews')}
      onSave={onSave}
      onClose={onClose}
    >
      <div>{type}</div>
      <div className={css({ padding: '16px 0' })}>
        {t('approve_objectives_or_reviews', 'Are you sure you want to approve objectives or reviews?')}
      </div>
    </ConfirmModal>
  );
};

export default ConfirmApproveModal;

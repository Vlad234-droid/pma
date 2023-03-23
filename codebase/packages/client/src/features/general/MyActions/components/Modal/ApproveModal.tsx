import React, { FC } from 'react';
import { useStyle } from '@pma/dex-wrapper';

import { useTranslation } from 'components/Translation';

import ConfirmModal from './ConfirmModal';
import { Tenant, useTenant } from 'features/general/Permission';

type Props = {
  onSave: (hasReason?: boolean, reason?: string) => void;
  onClose: () => void;
  approveKey?: string;
};

const ApproveModal: FC<Props> = ({ onSave, onClose, approveKey = 'approve' }) => {
  const { t } = useTranslation();
  const { css } = useStyle();
  const tenant = useTenant();

  return (
    <ConfirmModal
      title={t(
        'my_actions_approve_modal_title',
        tenant === Tenant.GENERAL ? 'Submit objectives or reviews' : 'Agree priorities or reviews',
        {
          ns: tenant,
        },
      )}
      onSave={onSave}
      onClose={onClose}
      submitBtnTitle={t(approveKey, tenant === Tenant.GENERAL ? 'Approve' : 'Complete', { ns: tenant })}
    >
      <div className={css({ padding: '16px 0' })}>
        {t(
          'approve_objectives_or_reviews',
          tenant === Tenant.GENERAL
            ? 'Are you sure you want to approve objectives or reviews?'
            : 'Are you sure you want to agree priorities or reviews?',
          { ns: tenant },
        )}
      </div>
    </ConfirmModal>
  );
};

export default ApproveModal;

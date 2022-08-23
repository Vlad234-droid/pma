import React, { FC, useState } from 'react';
import { useStyle } from '@pma/dex-wrapper';

import { useTenant } from 'features/general/Permission';
import { Employee } from 'config/types';
import { ReviewType } from 'config/enum';
import { Item, Select } from 'components/Form';

import { useTranslation } from 'components/Translation';
import ConfirmModal from './ConfirmModal';
import { getDeclineReasonOptions } from '../../utils';
import { Tenant } from 'utils';

type Props = {
  onSave: (hasReason?: boolean, reason?: string) => void;
  onClose: () => void;
  review?: Employee;
  reviewType: string;
};

const DeclineModal: FC<Props> = ({ onSave, onClose, review, reviewType }) => {
  const { css } = useStyle();
  const { t } = useTranslation();
  const tenant = useTenant();
  const isObjective = tenant === Tenant.GENERAL && reviewType === ReviewType.OBJECTIVE;
  const options = getDeclineReasonOptions(t);
  const [reason, setReason] = useState('');

  const handleChangeReason = (event) => {
    setReason(event.target.value);
  };

  return (
    <ConfirmModal
      title={t('decline_reason', tenant === Tenant.GENERAL ? 'Decline reason' : 'Request amend reason', { ns: tenant })}
      hasReason={isObjective}
      onSave={onSave}
      onClose={onClose}
      employee={review}
      reason={reason}
    >
      <div className={css({ padding: '16px 0' })}>
        {isObjective ? (
          <>
            <div className={css({ fontSize: '16px', lineHeight: '20px', letterSpacing: '0px', marginBottom: '8px' })}>
              {t('decline_objective_agreement', `You’ve rejected your colleague’s objectives because they were not:`)}
            </div>
            <div className={css({ padding: '0 40px' })}>
              <Item withIcon={false}>
                <Select
                  name='declineReason'
                  options={options}
                  placeholder={t('please_select', 'Please select')}
                  onChange={handleChangeReason}
                />
              </Item>
            </div>
          </>
        ) : (
          t(
            'decline_review_agreement',
            tenant === Tenant.GENERAL
              ? "Done, you’ve rejected this form as it doesn't reflect the conversation you had with your colleague. Please pick up with them directly to discuss more."
              : "Done, you've requested the form to be amended as it doesn't reflect the conversation you had with your colleague. Please pick up with them directly to discuss more.",
            { ns: tenant },
          )
        )}
      </div>
    </ConfirmModal>
  );
};

export default DeclineModal;

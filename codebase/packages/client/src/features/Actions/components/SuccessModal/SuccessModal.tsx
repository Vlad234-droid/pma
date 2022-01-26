import React, { FC } from 'react';

import { useTranslation } from 'components/Translation';
import SuccessModal from 'components/SuccessModal';

import { ReviewType, Status } from 'config/enum';

type Props = {
  review: ReviewType;
  status: Status;
  onClose: () => void;
};

const Modal: FC<Props> = ({ review, status, onClose }) => {
  const { t } = useTranslation();

  return (
    <SuccessModal
      title={`${status === Status.DECLINED ? t('declined', 'Declined') : t('approved', 'Approved')} ${review === ReviewType.OBJECTIVE ? t('objectives', 'Objectives') : t('review', 'Review')}`}
      onClose={onClose}
      withСheckMark
      description={status === Status.DECLINED
        ? t('you_have_rejected', 'You’ve rejected this form as it doesn’t reflect the conversation you had with your colleague. ' +
        'Please pick up with them directly to discuss more.')
        : `${t('you_have_approved', 'You have approved your colleague\'s')} ${review === ReviewType.OBJECTIVE ? t('objectives', 'Objectives')
          : `${review} ${t('review', 'Review')}`}.`
        }
    />
  );
};

export default Modal;

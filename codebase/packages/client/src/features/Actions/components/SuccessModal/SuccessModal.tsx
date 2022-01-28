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
      title={`${status === Status.DECLINED ? t('declined', 'Declined') : t('approved', 'Approved')} ${t('objectives_and_or_reviews', 'objectives and / or reviews')}`}
      onClose={onClose}
      withСheckMark
      description={status === Status.DECLINED
        ? t('you_have_rejected', 'You’ve rejected this form as it doesn’t reflect the conversation you had with your colleague. ' +
        'Please pick up with them directly to discuss more.')
        : `${t('you_have_approved', 'You have approved your colleague\'s')} ${review === ReviewType.OBJECTIVE ? t('objectives', 'Objectives').toLowerCase()
          : `${review === ReviewType.MYR ? t('review_type_description_myr', 'Mid-year review').toLowerCase() : t('review_type_description_eyr', 'Year-end review').toLowerCase()}`}.`
        }
    />
  );
};

export default Modal;

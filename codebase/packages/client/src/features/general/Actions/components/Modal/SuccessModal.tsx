import React, { FC } from 'react';

import { useTranslation } from 'components/Translation';
import SuccessModal from 'components/SuccessModal';
import { SuccessMark, ExclamationMark } from 'components/Icon';

import { ReviewType, Status } from 'config/enum';
import { useSelector } from 'react-redux';
import { getEmployeesWithReviewStatus } from '@pma/store';
import { useNavigate } from 'react-router-dom';
import { buildPath } from 'features/general/Routes';
import { Page } from 'pages';

type Props = {
  review: ReviewType;
  status: Status.DECLINED | Status.APPROVED;
  onClose: () => void;
};

const Modal: FC<Props> = ({ review, status, onClose }) => {
  const { t } = useTranslation();
  const colleaguesWaitingForApproval = useSelector(getEmployeesWithReviewStatus(Status.WAITING_FOR_APPROVAL)());
  const navigate = useNavigate();

  const title = `${status === Status.DECLINED ? t('declined', 'Declined') : t('approved', 'Approved')} ${t(
    'objectives_and_or_reviews',
    'objectives and / or reviews',
  )}`;
  const declineDescription = t(
    'you_have_rejected',
    'You’ve rejected this form as it doesn’t reflect the conversation you had with your colleague. ' +
      'Please pick up with them directly to discuss more.',
  );
  const reviewDescription = `${
    review === ReviewType.MYR
      ? t('review_type_description_myr', 'Mid-year review').toLowerCase()
      : t('review_type_description_eyr', 'Year-end review').toLowerCase()
  }`;
  const typeDescription =
    review === ReviewType.OBJECTIVE ? t('objectives', 'Objectives').toLowerCase() : reviewDescription;
  const approveDescription = `${t('you_have_approved', "You have approved your colleague's")} ${typeDescription}.`;

  const handleClose = () => {
    onClose();
    if (!colleaguesWaitingForApproval.length) {
      navigate(buildPath(Page.MY_TEAM));
    }
  };

  return (
    <SuccessModal
      title={title}
      onClose={handleClose}
      mark={status === Status.DECLINED ? <ExclamationMark /> : <SuccessMark />}
      description={status === Status.DECLINED ? declineDescription : approveDescription}
    />
  );
};

export default Modal;

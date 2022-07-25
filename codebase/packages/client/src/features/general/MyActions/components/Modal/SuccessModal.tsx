import React, { FC } from 'react';

import { useTranslation } from 'components/Translation';
import SuccessModal from 'components/SuccessModal';
import { ExclamationMark, SuccessMark } from 'components/Icon';

import { ReviewType, Status } from 'config/enum';
import { useSelector } from 'react-redux';
import { getEmployeesWithReviewStatus } from '@pma/store';
import { useNavigate } from 'react-router-dom';
import { buildPath } from 'features/general/Routes';
import { Page } from 'pages';
import { useTenant } from 'features/general/Permission';
import { Tenant } from 'utils';

type Props = {
  review: ReviewType;
  status: Status.DECLINED | Status.APPROVED;
  onClose: () => void;
};

const ReviewSuccessModal: FC<Props> = ({ review, status, onClose }) => {
  const { t } = useTranslation();
  const colleaguesWaitingForApproval = useSelector(getEmployeesWithReviewStatus(Status.WAITING_FOR_APPROVAL));
  const navigate = useNavigate();
  const tenant = useTenant();

  const title = `${
    status === Status.DECLINED ? t('declined', 'Declined', { ns: tenant }) : t('approved', 'Approved', { ns: tenant })
  } ${t(
    'objectives_or_reviews',
    tenant === Tenant.GENERAL ? 'objectives and / or reviews' : 'priorities and / or reviews',
    { ns: tenant },
  )}`;

  const reviewDescription = `${
    review === ReviewType.MYR
      ? t('review_type_description_myr', 'Mid-year review').toLowerCase()
      : t('review_type_description_eyr', 'Year-end review').toLowerCase()
  }`;

  const typeDescription =
    review === ReviewType.OBJECTIVE ? t('objectives', 'Objectives').toLowerCase() : reviewDescription;

  const description =
    status === Status.DECLINED
      ? t(
          'you_have_rejected',
          tenant === Tenant.GENERAL
            ? "You’ve rejected this form as it doesn't reflect the conversation you had with your colleague. Please pick up with them directly to discuss more."
            : "You've requested the form to be amended as it doesn't reflect the conversation you had with your colleague. Please pick up with them directly to discuss",
          { ns: tenant },
        )
      : `${t(
          'you_have_approved',
          tenant === Tenant.GENERAL ? "You have approved your colleague's" : "You have agreed your colleague's",
          { ns: tenant },
        )} ${typeDescription}.`;

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
      description={description}
    />
  );
};

export default ReviewSuccessModal;

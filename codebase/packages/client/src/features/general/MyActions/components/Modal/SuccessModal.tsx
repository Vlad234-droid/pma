import React, { FC, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

import { useTranslation } from 'components/Translation';
import SuccessModal from 'components/SuccessModal';

import { ExclamationMark, SuccessMark } from 'components/Icon';
import { ActionStatus, Status } from 'config/enum';
import { useSelector } from 'react-redux';
import { getEmployeesWithReviewStatuses, getManagersMetaSelector, reviewsMetaSelector } from '@pma/store';
import { buildPath } from 'features/general/Routes';
import { Page } from 'pages';
import { useTenant, Tenant } from 'features/general/Permission';
import { StatusHistoryType } from '../../context/successModalContext';

const ReviewSuccessModal: FC<{
  statusHistory: StatusHistoryType;
  onClose: () => void;
}> = ({ statusHistory, onClose }) => {
  if (!statusHistory) return null;

  const { status, prevStatus, type } = statusHistory;
  const { t } = useTranslation();
  const { loading, error, saving } = useSelector(reviewsMetaSelector);
  const { loading: managerLoading } = useSelector(getManagersMetaSelector);
  const colleaguesWaitingForApproval = useSelector((state) => getEmployeesWithReviewStatuses(state, 'PENDING'));
  const navigate = useNavigate();
  const tenant = useTenant();

  const actionStatusMap = {
    [`${Status.WAITING_FOR_COMPLETION}-${Status.COMPLETED}`]: ActionStatus.COMPLETED,
    [`${Status.WAITING_FOR_COMPLETION}-${Status.APPROVED}`]: ActionStatus.COMPLETE_DECLINED,
    [`${Status.WAITING_FOR_APPROVAL}-${Status.APPROVED}`]: ActionStatus.APPROVED,
    [`${Status.WAITING_FOR_APPROVAL}-${Status.DECLINED}`]: ActionStatus.APPROVE_DECLINED,
  };
  const actionStatus = error ? ActionStatus.ERROR : actionStatusMap[`${prevStatus}-${status}`];

  const titleMap = {
    [ActionStatus.ERROR]: t('error', 'Error'),
    [ActionStatus.PENDING]: t('pending', 'Pending'),
    [ActionStatus.COMPLETED]: t('completed', 'Completed'),
    [ActionStatus.APPROVED]: t('approved', 'Approved'),
    [ActionStatus.COMPLETE_DECLINED]: t('declined', 'Declined'),
    [ActionStatus.APPROVE_DECLINED]: t(
      'request_amend_priorities_and_or_reviews',
      'Request amend priorities and / or reviews',
    ),
  };

  const description = {
    [ActionStatus.ERROR]: t('something_went_wrong', 'Something went wrong'),
    [ActionStatus.PENDING]: t('pending', 'Pending'),
    [ActionStatus.APPROVED]: type
      ? t(`you_have_approved_${type?.toLowerCase()}`, { ns: tenant })
      : t('you_have_bulk_approved', { ns: tenant }),
    [ActionStatus.COMPLETED]: t('you_have_completed', { ns: tenant }),
    [ActionStatus.COMPLETE_DECLINED]: t('you_have_rejected', { ns: tenant }),
    [ActionStatus.APPROVE_DECLINED]: t('you_have_rejected', { ns: tenant }),
  };

  const title = useMemo(() => {
    if (tenant === Tenant.BANK && actionStatus === ActionStatus.APPROVED) {
      return t('agree_priorities_and_or_reviews', 'Agree priorities and / or reviews');
    }

    return titleMap[actionStatus];
  }, [actionStatus, tenant]);

  const handleClose = () => {
    if (loading || saving || managerLoading) return;
    if (!colleaguesWaitingForApproval.length) {
      navigate(buildPath(Page.MY_TEAM));
    }
    onClose();
  };

  return (
    <SuccessModal
      title={title}
      onClose={handleClose}
      mark={
        [ActionStatus.APPROVE_DECLINED, ActionStatus.COMPLETE_DECLINED, ActionStatus.ERROR].includes(actionStatus) ? (
          <ExclamationMark />
        ) : (
          <SuccessMark />
        )
      }
      description={description[actionStatus]}
      loading={loading || saving || managerLoading}
    />
  );
};

export default ReviewSuccessModal;

import React, { FC } from 'react';
import { useNavigate } from 'react-router-dom';

import { useTranslation } from 'components/Translation';
import SuccessModal from 'components/SuccessModal';

import { ExclamationMark, SuccessMark } from 'components/Icon';
import { ActionStatus, ReviewType, Status } from 'config/enum';
import { useSelector } from 'react-redux';
import { getEmployeesWithReviewStatuses, getManagersMetaSelector, reviewsMetaSelector } from '@pma/store';
import { buildPath } from 'features/general/Routes';
import { Page } from 'pages';
import { useTenant } from 'features/general/Permission';
import { StatusHistoryType } from '../../context/successModalContext';

const ReviewSuccessModal: FC<{
  isOpen: boolean;
  statusHistory: StatusHistoryType;
  setOpened: (state: boolean) => void;
}> = ({ statusHistory, setOpened, isOpen }) => {
  if (!statusHistory) return null;
  if (!isOpen) return null;

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
    [ActionStatus.APPROVE_DECLINED]: t('declined', 'Declined'),
  };

  const description = {
    [ActionStatus.ERROR]: t('something_went_wrong', 'Something went wrong'),
    [ActionStatus.PENDING]: t('pending', 'Pending'),
    [ActionStatus.COMPLETED]: t('you_have_completed'),
    [ActionStatus.APPROVED]: t('you_have_approved', { ns: tenant }),
    [ActionStatus.COMPLETE_DECLINED]: t('you_have_complete_declined'),
    [ActionStatus.APPROVE_DECLINED]: t('you_have_rejected', { ns: tenant }),
  };

  const typeDescription = {
    [ReviewType.QUARTER]: t('priorities', 'Priorities').toLowerCase(),
    [ReviewType.OBJECTIVE]: t('objectives', 'Objectives').toLowerCase(),
    [ReviewType.MYR]: t('review_type_description_myr', 'Mid-year review').toLowerCase(),
    [ReviewType.EYR]: t('review_type_description_eyr', 'Year-end review').toLowerCase(),
  };

  const handleClose = () => {
    setOpened(false);
    if (!colleaguesWaitingForApproval.length) {
      navigate(buildPath(Page.MY_TEAM));
    }
  };

  return (
    <SuccessModal
      title={titleMap[actionStatus]}
      onClose={handleClose}
      mark={
        [ActionStatus.APPROVE_DECLINED, ActionStatus.COMPLETE_DECLINED, ActionStatus.ERROR].includes(actionStatus) ? (
          <ExclamationMark />
        ) : (
          <SuccessMark />
        )
      }
      description={`${description[actionStatus]} ${type ? typeDescription[type] : ''}.`}
      loading={loading || saving || managerLoading}
    />
  );
};

export default ReviewSuccessModal;

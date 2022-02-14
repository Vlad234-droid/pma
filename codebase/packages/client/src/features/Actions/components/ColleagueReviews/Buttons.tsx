import React, { FC, useState } from 'react';

import { Button, useStyle } from '@dex-ddl/core';

import { Icon } from 'components/Icon';
import { Trans, useTranslation } from 'components/Translation/Translation';
import { getReviewTypeTitle } from 'features/Actions/utils';
import { ReviewType, Status } from 'config/enum';

import { ApproveModal, DeclineModal, SuccessModal } from '../Modal';

type Props = {
  reviewType: ReviewType;
  updateReviewStatus: (status: Status) => (reviewType: ReviewType) => (T) => void;
  isDisabled: boolean;
};

export const Buttons: FC<Props> = ({ reviewType, updateReviewStatus, isDisabled }) => {
  const { css, theme } = useStyle();
  const { t } = useTranslation();
  const [isOpenDeclinePopup, setIsOpenDeclinePopup] = useState(false);
  const [isOpenApprovePopup, setIsOpenApprovePopup] = useState(false);
  const title = getReviewTypeTitle(t);
  const [isOpenSuccessModal, setIsOpenSuccessModal] = useState<boolean>(false);
  const [reviewSubmitted, setReviewSubmitted] = useState<Status | null>(null);

  const approveColleagues = updateReviewStatus(Status.APPROVED)(reviewType);
  const declineColleagues = updateReviewStatus(Status.DECLINED)(reviewType);

  const handleDeclineBtnClick = () => {
    setIsOpenDeclinePopup(true);
  };

  const handleApproveSubmit = (event) => {
    approveColleagues(event);
    setIsOpenApprovePopup(false);
    setReviewSubmitted(Status.APPROVED);
    setIsOpenSuccessModal(true);
  };

  const handleDeclineSubmit = (hasReason = false, reason?: string) => {
    declineColleagues(hasReason ? reason : '');
    setIsOpenDeclinePopup(false);
    setReviewSubmitted(Status.DECLINED);
    setIsOpenSuccessModal(true);
  };

  const handleCloseSuccessModal = () => {
    setReviewSubmitted(null);
    setIsOpenSuccessModal(false);
  };

  return (
    <div
      className={css({
        padding: '24px',
        display: 'flex',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        alignItems: 'center',
        gap: '16px',
      })}
    >
      <div
        className={css({
          fontSize: '16px',
          lineHeight: '20px',
          fontWeight: theme.font.weight.bold,
        })}
      >{`${t('approve_or_decline', 'Approve or decline')} ${title[reviewType]}`}</div>
      <div>
        <div className={css({ display: 'inline-block' })}>
          <Button
            isDisabled={isDisabled}
            styles={[
              {
                background: theme.colors.white,
                border: `1px solid ${theme.colors.tescoBlue}`,
                fontSize: '16px',
                lineHeight: '20px',
                fontWeight: theme.font.weight.bold,
                color: `${theme.colors.tescoBlue}`,
                margin: '0px 4px',
              },
              isDisabled ? { opacity: '0.4' } : {},
            ]}
            onPress={handleDeclineBtnClick}
          >
            <Icon graphic='decline' iconStyles={{ paddingRight: '8px' }} />
            <Trans i18nKey='decline'>Decline</Trans>
          </Button>
        </div>
        <div className={css({ display: 'inline-block' })}>
          <Button
            isDisabled={isDisabled}
            styles={[
              {
                background: `${theme.colors.tescoBlue}`,
                fontSize: '16px',
                lineHeight: '20px',
                fontWeight: theme.font.weight.bold,
                margin: '0px 4px 1px 4px',
              },
              isDisabled ? { opacity: '0.4' } : {},
            ]}
            onPress={() => setIsOpenApprovePopup(true)}
          >
            <Icon graphic='check' invertColors={true} iconStyles={{ paddingRight: '8px' }} />
            <Trans i18nKey='approve'>Approve</Trans>
          </Button>
        </div>
        {isOpenDeclinePopup && (
          <DeclineModal
            onSave={handleDeclineSubmit}
            onClose={() => setIsOpenDeclinePopup(false)}
            reviewType={reviewType}
          />
        )}
        {isOpenApprovePopup && (
          <ApproveModal onSave={handleApproveSubmit} onClose={() => setIsOpenApprovePopup(false)} />
        )}
        {isOpenSuccessModal && (
          <SuccessModal
            status={reviewSubmitted as Status.DECLINED | Status.APPROVED}
            review={reviewType as ReviewType}
            onClose={handleCloseSuccessModal}
          />
        )}
      </div>
    </div>
  );
};

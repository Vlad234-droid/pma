import React, { FC, useState } from 'react';
import { Button, useStyle, Rule } from '@pma/dex-wrapper';

import { Icon } from 'components/Icon';
import { Trans, useTranslation } from 'components/Translation/Translation';
import { getReviewTypeTitle } from 'features/general/Actions/utils';
import { ReviewType, Status } from 'config/enum';

import { ApproveModal, DeclineModal } from '../Modal';
import { useSuccessModalContext } from '../../context/successModalContext';

type Props = {
  reviewType: ReviewType;
  updateReviewStatus: (status: Status) => (reviewType: ReviewType) => (T) => void;
  isDisabled: boolean;
};

const Buttons: FC<Props> = ({ reviewType, updateReviewStatus, isDisabled }) => {
  const { css } = useStyle();
  const { t } = useTranslation();
  const [isOpenDeclinePopup, setIsOpenDeclinePopup] = useState(false);
  const [isOpenApprovePopup, setIsOpenApprovePopup] = useState(false);
  const title = getReviewTypeTitle(t);
  const { setOpened: setIsOpenSuccessModal, setReviewStatus, setReviewType } = useSuccessModalContext();

  const approveColleagues = updateReviewStatus(Status.APPROVED)(reviewType);
  const declineColleagues = updateReviewStatus(Status.DECLINED)(reviewType);

  const handleDeclineBtnClick = () => {
    setIsOpenDeclinePopup(true);
  };

  const handleApproveSubmit = (event) => {
    approveColleagues(event);
    setIsOpenApprovePopup(false);
    setReviewStatus(Status.APPROVED);
    setReviewType(reviewType);
    setIsOpenSuccessModal(true);
  };

  const handleDeclineSubmit = (hasReason = false, reason?: string) => {
    declineColleagues(hasReason ? reason : '');
    setIsOpenDeclinePopup(false);
    setReviewStatus(Status.DECLINED);
    setReviewType(reviewType);
    setIsOpenSuccessModal(true);
  };

  return (
    <div className={css(containerStyle)}>
      <div className={css(wrapperStyle)}>{`${t('approve_or_decline', 'Approve or decline')} ${title[reviewType]}`}</div>
      <div>
        <div className={css({ display: 'inline-block' })}>
          <Button
            isDisabled={isDisabled}
            styles={[defaultButtonStyle, isDisabled ? { opacity: '0.4' } : {}]}
            onPress={handleDeclineBtnClick}
          >
            <Icon graphic='cancel' iconStyles={{ paddingRight: '8px' }} />
            <Trans i18nKey='decline'>Decline</Trans>
          </Button>
        </div>
        <div className={css({ display: 'inline-block' })}>
          <Button
            isDisabled={isDisabled}
            styles={[inverseButtonStyle, isDisabled ? { opacity: '0.4' } : {}]}
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
      </div>
    </div>
  );
};

export default Buttons;

const containerStyle: Rule = {
  padding: '24px',
  display: 'flex',
  justifyContent: 'space-between',
  flexWrap: 'wrap',
  alignItems: 'center',
  gap: '16px',
};

const wrapperStyle: Rule = ({ theme }) => ({
  ...theme.font.fixed.f16,
  fontWeight: theme.font.weight.bold,
});

const defaultButtonStyle: Rule = ({ theme }) => ({
  background: theme.colors.white,
  border: `2px solid ${theme.colors.tescoBlue}`,
  ...theme.font.fixed.f16,
  fontWeight: theme.font.weight.bold,
  color: `${theme.colors.tescoBlue}`,
  margin: '0px 4px',
});

const inverseButtonStyle: Rule = ({ theme }) => ({
  background: `${theme.colors.tescoBlue}`,
  ...theme.font.fixed.f16,
  fontWeight: theme.font.weight.bold,
  margin: '0px 4px 1px 4px',
});

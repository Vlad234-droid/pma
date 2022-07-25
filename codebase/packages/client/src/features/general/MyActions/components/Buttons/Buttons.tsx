import React, { FC, useState } from 'react';
import { Button, Rule, useStyle } from '@pma/dex-wrapper';

import { Icon } from 'components/Icon';
import { Trans, useTranslation } from 'components/Translation/Translation';
import { ReviewType, Status } from 'config/enum';

import { ApproveModal, DeclineModal } from '../Modal';
import { useSuccessModalContext } from '../../context/successModalContext';
import { useTenant } from 'features/general/Permission';
import { Tenant } from 'utils';

type Props = {
  reviewType: ReviewType;
  onUpdate: (status: Status) => (reviewType: ReviewType) => (T) => void;
  isDisabled: boolean;
};

const TITLES: Record<string, [string, string]> = {
  [ReviewType.OBJECTIVE]: ['objectives', 'Objectives'],
  [ReviewType.MYR]: ['mid_year_review', 'Mid-year review'],
  [ReviewType.EYR]: ['year_end_review', 'Year-end review'],
};

const Buttons: FC<Props> = ({ reviewType, onUpdate, isDisabled }) => {
  const [isOpenDeclinePopup, setIsOpenDeclinePopup] = useState(false);
  const [isOpenApprovePopup, setIsOpenApprovePopup] = useState(false);
  const { css } = useStyle();
  const { t } = useTranslation();
  const tenant = useTenant();
  const { setOpened: setIsOpenSuccessModal, setReviewStatus, setReviewType } = useSuccessModalContext();

  const approveColleagues = onUpdate(Status.APPROVED)(reviewType);
  const declineColleagues = onUpdate(Status.DECLINED)(reviewType);

  const handleDeclineBtnClick = () => {
    setIsOpenDeclinePopup(true);
  };

  const handleApprove = (event) => {
    approveColleagues(event);
    setIsOpenApprovePopup(false);
    setReviewStatus(Status.APPROVED);
    setReviewType(reviewType);
    setIsOpenSuccessModal(true);
  };

  const handleDecline = (hasReason = false, reason?: string) => {
    declineColleagues(hasReason ? reason : '');
    setIsOpenDeclinePopup(false);
    setReviewStatus(Status.DECLINED);
    setReviewType(reviewType);
    setIsOpenSuccessModal(true);
  };

  return (
    <div className={css(containerStyle)}>
      <div className={css(wrapperStyle)}>
        {`${t(
          'approve_or_decline',
          tenant === Tenant.GENERAL ? 'Approve or decline' : 'Agree or request to amend the',
          { ns: tenant },
        )} ${t(...TITLES[reviewType])}`}
      </div>
      <div>
        <div className={css({ display: 'inline-block' })}>
          <Button
            isDisabled={isDisabled}
            styles={[defaultButtonStyle, isDisabled ? { opacity: '0.4' } : {}]}
            onPress={handleDeclineBtnClick}
          >
            <Icon graphic='cancel' iconStyles={{ paddingRight: '8px' }} />
            <Trans i18nKey='decline' ns={tenant}>
              Decline
            </Trans>
          </Button>
        </div>
        <div className={css({ display: 'inline-block' })}>
          <Button
            isDisabled={isDisabled}
            styles={[inverseButtonStyle, isDisabled ? { opacity: '0.4' } : {}]}
            onPress={() => setIsOpenApprovePopup(true)}
          >
            <Icon graphic='check' invertColors={true} iconStyles={{ paddingRight: '8px' }} />
            <Trans i18nKey='approve' ns={tenant}>
              Approve
            </Trans>
          </Button>
        </div>
        {isOpenDeclinePopup && (
          <DeclineModal onSave={handleDecline} onClose={() => setIsOpenDeclinePopup(false)} reviewType={reviewType} />
        )}
        {isOpenApprovePopup && <ApproveModal onSave={handleApprove} onClose={() => setIsOpenApprovePopup(false)} />}
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

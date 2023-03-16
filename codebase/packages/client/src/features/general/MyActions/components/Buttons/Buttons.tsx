import React, { FC, useState } from 'react';
import { Button, Rule, useStyle } from '@pma/dex-wrapper';

import { Icon } from 'components/Icon';
import { Trans, useTranslation } from 'components/Translation/Translation';
import { ReviewType, Status } from 'config/enum';

import { ApproveModal, DeclineModal } from '../Modal';
import { useTenant } from 'features/general/Permission';

type Props = {
  code: string;
  cycleUuid: string;
  status: Status;
  reviewType: ReviewType;
  tlPointUuid: string;
  onUpdate: (data: {
    prevStatus: Status;
    status: Status;
    tlUuid: string;
    code: string;
    cycleUuid: string;
    reviewType: ReviewType;
    reason?: string;
  }) => void;
  isDisabled: boolean;
};

const TITLES: Record<string, [string, string]> = {
  ['Q1']: ['priorities', 'Priorities'],
  ['Q2']: ['priorities', 'Priorities'],
  ['Q3']: ['priorities', 'Priorities'],
  ['Q4']: ['priorities', 'Priorities'],
  [ReviewType.QUARTER]: ['priorities', 'Priorities'],
  [ReviewType.OBJECTIVE]: ['objectives', 'Objectives'],
  [ReviewType.MYR]: ['mid_year_review', 'Mid-year review'],
  [ReviewType.EYR]: ['year_end_review', 'Year-end review'],
  // TODO: Add correct titles
  [ReviewType.CALIBRATION]: ['TODO: Change title', 'TODO: Change title'],
};

const statusMap: Record<Status.WAITING_FOR_APPROVAL | Status.WAITING_FOR_COMPLETION, (approve: boolean) => Status> = {
  [Status.WAITING_FOR_APPROVAL]: (approve) => (approve ? Status.APPROVED : Status.DECLINED),
  [Status.WAITING_FOR_COMPLETION]: (approve) => (approve ? Status.COMPLETED : Status.APPROVED),
};

const Buttons: FC<Props> = ({ code, cycleUuid, onUpdate, isDisabled, status, reviewType, tlPointUuid }) => {
  const [isOpenDeclinePopup, toggleOpenDeclinePopup] = useState(false);
  const [isOpenApprovePopup, toggleOpenApprovePopup] = useState(false);
  const { css } = useStyle();
  const { t } = useTranslation();
  const tenant = useTenant();

  const declineColleagues = (reason?: string) => {
    onUpdate({
      prevStatus: status,
      status: statusMap[status](false),
      tlUuid: tlPointUuid,
      code,
      cycleUuid,
      reviewType,
      reason,
    });
  };

  const approveColleagues = () => {
    onUpdate({
      prevStatus: status,
      status: statusMap[status](true),
      tlUuid: tlPointUuid,
      code,
      cycleUuid,
      reviewType,
    });
  };

  const handleDeclineBtnClick = () => {
    toggleOpenDeclinePopup(true);
  };

  const handleApprove = () => {
    approveColleagues();
    toggleOpenApprovePopup(false);
  };

  const handleDecline = (hasReason = false, reason?: string) => {
    declineColleagues(hasReason ? reason : '');
    toggleOpenDeclinePopup(false);
  };

  return (
    <div className={css(containerStyle)}>
      <div className={css(wrapperStyle)}>
        {Status.WAITING_FOR_APPROVAL === status
          ? `${t('approve_or_decline', { ns: tenant })} ${TITLES?.[code] ? t(...TITLES[code]) : code}`
          : `${t('complete_or_request_amend')} ${TITLES?.[code] ? t(...TITLES[code]) : code}`}
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
            onPress={() => toggleOpenApprovePopup(true)}
          >
            <Icon graphic='check' invertColors={true} iconStyles={{ paddingRight: '8px' }} />
            {Status.WAITING_FOR_APPROVAL === status ? (
              <Trans i18nKey='approve' ns={tenant}>
                Approve
              </Trans>
            ) : (
              <Trans i18nKey='complete'>Complete</Trans>
            )}
          </Button>
        </div>
        {isOpenDeclinePopup && (
          <DeclineModal onSave={handleDecline} onClose={() => toggleOpenDeclinePopup(false)} code={code} />
        )}
        {isOpenApprovePopup && (
          <ApproveModal
            approveKey={Status.WAITING_FOR_APPROVAL === status ? 'approve' : 'complete'}
            onSave={handleApprove}
            onClose={() => toggleOpenApprovePopup(false)}
          />
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

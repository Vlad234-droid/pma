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
  onUpdate: (prevStatus: Status, status: Status) => (code: string, cycleUuid: string) => (T) => void;
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
};

const statusMap: Record<Status.WAITING_FOR_APPROVAL | Status.WAITING_FOR_COMPLETION, (approve: boolean) => Status> = {
  [Status.WAITING_FOR_APPROVAL]: (approve) => (approve ? Status.APPROVED : Status.DECLINED),
  [Status.WAITING_FOR_COMPLETION]: (approve) => (approve ? Status.COMPLETED : Status.APPROVED),
};

const Buttons: FC<Props> = ({ code, cycleUuid, onUpdate, isDisabled, status }) => {
  const [isOpenDeclinePopup, setIsOpenDeclinePopup] = useState(false);
  const [isOpenApprovePopup, setIsOpenApprovePopup] = useState(false);
  const { css } = useStyle();
  const { t } = useTranslation();
  const tenant = useTenant();

  const approveColleagues = onUpdate(status, statusMap[status](true))(code, cycleUuid);
  const declineColleagues = onUpdate(status, statusMap[status](false))(code, cycleUuid);

  const handleDeclineBtnClick = () => {
    setIsOpenDeclinePopup(true);
  };

  const handleApprove = (event) => {
    approveColleagues(event);
    setIsOpenApprovePopup(false);
  };

  const handleDecline = (hasReason = false, reason?: string) => {
    declineColleagues(hasReason ? reason : '');
    setIsOpenDeclinePopup(false);
  };

  return (
    <div className={css(containerStyle)}>
      <div className={css(wrapperStyle)}>
        {Status.WAITING_FOR_APPROVAL === status
          ? `${t('approve_or_decline', { ns: tenant })} ${t(...TITLES[code])}`
          : `${t('complete_or_request_amend')} ${t(...TITLES[code])}`}
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
          <DeclineModal onSave={handleDecline} onClose={() => setIsOpenDeclinePopup(false)} code={code} />
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

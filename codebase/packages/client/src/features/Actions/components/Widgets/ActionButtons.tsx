import React, { FC, useState } from 'react';
import { Button, fontWeight, useStyle } from '@dex-ddl/core';

import { Icon } from 'components/Icon';
import { Trans, useTranslation } from 'components/Translation';
import { ReviewType } from 'config/enum';

import ApproveModal from '../ApproveModal';
import DeclineModal from '../DeclineModal';
import { getReviewTypeTitle } from '../../utils';

type ActionButtonsProps = {
  approveColleagues: (T) => void;
  declineColleagues: (T) => void;
  reviewType: ReviewType;
};

export const ActionButtons: FC<ActionButtonsProps> = ({ approveColleagues, declineColleagues, reviewType }) => {
  const { css, theme } = useStyle();
  const { t } = useTranslation();
  const [isOpenDeclinePopup, setIsOpenDeclinePopup] = useState(false);
  const [isOpenApprovePopup, setIsOpenApprovePopup] = useState(false);
  const title = getReviewTypeTitle(t);

  const handleDeclineBtnClick = () => {
    setIsOpenDeclinePopup(true);
  };

  const handleApproveSubmit = (event) => {
    approveColleagues(event);
    setIsOpenApprovePopup(false);
  };

  const handleDeclineSubmit = (hasReason = false, reason?: string) => {
    declineColleagues(hasReason ? reason: '');
    setIsOpenDeclinePopup(false);
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
          fontWeight: fontWeight.bold,
        })}
      >{`${t('approve_or_decline', 'Approve or decline')} ${title[reviewType]}`}</div>
      <div>
        <div className={css({ display: 'inline-block' })}>
          <Button
            styles={[
              {
                background: theme.colors.white,
                border: `1px solid ${theme.colors.tescoBlue}`,
                fontSize: '16px',
                lineHeight: '20px',
                fontWeight: fontWeight.bold,
                color: `${theme.colors.tescoBlue}`,
                margin: '0px 4px',
              },
            ]}
            onPress={handleDeclineBtnClick}
          >
            <Icon graphic='decline' iconStyles={{ paddingRight: '8px' }} />
            <Trans i18nKey='decline'>Decline</Trans>
          </Button>
        </div>
        <div className={css({ display: 'inline-block' })}>
          <Button
            styles={[
              {
                background: `${theme.colors.tescoBlue}`,
                fontSize: '16px',
                lineHeight: '20px',
                fontWeight: fontWeight.bold,
                margin: '0px 4px 1px 4px',
              },
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
      </div>
    </div>
  );
};

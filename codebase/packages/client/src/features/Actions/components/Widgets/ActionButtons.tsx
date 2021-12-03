import React, { useState, FC } from 'react';
import { Button, fontWeight, useStyle } from '@dex-ddl/core';
import { Icon } from 'components/Icon';
import { Trans } from 'components/Translation';
import ConfirmModal from './Modal/ConfirmModal';

type ActionButtonsProps = {
  approveColleagues: (T) => void;
  declineColleagues: (T) => void;
};
export const ActionButtons: FC<ActionButtonsProps> = ({ approveColleagues, declineColleagues }) => {
  const { css, theme } = useStyle();
  const [isOpenDeclinePopup, setIsOpenDeclinePopup] = useState(false);
  const [isOpenApprovePopup, setIsOpenApprovePopup] = useState(false);

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
      >
        Approve or decline objectives
      </div>
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
            onPress={() => setIsOpenDeclinePopup(true)}
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
          <ConfirmModal
            title={'Please provide decline reason'}
            hasReason={true}
            onSave={declineColleagues}
            onClose={() => setIsOpenDeclinePopup(false)}
            onOverlayClick={() => setIsOpenDeclinePopup(false)}
          />
        )}
        {isOpenApprovePopup && (
          <ConfirmModal
            title={'Submit objectives or reviews'}
            description={'Are you sure you want to submit objectives or reviews to your manager?'}
            hasReason={false}
            onSave={approveColleagues}
            onClose={() => setIsOpenApprovePopup(false)}
            onOverlayClick={() => setIsOpenApprovePopup(false)}
          />
        )}
      </div>
    </div>
  );
};

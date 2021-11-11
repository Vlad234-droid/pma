import React, { FC, useState } from 'react';
import { Button, fontWeight, useStyle } from '@dex-ddl/core';
import { TileWrapper } from 'components/Tile';
import { Icon } from 'components/Icon';
import ConfirmDeclineModal from './Modal/ConfirmDeclineModal';
import { Trans } from 'components/Translation';
import { ObjectiveActions } from '@pma/store';
import useDispatch from 'hooks/useDispatch';
import { Status } from 'config/enum';
import { PayloadActionCreator } from 'typesafe-actions';

export type WidgetObjectiveApprovalProps = {
  isDisabled?: boolean;
  canDecline?: boolean;
  reviewsForApproval: any[];
};

type UpdateReviews = (method: PayloadActionCreator<any, any>, reason?: string) => void;

export const WidgetObjectiveApproval: FC<WidgetObjectiveApprovalProps> = ({
  isDisabled = false,
  canDecline = false,
  reviewsForApproval,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const { css, theme } = useStyle();
  const dispatch = useDispatch();

  const updateReviews: UpdateReviews = (method, reason) => {
    reviewsForApproval.forEach((colleague) => {
      dispatch(
        method({
          ...(reason ? { reason } : {}),
          colleagueUuid: colleague.uuid,
          reviews: colleague.reviews.filter(({ status }) => status === Status.WAITING_FOR_APPROVAL),
        }),
      );
    });
  };
  const approveColleagues = () => updateReviews(ObjectiveActions.approveObjective);
  const declineColleagues = (reason) => {
    updateReviews(ObjectiveActions.declineObjective, reason);
    setIsOpen(false);
  };
  return (
    <>
      <TileWrapper>
        <div className={css({ textAlign: 'center', padding: '24px' }, isDisabled ? { opacity: '0.4' } : {})}>
          <div
            className={css({
              display: 'block',
              fontSize: '20px',
              lineHeight: '24px',
              paddingBottom: '10px',
              fontWeight: fontWeight.bold,
            })}
          >
            Approve or decline colleague’s objectives
          </div>
          <div
            className={css({
              justifyContent: 'center',
              display: 'flex',
            })}
          >
            <div className={css({ display: 'inline-block' })}>
              <Button
                isDisabled={!canDecline}
                styles={[
                  {
                    background: theme.colors.white,
                    border: `1px solid ${theme.colors.tescoBlue}`,
                    fontSize: '16px',
                    lineHeight: '20px',
                    fontWeight: 'bold',
                    color: `${theme.colors.tescoBlue}`,
                    margin: '0px 4px',
                  },
                  !canDecline ? { opacity: '0.6' } : {},
                ]}
                onPress={() => setIsOpen(true)}
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
                    fontWeight: 'bold',
                    margin: '0px 4px 1px 4px',
                  },
                ]}
                onPress={approveColleagues}
              >
                <Icon graphic='check' invertColors={true} iconStyles={{ paddingRight: '8px' }} />
                <Trans i18nKey='approve'>Approve</Trans>
              </Button>
            </div>
            {isOpen && (
              <ConfirmDeclineModal
                title={'Please provide decline reason'}
                onSave={declineColleagues}
                onCancel={() => setIsOpen(false)}
                onOverlayClick={() => setIsOpen(false)}
              />
            )}
          </div>
        </div>
      </TileWrapper>
    </>
  );
};

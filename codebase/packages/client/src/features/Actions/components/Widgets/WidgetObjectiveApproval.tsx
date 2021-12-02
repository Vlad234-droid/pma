import React, { FC, useState } from 'react';
import { Button, fontWeight, useStyle } from '@dex-ddl/core';
import { TileWrapper } from 'components/Tile';
import { Icon } from 'components/Icon';
import ConfirmDeclineModal from './Modal/ConfirmDeclineModal';
import { Trans } from 'components/Translation';
import { ReviewsActions } from '@pma/store';
import useDispatch from 'hooks/useDispatch';
import { Status } from 'config/enum';

export type WidgetObjectiveApprovalProps = {
  isDisabled?: boolean;
  canDecline?: boolean;
  reviewsForApproval: any[];
};

export const WidgetObjectiveApproval: FC<WidgetObjectiveApprovalProps> = ({
  isDisabled = false,
  canDecline = false,
  reviewsForApproval,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const { css, theme } = useStyle();
  const dispatch = useDispatch();

  const updateReviewStatus =
    (status: Status) =>
    ({ reason }: { reason?: string }) => {
      reviewsForApproval.forEach((colleague) => {
        const timelineApproved = colleague.timeline.filter((tl) => tl.status === Status.WAITING_FOR_APPROVAL);
        if (timelineApproved.length > 1) {
          console.log('colleague', colleague);
        } else {
          const [timeline] = timelineApproved;
          const update = {
            pathParams: { colleagueUuid: colleague.uuid, type: timeline.reviewType, cycleUuid: 'CURRENT', status },
            data: {
              ...(reason ? { reason } : {}),
              status,
              colleagueUuid: colleague.uuid,
              reviews: colleague.reviews.filter(
                ({ status, type }) => status === Status.WAITING_FOR_APPROVAL && type === timeline.reviewType,
              ),
            },
          };
          dispatch(ReviewsActions.updateReviewStatus(update));
        }
      });
    };
  const approveColleagues = updateReviewStatus(Status.APPROVED);
  const declineColleagues = updateReviewStatus(Status.DECLINED);

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
            Approve or decline colleague’s objectives or reviews
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
                onPress={() => approveColleagues({})}
              >
                <Icon graphic='check' invertColors={true} iconStyles={{ paddingRight: '8px' }} />
                <Trans i18nKey='approve'>Approve</Trans>
              </Button>
            </div>
            {isOpen && (
              <ConfirmDeclineModal
                title={'Please provide decline reason'}
                onSave={declineColleagues}
                onClose={() => setIsOpen(false)}
                onOverlayClick={() => setIsOpen(false)}
              />
            )}
          </div>
        </div>
      </TileWrapper>
    </>
  );
};

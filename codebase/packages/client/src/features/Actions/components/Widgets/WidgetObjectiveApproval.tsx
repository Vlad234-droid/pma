import React, { FC } from 'react';
import { Button, fontWeight, useStyle } from '@dex-ddl/core';
import { TileWrapper } from 'components/Tile';
import { Icon } from 'components/Icon';
import { Trans } from 'components/Translation';
import { ObjectiveActions } from '@pma/store';
import useDispatch from 'hooks/useDispatch';
import { Status } from 'config/enum';

export type WidgetObjectiveApprovalProps = {
  isDisabled?: boolean;
  reviewsForApproval: any[];
};

export const WidgetObjectiveApproval: FC<WidgetObjectiveApprovalProps> = ({
  isDisabled = false,
  reviewsForApproval,
}) => {
  const { css, theme } = useStyle();
  const dispatch = useDispatch();

  const updateReviews = (method) => {
    reviewsForApproval.forEach((colleague) => {
      dispatch(
        method({
          colleagueUuid: colleague.uuid,
          reviews: colleague.reviews.filter(({ status }) => status === Status.WAITING_FOR_APPROVAL),
        }),
      );
    });
  };
  const approveColleagues = () => updateReviews(ObjectiveActions.approveObjective);
  const declineColleagues = () => updateReviews(ObjectiveActions.declineObjective);
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
                isDisabled={isDisabled}
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
                ]}
                onPress={declineColleagues}
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
          </div>
        </div>
      </TileWrapper>
    </>
  );
};

import React, { FC } from 'react';
import { colors, fontWeight, useStyle } from '@dex-ddl/core';
import { TileWrapper } from 'components/Tile';

export type YourActionsProps = {
  colleaguesWithStatusDraftCount: number;
  waitingForApprovalCount: number;
};

export const YourActions: FC<YourActionsProps> = ({ colleaguesWithStatusDraftCount, waitingForApprovalCount }) => {
  const { css } = useStyle();

  return (
    <TileWrapper customStyle={{ minWidth: '350px' }}>
      <div className={css({ textAlign: 'center', padding: '24px' })}>
        <div
          className={css({
            display: 'block',
            fontSize: '20px',
            lineHeight: '24px',
            paddingBottom: '10px',
            fontWeight: fontWeight.bold,
          })}
        >
          Your actions
        </div>
        <div
          className={css({
            justifyContent: 'space-around',
            display: 'flex',
          })}
        >
          <div className={css({ display: 'inline-block' })}>
            <div
              className={css({
                fontSize: '28px',
                lineHeight: '32px',
                color: colors.pending,
                fontWeight: fontWeight.bold,
              })}
            >
              {waitingForApprovalCount}
            </div>
            <div className={css({ maxWidth: '128px', fontSize: '16px', lineHeight: '20px', color: colors.base })}>
              Your pending actions
            </div>
          </div>
          <div className={css({ display: 'inline-block' })}>
            <div
              className={css({ fontSize: '28px', lineHeight: '32px', color: colors.base, fontWeight: fontWeight.bold })}
            >
              {colleaguesWithStatusDraftCount}
            </div>
            <div className={css({ maxWidth: '128px', fontSize: '16px', lineHeight: '20px', color: colors.base })}>
              Your colleagues pending actions
            </div>
          </div>
        </div>
      </div>
    </TileWrapper>
  );
};

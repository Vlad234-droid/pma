import React, { FC } from 'react';
import { Trans } from 'components/Translation';
import { useStyle, colors, Rule, fontWeight } from '@dex-ddl/core';
import { TileWrapper } from 'components/Tile';
import { Icon } from 'components/Icon';

export type WidgetPendingProps = {
  count: number;
};

export const WidgetPending: FC<WidgetPendingProps> = ({ count = 0 }) => {
  const { css } = useStyle();

  if (!count) {
    return null;
  }

  return (
    <TileWrapper customStyle={{ background: colors.pending }}>
      <div className={css(wrapperStyle)}>
        <div className={css({ display: 'flex', alignItems: 'center' })}>
          <Icon graphic='roundClock' fill='#fff' iconStyles={{ minWidth: '40px', minHeight: '40px' }} />
        </div>
        <div className={css(headerBlockStyle)}>
          <span className={css(titleStyle)}>
            <Trans i18nKey='pending_actions'>Pending actions</Trans>
          </span>
          <span className={css(descriptionStyle)}>
            <Trans i18nKey='pending_actions_count' count={count}>
              You have {count} pending actions
            </Trans>
          </span>
        </div>
        <div className={css({ marginLeft: 'auto', display: 'flex', alignItems: 'center' })}>
          <span className={css(countPendingStyle)}>{count}</span>
        </div>
      </div>
    </TileWrapper>
  );
};

const wrapperStyle: Rule = {
  padding: '24px',
  display: 'flex',
};

const headerBlockStyle: Rule = {
  display: 'grid',
  padding: '0 20px',
  alignSelf: 'center',
};

const titleStyle: Rule = {
  fontStyle: 'normal',
  fontWeight: fontWeight.bold,
  fontSize: '18px',
  lineHeight: '22px',
  color: colors.white,
};

const descriptionStyle: Rule = {
  fontStyle: 'normal',
  fontWeight: 'normal',
  fontSize: '14px',
  lineHeight: '18px',
  color: colors.white,
};

const countPendingStyle: Rule = {
  background: colors.white,
  borderRadius: '50px',
  padding: '8px',
  color: colors.pending,
  minWidth: '80px',
  textAlign: 'center',
  fontSize: '20px',
  lineHeight: '24px',
  fontWeight: fontWeight.medium,
};

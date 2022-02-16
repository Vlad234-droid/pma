import React, { FC } from 'react';
import { useStyle, colors, Rule, fontWeight } from '@dex-ddl/core';

import { useTranslation } from 'components/Translation';
import { TileWrapper } from 'components/Tile';
import { Icon } from 'components/Icon';

export type Props = {
  count: number;
};

const PendingApprovals: FC<Props> = ({ count = 0 }) => {
  const { css, theme } = useStyle();
  const { t } = useTranslation();

  if (!count) {
    return null;
  }

  return (
    <TileWrapper customStyle={{ background: colors.pending }}>
      <div data-test-id='pending-approvals' className={css(wrapperStyles)}>
        <div className={css(iconWrapperStyles)}>
          <Icon graphic='roundClock' fill={theme.colors.white} iconStyles={iconStyles} />
        </div>
        <div className={css(headerBlockStyles)}>
          <span className={css(titleStyles)}>
            {t('pending_actions', 'Pending actions')}
          </span>
          <span className={css(descriptionStyle)}>
            {t('you_have_pending_actions', 'You have pending actions')}
          </span>
        </div>
        <div className={css(countWrapperStyles)}>
          <span className={css(countStyles)}>{count}</span>
        </div>
      </div>
    </TileWrapper>
  );
};

export default PendingApprovals;

const wrapperStyles: Rule = {
  padding: '24px',
  display: 'flex',
};

const iconWrapperStyles: Rule = {
  display: 'flex',
  alignItems: 'center',
};

const iconStyles: Rule = {
  minWidth: '40px',
  minHeight: '40px',
};

const headerBlockStyles: Rule = {
  display: 'grid',
  padding: '0 20px',
  alignSelf: 'center',
};

const titleStyles: Rule = ({ theme }) => ({
  fontStyle: 'normal',
  fontWeight: fontWeight.bold,
  fontSize: `${theme.font.fixed.f18.fontSize}`,
  lineHeight: `${theme.font.fixed.f18.lineHeight}`,
  color: colors.white,
});

const descriptionStyle: Rule = ({ theme }) => ({
  fontStyle: 'normal',
  fontWeight: 'normal',
  fontSize: `${theme.font.fixed.f14.fontSize}`,
  lineHeight: `${theme.font.fixed.f14.lineHeight}`,
  color: colors.white,
});

const countWrapperStyles: Rule = {
  marginLeft: 'auto',
  display: 'flex',
  alignItems: 'center',
};

const countStyles: Rule = ({ theme }) => ({
  background: colors.white,
  borderRadius: '50px',
  padding: '8px',
  color: colors.pending,
  minWidth: '80px',
  textAlign: 'center',
  fontSize: `${theme.font.fixed.f20.fontSize}`,
  lineHeight: `${theme.font.fixed.f20.lineHeight}`,
  fontWeight: fontWeight.medium,
});

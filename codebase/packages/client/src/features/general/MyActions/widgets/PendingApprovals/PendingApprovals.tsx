import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getEmployeesWithReviewStatuses } from '@pma/store';
import { useStyle, colors, Rule, fontWeight } from '@pma/dex-wrapper';

import { useTranslation } from 'components/Translation';
import { TileWrapper } from 'components/Tile';
import { Icon } from 'components/Icon';
import { buildPath } from 'features/general/Routes';
import { Page } from 'pages';
import { Status } from 'config/enum';

const PendingApprovals: FC = () => {
  const { css, theme } = useStyle();
  const { t } = useTranslation();
  const employee = useSelector((state) => getEmployeesWithReviewStatuses(state, Status.PENDING)) || [];

  const waitingCount = employee?.length;

  if (!waitingCount) {
    return null;
  }

  return (
    <Link to={buildPath(Page.MY_TEAM_ACTIONS)}>
      <TileWrapper customStyle={{ background: colors.pending }}>
        <div data-test-id='pending-approvals' className={css(wrapperStyles)}>
          <div className={css(iconWrapperStyles)}>
            <Icon graphic='roundClock' fill={theme.colors.white} iconStyles={iconStyles} />
          </div>
          <div className={css(headerStyles)}>
            <span className={css(titleStyles)}>{t('objectives_and_reviews', 'Objectives & Reviews')}</span>
            <span className={css(descriptionStyle)}>
              {t('you_have_pending_actions', 'You have pending actions', { count: waitingCount })}
            </span>
          </div>
          <div className={css(countWrapperStyles)}>
            <span className={css(countStyles)}>{waitingCount}</span>
          </div>
        </div>
      </TileWrapper>
    </Link>
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

const headerStyles: Rule = {
  display: 'grid',
  padding: '0 20px',
  alignSelf: 'center',
};

const titleStyles: Rule = ({ theme }) => ({
  fontStyle: 'normal',
  fontWeight: fontWeight.bold,
  fontSize: `${theme.font.fixed.f18.fontSize}`,
  lineHeight: `${theme.font.fixed.f18.lineHeight}`,
  letterSpacing: '0px',
  color: colors.white,
});

const descriptionStyle: Rule = ({ theme }) => ({
  fontStyle: 'normal',
  fontWeight: 'normal',
  fontSize: `${theme.font.fixed.f14.fontSize}`,
  lineHeight: `${theme.font.fixed.f14.lineHeight}`,
  letterSpacing: '0px',
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
  letterSpacing: '0px',
  fontWeight: fontWeight.medium,
});

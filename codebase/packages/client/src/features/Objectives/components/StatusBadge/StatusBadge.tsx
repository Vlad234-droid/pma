import React, { FC } from 'react';
import { useTranslation } from 'components/Translation';
import { Status } from 'config/enum';
import { Rule, useStyle, colors, CreateRule, Theme } from '@dex-ddl/core';

import { Icon, Graphics } from 'components/Icon';

export type StatusBadgeProps = {
  status: Status;
  styles: Rule;
};

const StatusBadge: FC<StatusBadgeProps> = ({ status, styles }) => {
  const { css, theme } = useStyle();
  const { t } = useTranslation();

  const isDraft = status === Status.DRAFT;
  const isPending = status === Status.PENDING || status === Status.WAITING_FOR_APPROVAL;
  const isApproved = status === Status.APPROVED;
  // todo do not forget find out what we use DECLINED or RETURNED
  const isDeclined = status === Status.DECLINED || status === Status.RETURNED;

  const getContent = (): [Graphics, string, string] => {
    switch (true) {
      case isApproved:
        return ['roundTick', t('approved', 'Approved'), colors.green];
      case isPending:
        return ['roundClock', t('waiting_for_approval', 'Waiting for approval'), colors.pending];
      case isDeclined:
        return ['roundAlert', t('declined', 'Declined'), colors.base];
      case isDraft:
      default:
        return ['roundPencil', t('draft', 'Draft'), colors.base];
    }
  };

  const [graphic, label, color] = getContent();
  return (
    <div className={css(wrapperStyles, styles)}>
      <Icon graphic={graphic} invertColors iconStyles={iconStyles} />
      <span className={css(labelStyles({ color, theme }))}>{label}</span>
    </div>
  );
};

const wrapperStyles: Rule = ({ theme }) => ({
  display: 'flex',
  padding: '8px 16px',
  background: theme.colors.white,
  borderRadius: '40px',
  alignItems: 'center',
});

const iconStyles: Rule = {
  marginRight: '10px',
  width: '24px',
  height: '24px',
  display: 'block',
};

const labelStyles: CreateRule<{ color: string, theme: Theme }> =
  ({ color, theme }) =>
  () => ({
    fontSize: `${theme.font.fixed.f14.fontSize}`,
    lineHeight: `${theme.font.fixed.f14.lineHeight}`,
    fontWeight: `${theme.font.weight.bold}`,
    display: 'block',
    color,
});

export default StatusBadge;

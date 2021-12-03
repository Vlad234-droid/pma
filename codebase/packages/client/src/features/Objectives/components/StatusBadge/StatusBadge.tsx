import React, { FC } from 'react';
import { useTranslation } from 'components/Translation';
import { Status } from 'config/enum';
import { Rule, useStyle, colors, CreateRule } from '@dex-ddl/core';

import { Icon, Graphics } from 'components/Icon';

export type StatusBadgeProps = {
  status: Status;
  styles: Rule;
};

const StatusBadge: FC<StatusBadgeProps> = ({ status, styles }) => {
  const { css } = useStyle();
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
        return ['roundAlert', t('decline', 'Decline'), colors.base];
      case isDraft:
      default:
        return ['roundPencil', t('draft', 'Draft'), colors.base];
    }
  };

  const [graphic, label, color] = getContent();
  return (
    <div className={css(wrapperStyles, styles)}>
      <Icon graphic={graphic} invertColors iconStyles={iconStyles} />
      <span className={css(labelStyles({ color }))}>{label}</span>
    </div>
  );
};

const wrapperStyles: Rule = ({ theme }) => ({
  display: 'flex',
  padding: '8px 16px',
  background: theme.colors.white,
  borderRadius: '40px',
});

const iconStyles: Rule = {
  marginRight: '10px',
};

const labelStyles: CreateRule<{ color: string }> =
  ({ color }) =>
  () => ({
    fontSize: '14px',
    lineHeight: '18px',
    fontWeight: 700,
    display: 'contents',
    color,
  });

export default StatusBadge;

import React, { FC } from 'react';
import { Status } from 'config/enum';
import { Rule, useStyle, colors, CreateRule } from '@dex-ddl/core';

import { Icon, Graphics } from 'components/Icon';

export type StatusBadgeProps = {
  status: Status;
  styles: Rule;
};

const StatusBadge: FC<StatusBadgeProps> = ({ status, styles }) => {
  const { css } = useStyle();

  const isDraft = status === Status.DRAFT;
  const isPending = status === Status.PENDING;
  const isApproved = status === Status.APPROVED;

  const getContent = (): [Graphics, string, string] => {
    switch (true) {
      case isDraft:
        return ['roundPencil', 'Draft', colors.base];
      case isApproved:
        return ['roundTick', 'Approved', colors.green];
      case isPending:
      default:
        return ['roundClock', 'Pending', colors.pending];
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

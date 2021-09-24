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
  const isPending = status === Status.PENDING;
  const isApproved = status === Status.APPROVED;

  const getContent = (): [Graphics, string] => {
    switch (true) {
      case isDraft:
        return ['roundPencil', t('draft', 'Draft')];
      case isApproved:
        return ['roundTick', t('approved', 'Approved')];
      case isPending:
      default:
        return ['roundClock', t('pending', 'Pending')];
    }
  };

  const [graphic, label] = getContent();

  return (
    <div className={css(wrapperStyles, styles)}>
      <Icon graphic={graphic} invertColors iconStyles={iconStyles} />
      <span className={css(labelStyles)}>{label}</span>
    </div>
  );
};

const wrapperStyles: Rule = ({ theme }) => ({
  display: 'flex',
  background: theme.colors.white,
  margin: '10px 0',
});

const iconStyles: Rule = {
  marginRight: '10px',
};

const labelStyles: Rule = ({ theme }) => ({
  fontSize: '14px',
  lineHeight: '18px',
  color: theme.colors.dustyGray,
  fontWeight: 'normal',
});

export default StatusBadge;

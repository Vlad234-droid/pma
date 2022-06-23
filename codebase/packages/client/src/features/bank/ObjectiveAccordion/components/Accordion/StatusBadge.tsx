import React, { FC } from 'react';
import { TFunction, useTranslation } from 'components/Translation';
import { Status } from 'config/enum';
import { Rule, useStyle, CreateRule, Theme } from '@pma/dex-wrapper';

import { Icon, Graphics } from 'components/Icon';

export type StatusBadgeProps = {
  status: Status;
  styles: Rule;
  text?: string;
};

const getContent = (theme: Theme, t: TFunction, status: Status): [Graphics, string, string] => {
  switch (status) {
    case Status.APPROVED:
      return ['roundTick', t('approved', 'Approved'), theme.colors.green];
    case Status.WAITING_FOR_APPROVAL:
      return ['roundClock', t('waiting_for_agreement', 'Waiting for agreement'), theme.colors.pending];
    case Status.DECLINED:
      return ['roundAlert', t('declined', 'Declined'), theme.colors.base];
    case Status.DRAFT:
    default:
      return ['roundPencil', t('draft', 'Draft'), theme.colors.base];
  }
};

const StatusBadge: FC<StatusBadgeProps> = ({ status, text, styles }) => {
  const { css, theme } = useStyle();
  const { t } = useTranslation();

  const [graphic, label, color] = getContent(theme, t, status);
  return (
    <div className={css(wrapperStyles, styles)}>
      <Icon graphic={graphic} invertColors iconStyles={iconStyles} title={label} />
      <span className={css(labelStyles({ color }))}>
        <div>{label}</div>
        {text && <div>{text}</div>}
      </span>
    </div>
  );
};

const wrapperStyles: Rule = {
  display: 'flex',
  padding: '8px 16px',
  alignItems: 'center',
};

const iconStyles: Rule = {
  marginRight: '10px',
  width: '16px',
  height: '16px',
  display: 'block',
};

const labelStyles: CreateRule<{ color: string }> =
  ({ color }) =>
  ({ theme }) => ({
    fontSize: `${theme.font.fixed.f14.fontSize}`,
    lineHeight: `${theme.font.fixed.f14.lineHeight}`,
    letterSpacing: '0px',
    fontWeight: `${theme.font.weight.bold}`,
    display: 'block',
    color,
  });

export default StatusBadge;

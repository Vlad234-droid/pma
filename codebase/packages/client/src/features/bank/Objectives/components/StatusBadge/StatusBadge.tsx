import React, { FC } from 'react';
import { TFunction, useTranslation } from 'components/Translation';
import { Status } from 'config/enum';
import { Rule, useStyle, CreateRule, Theme, Colors } from '@pma/dex-wrapper';

import { Icon, Graphics } from 'components/Icon';

export type StatusBadgeProps = {
  status: Status;
  styles: Rule;
  text?: string;
};

const getContent = (theme: Theme, t: TFunction, status: Status): [Graphics, string, Colors] => {
  switch (status) {
    case Status.COMPLETED:
      return ['roundTick', t('completed', 'Completed'), 'green'];
    case Status.APPROVED:
      return ['roundTick', t('agreed', 'Agreed'), 'green'];
    case Status.WAITING_FOR_APPROVAL:
      return ['roundClock', t('waiting_for_agreed', 'Waiting agreement'), 'pending'];
    case Status.WAITING_FOR_COMPLETION:
      return ['roundClock', t('waiting_for_completion', 'Waiting for completion'), 'pending'];
    case Status.DECLINED:
      return ['roundAlert', t('request_to_amend', 'Request to amend'), 'base'];
    case Status.OVERDUE:
      return ['roundAlert', t('declined', 'Overdue'), 'tescoRed'];
    case Status.DRAFT:
    default:
      return ['roundPencil', t('saved_as_draft', 'Saved as draft'), 'grayscale'];
  }
};

const StatusBadge: FC<StatusBadgeProps> = ({ status, text, styles }) => {
  const { css, theme } = useStyle();
  const { t } = useTranslation();

  const [graphic, label, color] = getContent(theme, t, status);
  return (
    <div className={css(wrapperStyles, styles)}>
      <Icon graphic={graphic} color={color} iconStyles={iconStyles} title={label} />
      <span className={css(labelStyles({ color }))}>
        <div>{label}</div>
        {text && <div>{text}</div>}
      </span>
    </div>
  );
};

const wrapperStyles: Rule = ({ theme }) => ({
  display: 'flex',
  padding: '8px 16px',
  alignItems: 'center',
  background: theme.colors.white,
  borderRadius: '40px',
});

const iconStyles: Rule = {
  marginRight: '10px',
  width: '16px',
  height: '16px',
  display: 'block',
};

const labelStyles: CreateRule<{ color: Colors }> =
  ({ color }) =>
  ({ theme }) => ({
    fontSize: `${theme.font.fixed.f14.fontSize}`,
    lineHeight: `${theme.font.fixed.f14.lineHeight}`,
    letterSpacing: '0px',
    fontWeight: `${theme.font.weight.bold}`,
    display: 'block',
    color: theme.colors[color],
  });

export default StatusBadge;

import React, { FC } from 'react';
import { CreateRule, useStyle } from '@pma/dex-wrapper';
import { PriorityElement } from './PriorityElement';
import { useTranslation } from 'components/Translation';
import { TimelineStatistics } from 'config/types';

type Props = {
  statistics: TimelineStatistics;
};

export const PriorityList: FC<Props> = ({ statistics }) => {
  const { css, matchMedia } = useStyle();
  const { t } = useTranslation();
  const mobileScreen = matchMedia({ xSmall: true, small: true }) || false;

  return (
    <div className={css(containerStyles({ mobileScreen }))}>
      <PriorityElement title={t('saved_as_draft', 'Saved as draft')} count={statistics.DRAFT?.count || '0'} />
      <PriorityElement
        title={t('waiting_agreement', 'Waiting agreement')}
        count={statistics.WAITING_FOR_APPROVAL?.count || '0'}
      />
      <PriorityElement title={t('requires_review', 'Requires review')} count={statistics.DECLINED?.count || '0'} />
      <PriorityElement title={t('agreed', 'Agreed')} count={statistics.APPROVED?.count || '0'} />
      <PriorityElement
        title={t('waiting_for_manager', 'Awaiting manager action')}
        count={statistics.WAITING_FOR_COMPLETION?.count || '0'}
      />
      <PriorityElement title={t('completed', 'Completed')} count={statistics.COMPLETED?.count || '0'} />
    </div>
  );
};

const containerStyles: CreateRule<{ mobileScreen: boolean }> =
  ({ mobileScreen }) =>
  ({ theme }) => ({
    display: 'grid',
    gridTemplateColumns: mobileScreen ? '1fr repeat(1, 2fr) 1fr' : '1fr repeat(4, 1fr) 1fr',
    textAlign: 'center',
    marginTop: '12px',
    color: theme.colors.base,
  });

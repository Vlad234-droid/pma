import React, { FC } from 'react';
import { CreateRule, useStyle } from '@pma/dex-wrapper';
import { PriorityElement } from './PriorityElement';
import { useTranslation } from 'components/Translation';

type Props = {
  statistics: Record<string, string>;
};

export const PriorityList: FC<Props> = ({ statistics }) => {
  //Amend to correct status
  const {
    DRAFT = '0',
    APPROVED = '0',
    COMPLETED = '0',
    REQUESTED_TO_AMEND = '0',
    WAITING_FOR_COMPLETION = '0',
    WAITING_FOR_APPROVAL = '0',
  } = statistics;
  const { css, matchMedia } = useStyle();
  const { t } = useTranslation();
  const mobileScreen = matchMedia({ xSmall: true, small: true }) || false;

  //TODO: Handle count
  return (
    <div className={css(containerStyles({ mobileScreen }))}>
      <PriorityElement title={t('saved_as_draft', 'Saved as draft')} count={DRAFT} />
      <PriorityElement title={t('waiting_agreement', 'Waiting agreement')} count={WAITING_FOR_APPROVAL} />
      <PriorityElement title={t('requires_review', 'Requires review')} count={REQUESTED_TO_AMEND} />
      <PriorityElement title={t('agreed', 'Agreed')} count={APPROVED} />
      <PriorityElement title={t('waiting_for_manager', 'Waiting for manager')} count={WAITING_FOR_COMPLETION} />
      <PriorityElement title={t('completed', 'Completed')} count={COMPLETED} />
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

import React, { FC } from 'react';
import { Rule, useStyle } from '@pma/dex-wrapper';
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
    DECLINED = '0',
    COMPLETED = '0',
    REQUESTED_TO_AMEND = '0',
    WAITING_FOR_COMPLETION = '0',
    WAITING_FOR_APPROVAL = '0',
  } = statistics;
  const { css } = useStyle();
  const { t } = useTranslation();

  //TODO: Handle count
  return (
    <div className={css(containerStyles)}>
      <PriorityElement
        title={t('save_as_draft', 'Save as Draft')}
        count={DRAFT}
        graphic='roundPencil'
        color='grayscale'
      />
      <PriorityElement
        title={t('waiting_agreement', 'Waiting agreement')}
        count={WAITING_FOR_APPROVAL}
        graphic='roundClock'
      />
      <PriorityElement
        title={t('requires_review', 'Requires review')}
        count={REQUESTED_TO_AMEND}
        graphic='roundAlert'
      />
      <PriorityElement title={t('agreed', 'Agreed')} count={APPROVED} graphic='roundTick' />
      <PriorityElement
        title={t('waiting_for_manager_agreement', 'Waiting for manager agreement')}
        count={WAITING_FOR_COMPLETION}
        graphic='roundClock'
      />
      <PriorityElement title={t('completed', 'Completed')} count={COMPLETED} graphic='roundTick' />
    </div>
  );
};

const containerStyles: Rule = ({ theme }) => ({
  color: theme.colors.base,
});

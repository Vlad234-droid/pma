import React, { FC } from 'react';
import { Rule, useStyle } from '@pma/dex-wrapper';
import { PriorityElement } from './PriorityElement';
import { useTranslation } from 'components/Translation';

export const PriorityList: FC = () => {
  const { css } = useStyle();
  const { t } = useTranslation();

  //TODO: Handle count
  return (
    <div className={css(containerStyles)}>
      <PriorityElement title={t('save_as_draft', 'Save as Draft')} count={0} graphic='roundPencil' color='grayscale' />
      <PriorityElement title={t('waiting_agreement', 'Waiting agreement')} count={0} graphic='roundClock' />
      <PriorityElement title={t('requires_review', 'Requires review')} count={0} graphic='roundAlert' />
      <PriorityElement title={t('agreed', 'Agreed')} count={0} graphic='roundTick' />
      <PriorityElement
        title={t('waiting_for_manager_agreement', 'Waiting for manager agreement')}
        count={0}
        graphic='roundClock'
      />
      <PriorityElement title={t('completed', 'Completed')} count={0} graphic='roundTick' />
    </div>
  );
};

const containerStyles: Rule = ({ theme }) => ({
  color: theme.colors.base,
});

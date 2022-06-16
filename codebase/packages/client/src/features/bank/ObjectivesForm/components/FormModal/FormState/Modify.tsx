import React, { FC } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { useStyle } from '@pma/dex-wrapper';
import { useTranslation } from 'components/Translation';
import { TriggerModal } from 'features/general/Modal';
import HelpTrigger from '../HelpTrigger';
import Components from '../Components';
import { Objective } from '../../../type';

type Props = {
  components: any[];
  currentNumber: number;
  objective: Objective;
  methods: UseFormReturn;
};

const Modify: FC<Props> = ({ components, objective, methods, currentNumber }) => {
  const { css, theme } = useStyle();
  const { t } = useTranslation();
  return (
    <>
      <div className={css({ padding: `0 0 ${theme.spacing.s5}`, display: 'flex' })}>
        <TriggerModal triggerComponent={<HelpTrigger />} title={t('completing_your_review', 'Completing your review')}>
          <HelpTrigger />
        </TriggerModal>
      </div>
      <div>STEP {currentNumber}</div>
      <Components components={components} objective={objective} methods={methods} readonly={false} />
    </>
  );
};

export default Modify;

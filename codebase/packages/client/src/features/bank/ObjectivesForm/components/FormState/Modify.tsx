import React, { FC } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { useStyle } from '@pma/dex-wrapper';
import { useTranslation } from 'components/Translation';
import { TriggerModal } from 'features/general/Modal';
import HelpTrigger from '../FormModal/HelpTrigger';
import Components from '../FormModal/Components';
import Stepper from '../Stepper/Stepper';
import { Objective } from '../../type';

type Props = {
  components: any[];
  currentNumber: number;
  objective: Objective;
  objectives: Objective[];
  methods: UseFormReturn;
};

const Modify: FC<Props> = ({ components, objective, objectives, methods, currentNumber }) => {
  const { css, theme } = useStyle();
  const { t } = useTranslation();
  const steps = objectives.map((objectives) =>
    t('objective_number', `Priority ${objectives.number}`, { ns: 'bank', number: objectives.number }),
  );
  const currentObjectiveIndex = objectives.findIndex((objective) => objective.number === currentNumber);
  if (!steps[currentObjectiveIndex]) {
    steps[steps.length] = t('objective_number', `Priority ${currentNumber}`, { ns: 'bank', number: currentNumber });
  }

  return (
    <>
      <Stepper steps={steps} step={currentNumber} />
      <div className={css({ padding: `${theme.spacing.s5} 0 ${theme.spacing.s5}`, display: 'flex' })}>
        <TriggerModal triggerComponent={<HelpTrigger />} title={t('completing_your_review', 'Completing your review')}>
          <HelpTrigger />
        </TriggerModal>
      </div>
      <Components components={components} objective={objective} methods={methods} readonly={false} />
    </>
  );
};

export default Modify;

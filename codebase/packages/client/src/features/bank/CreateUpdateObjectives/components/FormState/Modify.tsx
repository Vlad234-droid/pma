import React, { FC } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { useStyle } from '@pma/dex-wrapper';
import { useTranslation } from 'components/Translation';
import { TriggerModal } from 'features/general/Modal';
import { HelpTrigger, HelperModal } from '../Helper';
import Stepper from '../Stepper/Stepper';
import { Objective } from '../../type';
import DynamicForm from '../../../../../components/DynamicForm';

type Props = {
  components: any[];
  currentNumber: number;
  objective: Objective;
  objectives: Objective[];
  methods: UseFormReturn;
  withStepper?: boolean;
};

const Modify: FC<Props> = ({ components, objective, objectives, methods, currentNumber, withStepper = true }) => {
  const { css, theme } = useStyle();
  const { t } = useTranslation();
  const {
    getValues,
    setValue,
    formState: { errors },
  } = methods;
  const steps = objectives.map((objectives) =>
    t('objective_number', `Priority ${objectives.number}`, { ns: 'bank', number: objectives.number }),
  );
  const currentObjectiveIndex = objectives.findIndex((objective) => objective.number === currentNumber);
  if (!steps[currentObjectiveIndex]) {
    steps[steps.length] = t('objective_number', `Priority ${currentNumber}`, { ns: 'bank', number: currentNumber });
  }

  return (
    <>
      {withStepper && <Stepper steps={steps} step={currentNumber} />}
      <div className={css({ padding: `${theme.spacing.s5} 0 ${theme.spacing.s5}`, display: 'flex' })}>
        <TriggerModal triggerComponent={<HelpTrigger />} title={t('completing_your_review', 'Completing your review')}>
          <HelperModal />
        </TriggerModal>
      </div>
      <DynamicForm components={components} errors={errors} formValues={objective} setValue={setValue} />
    </>
  );
};

export default Modify;

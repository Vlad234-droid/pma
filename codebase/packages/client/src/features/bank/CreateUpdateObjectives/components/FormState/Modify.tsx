import React, { FC } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { useStyle } from '@pma/dex-wrapper';

import { useTranslation } from 'components/Translation';
import DynamicForm from 'components/DynamicForm';
import { TriggerModal } from 'features/general/Modal';

import { HelpTrigger, HelperModal } from '../Helper';
import Stepper from '../Stepper/Stepper';
import { FormValues } from '../../type';
import { useTimelineContainer } from 'contexts/timelineContext';

type Props = {
  components: any[];
  defaultValues: FormValues;
  currentPriorityIndex: number;
  methods: UseFormReturn;
  withStepper?: boolean;
  onSelectStep?: (T) => void;
};

const Modify: FC<Props> = ({
  components,
  methods,
  defaultValues,
  currentPriorityIndex,
  withStepper = true,
  onSelectStep,
}) => {
  const { css, theme } = useStyle();
  const { t } = useTranslation();
  const {
    getValues,
    setValue,
    formState: { errors },
  } = methods;
  const formValues = getValues();
  const steps = defaultValues.data?.map((objective) => objective.number) || [];
  const {
    currentTimelines: { QUARTER },
  } = useTimelineContainer();
  const code = QUARTER?.code || '';

  return (
    <>
      {withStepper && <Stepper steps={steps} step={currentPriorityIndex} onSelectStep={onSelectStep} />}
      <div className={css({ padding: `${theme.spacing.s5} 0 ${theme.spacing.s5}`, display: 'flex' })}>
        <TriggerModal
          triggerComponent={<HelpTrigger />}
          title={t('create_priorities', `Create Priorities ${code}`, {
            code,
          })}
        >
          <HelperModal />
        </TriggerModal>
      </div>
      <DynamicForm
        components={components}
        errors={errors}
        formValues={formValues}
        setValue={setValue}
        prefixKey={`data.${currentPriorityIndex}.properties.`}
      />
    </>
  );
};

export default Modify;

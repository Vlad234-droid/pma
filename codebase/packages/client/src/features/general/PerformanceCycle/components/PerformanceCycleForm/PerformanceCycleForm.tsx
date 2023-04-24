import React, { FC, useEffect, useState } from 'react';
import { Rule, Styles, useStyle } from '@pma/dex-wrapper';
import { PerformanceCycleActions, ProcessTemplateActions, processTemplateByUuidSelector } from '@pma/store';
import { useSelector } from 'react-redux';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import FormPreview from 'features/general/FormViwer';
import { useTranslation } from 'components/Translation';
import GeneralSettings from '../GeneralSettings';
import CycleDetails from '../CycleDetails';
import Header from '../Header';

import { useFormWithCloseProtection } from 'hooks/useFormWithCloseProtection';
import { usePerformanceStepperContext } from '../../context';
import { createPMCycleSchema } from '../../configs/schema';
import { FormType } from '../../constants/type';
import useDispatch from 'hooks/useDispatch';

export const PERFORMANCE_CYCLE_FORM = 'performance-cycle-form';

type Props = {
  onSubmit: (data: any) => void;
  defaultValues?: any;
  getConfigEntriesByUuid: (uuid: string) => void;
  canEdit?: boolean;
};

const PerformanceCycleForm: FC<Props> = ({ onSubmit, defaultValues, canEdit = true }) => {
  const dispatch = useDispatch();
  const { css } = useStyle();
  const { t } = useTranslation();
  const [formPreview, setFormPreview] = useState<null | { fileUuid: string; formUuid: string }>(null);

  const methods = useFormWithCloseProtection({
    mode: 'onChange',
    resolver: yupResolver<Yup.AnyObjectSchema>(createPMCycleSchema(t)),
    defaultValues,
  });

  const {
    getValues,
    setValue,
    watch,
    trigger,
    handleSubmit,
    formState: { errors, isValid },
  } = methods;

  const formValues = getValues();

  const { activeStepper } = usePerformanceStepperContext();

  const [template, forms = []] = watch(['template', 'forms']);

  const handleChangeTemplate = <T extends { uuid: string }>(template: T) => {
    setValue('template', template, { shouldValidate: true });
    dispatch(ProcessTemplateActions.getProcessTemplateMetadata({ fileUuid: template?.uuid }));
  };

  const templateDetails: any | undefined = useSelector(processTemplateByUuidSelector(template?.uuid));

  useEffect(() => {
    if (templateDetails?.cycle) {
      const { properties, timelinePoints, ...rest } = templateDetails.cycle;
      setValue('metadata.cycle', rest);
      setValue('metadata.cycle.properties', properties);
      setValue('metadata.cycle.timelinePoints', timelinePoints);
      setValue('forms', templateDetails.forms);
    }
  }, [templateDetails?.cycle]);

  useEffect(() => {
    dispatch(PerformanceCycleActions.getPerformanceCycleMappingKeys());
  }, []);

  return (
    <>
      <form className={css({ marginTop: '32px' })} autoComplete='off' data-test-id={PERFORMANCE_CYCLE_FORM}>
        <Header
          status={defaultValues?.status}
          trigger={trigger}
          canEdit={canEdit}
          isValidForm={isValid}
          isGeneralValid={formValues.name && formValues.entryConfigKey && formValues.template}
          onSubmit={() => {
            handleSubmit((data) => onSubmit({ ...data, mode: 'PUBLISH', status: defaultValues?.status }))();
          }}
          onDraft={() => {
            handleSubmit((data) => onSubmit({ ...data, mode: 'DRAFT', status: defaultValues?.status }))();
          }}
          data={[
            { text: t('general_settings', 'General settings'), type: FormType.GENERAL },
            { text: t('cycle_details', 'Cycle details'), type: FormType.DETAILS },
          ]}
        />
        {activeStepper === FormType.GENERAL ? (
          <GeneralSettings
            changeTemplate={handleChangeTemplate}
            formValues={formValues}
            setValue={setValue}
            canEdit={canEdit}
            errors={errors}
          />
        ) : (
          <>
            <div className={css(cycleDesc)}>
              <p className={css(nameTitle)}>{t(formValues?.entryConfigKey)}</p>
              <p className={css(fileNameTitle)}>
                {t('cycle', 'Cycle')}/{formValues?.template?.fileName}
              </p>
              <p>{formValues?.template?.description}</p>
            </div>
            <CycleDetails
              formValues={formValues}
              setValue={setValue}
              canEdit={canEdit}
              errors={errors}
              watch={watch}
              onOpenForm={(formUuid, fileUuid) => setFormPreview({ formUuid, fileUuid })}
            />
          </>
        )}
      </form>
      {formPreview && <FormPreview {...formPreview} forms={forms} onClose={() => setFormPreview(null)} />}
    </>
  );
};

const cycleDesc: Rule = (theme) =>
  ({
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
    marginTop: '16px',
    marginLeft: '31px',
    fontSize: theme.font.fixed.f16.fontSize,
    '& > p': {
      margin: '0px',
    },
  } as Styles);
const nameTitle: Rule = (theme) => ({
  fontSize: theme.font.fixed.f18.fontSize,
  color: theme.colors.base,
  fontWeight: theme.font.weight.bold,
});
const fileNameTitle: Rule = (theme) => ({
  color: theme.colors.tescoBlue,
});
export default PerformanceCycleForm;

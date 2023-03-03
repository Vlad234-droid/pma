import React, { FC, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { Rule, useStyle } from '@pma/dex-wrapper';
import { reviewsMetaSelector } from '@pma/store';

import { createYupSchema } from 'utils/yup';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import { useTranslation } from 'components/Translation';
import SuccessModal from 'components/SuccessModal';
import Spinner from 'components/Spinner';
import { useFormWithCloseProtection } from 'hooks/useFormWithCloseProtection';

import { Status } from 'config/enum';

import { default as FormWrapper } from './FormWrapper';
import FormModify from '../FormState/Modify';
import FormPreview from '../FormState/Preview';
import { ButtonsModify } from '../ButtonsModify';
import { ButtonsPreview } from '../ButtonsPreview';
import { ButtonsModifySingleStep } from '../ButtonsModifySingleStep';
import { FormStateType } from '../../type';
import { FormPropsType, withForm } from '../../hoc/withForm';
import { withBasicData } from '../../hoc/withBasicData';
import { Props } from '../../CreateObjectives';

export type FormModal = FormPropsType & Props;

const FormModal: FC<FormModal> = ({
  formElements,
  useSingleStep,
  onClose,
  onSuccessClose,
  defaultValues,
  currentPriorityIndex,
  components,
  formState,
  setFormState,
  onSaveAsDraft,
  onSubmit,
  onPreview,
  onNext,
  onPrev,
  onSelectStep,
  lastStep,
}) => {
  const { t } = useTranslation();
  const { css, matchMedia } = useStyle();

  const { schema, propertiesSchema } = useMemo(() => {
    const propertiesSchema = Yup.object().shape(formElements.reduce(createYupSchema(t), {}));
    const schema = Yup.object().shape({
      data: Yup.array(
        Yup.object().shape({
          properties: propertiesSchema,
        }),
      ),
    });
    return { schema, propertiesSchema };
  }, []);

  const methods = useFormWithCloseProtection({
    mode: 'onChange',
    //@ts-ignore
    resolver: yupResolver(schema),
    defaultValues,
  });

  const {
    getValues,
    handleSubmit,
    formState: { isValid, isDirty },
  } = methods;
  const formValues = getValues();

  const currentValue = formValues.data?.[currentPriorityIndex] || {};
  const isCurrentValid = propertiesSchema.isValidSync(currentValue?.properties);
  const canModify = currentValue?.status
    ? [Status.DECLINED, Status.DRAFT, Status.APPROVED].includes(currentValue.status)
    : false;

  const {
    loading: reviewLoading,
    saving: reviewSaving,
    saved: reviewSaved,
    error: reviewError,
  } = useSelector(reviewsMetaSelector);

  const mobileScreen = matchMedia({ xSmall: true, small: true }) || false;
  const paddingBottom = useMemo(() => {
    if (formState === FormStateType.MODIFY) {
      return mobileScreen ? 138 : 90;
    }
    return 0;
  }, [formState, mobileScreen]);

  if (formState === FormStateType.SUBMITTED && reviewSaved && !reviewError) {
    return (
      <SuccessModal
        title={t('priorities_sent', 'Priorities sent')}
        onClose={onSuccessClose || onClose}
        description={t(
          'priorities_sent_to_your_line_manager',
          'You have submitted your priorities to your Manager for agreement',
        )}
      />
    );
  }

  return (
    <FormWrapper onClose={() => onPrev(isDirty)} paddingBottom={paddingBottom}>
      {reviewLoading || reviewSaving ? (
        <FormWrapper onClose={() => onPrev(isDirty)} paddingBottom={paddingBottom}>
          <Spinner fullHeight />
        </FormWrapper>
      ) : (
        <form data-test-id={'PRIORITY_FORM_MODAL'}>
          <div className={css(formFieldsWrapperStyle)}>
            {(() => {
              switch (formState) {
                case FormStateType.MODIFY:
                  return (
                    <>
                      <FormModify
                        methods={methods}
                        defaultValues={defaultValues}
                        components={components}
                        currentPriorityIndex={currentPriorityIndex}
                        onSelectStep={onSelectStep}
                      />
                      <ButtonsModify
                        onClose={onClose}
                        readonly={false}
                        isValid={isValid}
                        isStepValid={!lastStep && isCurrentValid}
                        onSaveExit={() => onSaveAsDraft(formValues)}
                        onSubmit={() => onPreview(formValues)}
                        onNext={() => onNext(formValues)}
                      />
                    </>
                  );
                case FormStateType.SINGLE_MODIFY:
                  return (
                    <>
                      {canModify ? (
                        <>
                          <FormModify
                            withStepper={!useSingleStep}
                            methods={methods}
                            defaultValues={defaultValues}
                            components={components}
                            currentPriorityIndex={currentPriorityIndex}
                          />
                          <ButtonsModifySingleStep
                            onSaveAndExit={() => onSaveAsDraft(formValues)}
                            isValid={canModify && isCurrentValid}
                            onSubmit={handleSubmit(onSubmit)}
                            status={currentValue.status}
                            onClose={onClose}
                          />
                        </>
                      ) : (
                        <div>{t('priority_not_editable', 'Can not modify or priority not exist')}</div>
                      )}
                    </>
                  );
                case FormStateType.PREVIEW:
                  return (
                    <>
                      <FormPreview formValues={formValues} components={components} />
                      <ButtonsPreview onSubmit={handleSubmit(onSubmit)} onBack={setFormState} />
                    </>
                  );
                default:
                  return <FormPreview formValues={formValues} components={components} />;
              }
            })()}
          </div>
        </form>
      )}
    </FormWrapper>
  );
};

const formFieldsWrapperStyle: Rule = ({ theme }) => ({ padding: `0 0 ${theme.spacing.s5}` });

export default withBasicData(withForm(FormModal));

import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import { Rule, useStyle } from '@pma/dex-wrapper';
import { reviewsMetaSelector, schemaMetaSelector } from '@pma/store';

import { createYupSchema } from 'utils/yup';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import { useTranslation } from 'components/Translation';
import SuccessModal from 'components/SuccessModal';
import Spinner from 'components/Spinner';
import { useFormWithCloseProtection } from 'hooks/useFormWithCloseProtection';

import { default as FormWrapper } from './FormWrapper';
import FormModify from '../FormState/Modify';
import FormPreview from '../FormState/Preview';
import ButtonsModify from '../Buttons/ButtonsModify';
import ButtonsPreview from '../Buttons/ButtonsPreview';

import { FormStateType } from '../../type';
import { FormPropsType, withForm } from '../../hoc/withForm';

export type FormModal = {
  onClose: () => void;
} & FormPropsType;

const FormModal: FC<FormModal> = ({
  onClose,
  defaultValues,
  objective,
  objectives,
  timelineCode,
  currentNumber,
  components,
  formState,
  onSaveAsDraft,
  onSubmit,
  onPreview,
  onNext,
  onBack,
}) => {
  const { t } = useTranslation();
  const { css, matchMedia } = useStyle();

  // @ts-ignore
  const yepSchema: Record<string, any> = components
    ?.filter((component) => component.type != 'text')
    ?.reduce(createYupSchema(t), {});
  const methods = useFormWithCloseProtection({
    mode: 'onChange',
    resolver: yupResolver<Yup.AnyObjectSchema>(Yup.object().shape(yepSchema)),
    defaultValues,
  });
  const {
    getValues,
    handleSubmit,
    setValue,
    formState: { isValid },
  } = methods;
  let paddingBottom = 0;

  const { loading: reviewLoading } = useSelector(reviewsMetaSelector);
  const { loading: schemaLoading } = useSelector(schemaMetaSelector);

  const mobileScreen = matchMedia({ xSmall: true, small: true }) || false;
  if (formState === FormStateType.MODIFY) {
    paddingBottom = mobileScreen ? 138 : 90;
  }

  if (formState === FormStateType.SUBMITTED) {
    return (
      <SuccessModal
        title={t('priorities_sent', 'Priorities sent')}
        onClose={onClose}
        description={t(
          'priorities_sent_to_your_line_manager',
          'You have submitted your priorities to your Manager for agreement',
        )}
      />
    );
  }

  if (reviewLoading && schemaLoading) {
    return (
      <FormWrapper onClose={onBack} paddingBottom={paddingBottom}>
        <Spinner fullHeight />
      </FormWrapper>
    );
  }

  return (
    <FormWrapper onClose={onBack} paddingBottom={paddingBottom}>
      <form data-test-id={'PRIORITY_FORM_MODAL'}>
        <div className={css(formFieldsWrapperStyle)}>
          {(() => {
            switch (formState) {
              case FormStateType.MODIFY:
                return (
                  <>
                    <FormModify
                      methods={methods}
                      objectives={objectives}
                      objective={objective}
                      components={components}
                      currentNumber={currentNumber}
                    />
                    <ButtonsModify
                      onClose={onClose}
                      readonly={false}
                      currentNumber={currentNumber}
                      timelineCode={timelineCode}
                      isValid={isValid}
                      onSaveExit={handleSubmit(onSaveAsDraft)}
                      onSubmit={handleSubmit(onPreview)}
                      onNext={handleSubmit(onNext)}
                    />
                  </>
                );
              case FormStateType.PREVIEW:
                return (
                  <>
                    <FormPreview methods={methods} objectives={objectives} components={components} />
                    <ButtonsPreview onSubmit={onSubmit} onBack={onBack} />
                  </>
                );
              default:
                return (
                  <FormModify
                    methods={methods}
                    objectives={objectives}
                    objective={objective}
                    components={components}
                    currentNumber={currentNumber}
                  />
                );
            }
          })()}
        </div>
      </form>
    </FormWrapper>
  );
};

const formFieldsWrapperStyle: Rule = ({ theme }) => ({ padding: `0 0 ${theme.spacing.s5}` });

export default withForm(FormModal);

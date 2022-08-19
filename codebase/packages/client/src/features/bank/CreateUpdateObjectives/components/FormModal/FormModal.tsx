import React, { FC } from 'react';
import { Rule, useStyle } from '@pma/dex-wrapper';

import { useTranslation } from 'components/Translation';
import SuccessModal from 'components/SuccessModal';

import { default as FormWrapper } from './FormWrapper';
import FormModify from '../FormState/Modify';
import FormPreview from '../FormState/Preview';
import ButtonsModify from '../Buttons/ButtonsModify';
import ButtonsPreview from '../Buttons/ButtonsPreview';

import { FormStateType } from '../../type';
import { FormPropsType, withForm } from '../../hoc/withForm';
import { useSelector } from 'react-redux';
import { reviewsMetaSelector, schemaMetaSelector } from '@pma/store';
import Spinner from 'components/Spinner';

export type FormModal = {
  onClose: () => void;
} & FormPropsType;

const FormModal: FC<FormModal> = ({
  onClose,
  objective,
  objectives,
  currentNumber,
  components,
  methods,
  formState,
  onSaveAsDraft,
  onSubmit,
  onPreview,
  onNext,
  onBack,
}) => {
  const { t } = useTranslation();
  const { css, matchMedia } = useStyle();
  const {
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
                      isValid={isValid}
                      onSaveExit={onSaveAsDraft}
                      onSubmit={onPreview}
                      onNext={onNext}
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

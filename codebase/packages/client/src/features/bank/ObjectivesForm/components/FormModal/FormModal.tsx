import React, { FC } from 'react';
import { Rule, useStyle } from '@pma/dex-wrapper';
import FormWrapper from './FormWrapper';
import Buttons from './Buttons';

import FormModify from './FormState/Modify';
import FormPreview from './FormState/Preview';
import { FormPropsType, withForm } from '../../hoc/withForm';
import { FormStateType } from '../../type';
import ButtonsModify from './Buttons/ButtonsModify';

export type FormModal = {
  onClose: () => void;
} & FormPropsType;

const FormModal: FC<FormModal> = ({
  onClose,
  objective,
  objectives,
  components,
  methods,
  formState,
  setFormState,
  handleSubmit,
  handlePreview,
}) => {
  const { css } = useStyle();

  return (
    <FormWrapper onClose={console.log}>
      <form data-test-id={'PRIORITY_FORM_MODAL'}>
        <div className={css(formFieldsWrapperStyle)}>
          {(() => {
            switch (formState) {
              case FormStateType.MODIFY:
                return (
                  <>
                    <FormModify methods={methods} objective={objective} components={components} />
                    <ButtonsModify
                      onClose={onClose}
                      readonly={false}
                      isValid={false}
                      onSaveAddObjective={console.log}
                      onSaveExit={console.log}
                      onSubmit={handlePreview}
                    />
                  </>
                );
              case FormStateType.PREVIEW:
                return (
                  <>
                    <FormPreview methods={methods} objectives={objectives} components={components} />
                    <ButtonsModify
                      onClose={onClose}
                      readonly={false}
                      isValid={false}
                      onSaveAddObjective={console.log}
                      onSaveExit={console.log}
                      onSubmit={handlePreview}
                    />
                  </>
                );
              default:
                return <FormModify methods={methods} objective={objective} components={components} />;
            }
          })()}
        </div>
      </form>
    </FormWrapper>
  );
};

const formFieldsWrapperStyle: Rule = ({ theme }) => ({ padding: `0 0 ${theme.spacing.s5}` });

export default withForm(FormModal);

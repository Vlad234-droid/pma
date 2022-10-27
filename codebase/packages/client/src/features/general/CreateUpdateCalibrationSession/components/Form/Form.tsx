import React, { FC } from 'react';
import { Input, Textarea, Item as FormItem, Field } from 'components/Form';
import Datepicker from 'components/Datepicker';
import { Rule, useStyle } from '@pma/dex-wrapper';

import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { Buttons } from '../Buttons';
import get from 'lodash.get';
import { useFormWithCloseProtection } from 'hooks/useFormWithCloseProtection';

import { createSchema } from '../../config';

type Props = {
  defaultValues: any;
  canEdit: boolean;
  onSubmit: (data: any) => void;
  onSaveAndExit: (data: any) => void;
};

const Form: FC<Props> = ({ defaultValues, canEdit, onSaveAndExit, onSubmit }) => {
  const { css } = useStyle();

  const methods = useFormWithCloseProtection({
    mode: 'onChange',
    resolver: yupResolver<Yup.AnyObjectSchema>(createSchema),
    defaultValues,
  });

  const {
    formState: { errors, isValid },
    getValues,
    setValue,
  } = methods;

  const formValues = getValues();

  return (
    <form data-test-id={'CALIBRATION_SESSION_FORM_MODAL'}>
      <div className={css(formContainerStyle)}>
        <Field
          name={'title'}
          Wrapper={FormItem}
          label={'**Calibration title**'}
          Element={Input}
          placeholder={'Add title here'}
          value={formValues.title}
          setValue={setValue}
          error={get(errors, 'title.message')}
          readonly={!canEdit}
        />
        <Field
          name={'startTime'}
          Wrapper={FormItem}
          label={'**Day**'}
          Element={Datepicker}
          placeholder={'DD/MM/YY'}
          value={formValues.startTime}
          setValue={setValue}
          error={get(errors, 'startTime.message')}
          readonly={!canEdit}
        />
        <Field
          name={'description'}
          Wrapper={FormItem}
          label={'**Add a comment**'}
          Element={Textarea}
          placeholder={'Add comments here'}
          value={formValues.description}
          setValue={setValue}
          error={get(errors, 'description.message')}
          readonly={!canEdit}
        />
        {canEdit && (
          <Buttons
            isValid={isValid}
            onSave={() => onSubmit(formValues)}
            onSaveDraft={() => onSaveAndExit(formValues)}
          />
        )}
      </div>
    </form>
  );
};

const formContainerStyle: Rule = {
  padding: '20px 0 20px 0',
};

export default Form;

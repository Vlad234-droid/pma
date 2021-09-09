import React, { RefObject, Fragment, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { AnyObjectSchema } from 'yup';
import { Button , useStyle, Rule } from '@dex-ddl/core';

import type { FormField, Handler } from './types';

type Props<T> = {
  formFields: FormField<keyof T>[];
  schema: AnyObjectSchema;
  onSubmit: Handler<T>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  refDom?: RefObject<any>;
  renderButtons?: (reset: () => void) => JSX.Element | null;
  renderContent?: () => JSX.Element | null;
  defaultValues?: Partial<T>;
};

const defaultRenderButtons = () => <Button type='submit'>submit</Button>;
const defaultRenderContent = () => null;

function GenericForm<T>({
  formFields,
  schema,
  onSubmit,
  renderButtons = defaultRenderButtons,
  renderContent = defaultRenderContent,
  refDom,
  defaultValues,
}: Props<T>) {
  const methods = useForm({
    mode: 'onChange',
    resolver: yupResolver(schema),
  });
  const { handleSubmit, errors, reset, register } = methods;
  const { css } = useStyle();

  useEffect(() => {
    if (defaultValues) {
      reset(defaultValues);
    }
  }, [defaultValues, reset]);

  const submit: Handler<T> = (data) => {
    onSubmit(data);
  };

  return (
    <form noValidate onSubmit={handleSubmit(submit)} ref={refDom} className={css(formStyles)}>
      {formFields.map(({ Element, testID, name, ...props }) => (
        <Fragment key={name}>
          <Element {...props} name={name} error={errors[name] && errors[name].message} id={testID} domRef={register} />
          <br />
        </Fragment>
      ))}
      {renderContent && renderContent()}
      {renderButtons && renderButtons(reset)}
    </form>
  );
}

const formStyles: Rule = {
  flexGrow: 1,
};

export default GenericForm;

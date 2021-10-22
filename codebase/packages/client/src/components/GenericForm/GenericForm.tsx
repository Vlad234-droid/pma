import React, { RefObject, Fragment, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { AnyObjectSchema } from 'yup';
import { Button, useStyle, Rule } from '@dex-ddl/core';

import { GenericItemField } from './GenericItemField';
import type { FormField, Handler } from './types';

type Props<T> = {
  formFields: FormField<keyof T>[];
  schema: AnyObjectSchema;
  onSubmit: Handler<T>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  refDom?: RefObject<any>;
  renderButtons?: (reset: () => void, isValid: boolean) => JSX.Element | null;
  renderContent?: () => JSX.Element | null;
  defaultValues?: Partial<T>;
};

const defaultRenderButtons = (isValid) => (
  <Button isDisabled={!isValid} type='submit'>
    submit
  </Button>
);
const defaultRenderContent = () => null;

function genericForm<T>({
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
  const {
    handleSubmit,
    formState: { isValid },
    reset,
  } = methods;
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
      {formFields.map(({ Element, Wrapper, testID, name, value, label, placeholder, ...props }) => (
        <Fragment key={name}>
          <GenericItemField
            {...props}
            name={name}
            methods={methods}
            placeholder={placeholder}
            label={label}
            Element={Element}
            Wrapper={Wrapper}
          />
        </Fragment>
      ))}
      {renderContent && renderContent()}
      {renderButtons && renderButtons(reset, isValid)}
    </form>
  );
}

const formStyles: Rule = {
  flexGrow: 1,
};

export default genericForm;

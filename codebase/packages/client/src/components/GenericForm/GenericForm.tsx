import React, { Fragment, RefObject, useRef } from 'react';
import { useForm, UseFormHandleSubmit } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { AnyObjectSchema } from 'yup';
import { Button, Rule, useStyle } from '@pma/dex-wrapper';
import get from 'lodash.get';
import { Field, Item } from 'components/Form';
import type { FormField, Handler } from './types';

type Props<T> = {
  formFields: FormField<keyof T>[];
  schema: AnyObjectSchema;
  onSubmit?: Handler<T>;
  refDom?: RefObject<any>;
  renderButtons?: (isValid: boolean, isDirty: boolean, handleSubmit: UseFormHandleSubmit<T>) => JSX.Element | null;
  renderContent?: () => JSX.Element | null;
  defaultValues?: Partial<T>;
  domRef?: RefObject<any> | null;
};

const defaultRenderButtons = (isValid) => (
  <Button isDisabled={!isValid} type='submit'>
    submit
  </Button>
);
const defaultRenderContent = () => null;

function GenericForm<T>({
  formFields,
  schema,
  onSubmit,
  renderButtons = defaultRenderButtons,
  renderContent = defaultRenderContent,
  defaultValues,
}: Props<T>) {
  const formRef = useRef<HTMLFormElement | null>(null);
  const methods = useForm({
    mode: 'onChange',
    reValidateMode: 'onChange',
    resolver: yupResolver(schema),
    // @ts-ignore
    defaultValues,
  });
  const {
    handleSubmit,
    formState: { isValid, errors, isDirty },
    register,
    getValues,
    setValue,
    trigger,
  } = methods;

  const { css } = useStyle();

  const values = getValues();

  return (
    <form noValidate onSubmit={onSubmit ? handleSubmit(onSubmit) : undefined} ref={formRef} className={css(formStyles)}>
      {formFields.map(({ Element, Wrapper = Item, name, label, placeholder, ...props }) => (
        <Fragment key={name}>
          <Field
            {...props}
            error={get(errors, `${name}.message`)}
            placeholder={placeholder}
            label={label}
            value={get(values, name)}
            Element={Element}
            Wrapper={Wrapper}
            setValue={setValue}
            trigger={trigger}
            // @ts-ignore
            {...register(name)}
          />
        </Fragment>
      ))}
      {renderContent && renderContent()}
      {renderButtons && renderButtons(isValid, isDirty, handleSubmit)}
    </form>
  );
}

const formStyles: Rule = ({ theme }) => {
  return {
    flexGrow: 1,
    fontSize: theme.font.fixed.f16.fontSize,
    lineHeight: theme.font.fixed.f16.lineHeight,
    letterSpacing: '0px',
  };
};

export default GenericForm;

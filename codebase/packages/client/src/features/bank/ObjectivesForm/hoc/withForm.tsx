import React, { Dispatch, SetStateAction, useState } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { Component } from '@pma/store';
import schema from './schema.json';
import { createYupSchema } from 'utils/yup';
import { useFormWithCloseProtection } from 'hooks/useFormWithCloseProtection';

import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useTranslation } from 'components/Translation';
import { FormStateType } from '../type';

export type FormPropsType = {
  components: Component[];
  objective: Record<string, string>;
  objectives: Record<string, string>[];
  methods: UseFormReturn;
  formState: FormStateType;
  setFormState: Dispatch<SetStateAction<FormStateType>>;
  handleSubmit: () => void;
  handlePreview: () => void;
};

export function withForm<P>(WrappedComponent: React.ComponentType<P & FormPropsType>) {
  const Component = (props: P) => {
    const { t } = useTranslation();
    const formValues = {};
    const { components = [] as Component[] } = schema;
    const [formState, setFormState] = useState<FormStateType>(FormStateType.MODIFY);

    // @ts-ignore
    const yepSchema = components?.reduce(createYupSchema(t), {});
    const methods = useFormWithCloseProtection({
      mode: 'onChange',
      resolver: yupResolver<Yup.AnyObjectSchema>(Yup.object().shape(yepSchema)),
      defaultValues: formValues,
    });

    const handleSubmit = () => {
      // setFormState(FormStateType.PREVIEW);
    };
    const handlePreview = () => {
      setFormState(FormStateType.PREVIEW);
    };

    return (
      <WrappedComponent
        {...props}
        components={components}
        objective={{}}
        objectives={[]}
        methods={methods}
        formState={formState}
        setFormState={setFormState}
        handleSubmit={handleSubmit}
        handlePreview={handlePreview}
      />
    );
  };
  return Component;
}

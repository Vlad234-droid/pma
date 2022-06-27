import React, { FC } from 'react';
import { UseFormReturn } from 'react-hook-form';

import { useStyle } from '@pma/dex-wrapper';
import { FormType, Component } from '@pma/store';

import MarkdownRenderer from 'components/MarkdownRenderer';
import { Field, Input, Item, Select, Textarea } from 'components/Form';
import { useTranslation } from 'components/Translation';

type Props = {
  methods: UseFormReturn;
  components: Component[];
  review: Record<string, string>;
};

const ObjectiveComponents: FC<Props> = ({ components, review, methods }) => {
  const { css } = useStyle();
  const { t } = useTranslation();
  const { formState } = methods;
  return (
    <>
      {components.map((component) => {
        const { id, key = '', label = '', text = '', description, type, validate, values = [] } = component;
        const value = review[key] ? review[key] : '';

        if (type === FormType.TEXT) {
          return (
            <div style={{ padding: '10px 0' }} key={id}>
              <div className={css({ fontSize: '16px', lineHeight: '20px' })}>
                <MarkdownRenderer source={text} />
              </div>
            </div>
          );
        }
        if (type === FormType.TEXT_FIELD && validate?.maxLength <= 100) {
          return (
            <Field
              key={key}
              name={key}
              label={label}
              Element={Input}
              Wrapper={Item}
              setValue={methods.setValue}
              setError={methods.setError}
              value={value}
              error={formState.errors[key]?.message}
              placeholder={description}
            />
          );
        }
        if (type === FormType.TEXT_FIELD && validate?.maxLength > 100) {
          return (
            <Field
              key={key}
              name={key}
              label={label}
              Element={Textarea}
              Wrapper={Item}
              setValue={methods.setValue}
              setError={methods.setError}
              value={value}
              error={formState.errors[key]?.message}
              placeholder={description}
            />
          );
        }
        if (type === FormType.SELECT) {
          return (
            <Field
              key={key}
              name={key}
              label={label}
              Element={Select}
              Wrapper={({ children, label }) => (
                <Item withIcon={false} label={label}>
                  {children}
                </Item>
              )}
              setValue={methods.setValue}
              setError={methods.setError}
              value={value}
              error={formState.errors[key]?.message}
              placeholder={description || t('please_select', 'Please select')}
              options={values}
            />
          );
        }
      })}
    </>
  );
};

export default ObjectiveComponents;

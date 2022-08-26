import React, { FC } from 'react';
import { FieldValues, UseFormSetValue } from 'react-hook-form';
import get from 'lodash.get';
import { useStyle } from '@pma/dex-wrapper';
import { FormType } from '@pma/store';

import MarkdownRenderer from 'components/MarkdownRenderer';
import { Input, Item, Select, Textarea, Field } from 'components/Form';
import { useTranslation } from 'components/Translation';

type Props = {
  setValue?: UseFormSetValue<FieldValues>;
  errors: any;
  components: any[];
  formValues: any;
  prefixKey?: string;
};

const DynamicForm: FC<Props> = ({ components, formValues, setValue, errors, prefixKey = '' }) => {
  const { css } = useStyle();
  const { t } = useTranslation();

  return (
    <>
      {components.map((component) => {
        const { id, key = '', label = '', text = '', description, type, validate, values = [] } = component;
        const value = get(formValues, `${prefixKey}${key}`);

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
              key={`${prefixKey}${key}`}
              name={`${prefixKey}${key}`}
              label={label}
              Element={Input}
              Wrapper={Item}
              setValue={setValue}
              value={value}
              error={errors?.[`${prefixKey}${key}`]?.message}
              placeholder={description}
            />
          );
        }
        if (type === FormType.TEXT_FIELD && validate?.maxLength > 100) {
          return (
            <Field
              key={`${prefixKey}${key}`}
              name={`${prefixKey}${key}`}
              label={label}
              Element={Textarea}
              Wrapper={Item}
              setValue={setValue}
              value={value}
              error={errors?.[`${prefixKey}${key}`]?.message}
              placeholder={description}
            />
          );
        }
        if (type === FormType.SELECT) {
          return (
            <Field
              key={`${prefixKey}${key}`}
              name={`${prefixKey}${key}`}
              label={label}
              Element={Select}
              Wrapper={({ children, label }) => (
                <Item withIcon={false} label={label}>
                  {children}
                </Item>
              )}
              setValue={setValue}
              value={value}
              error={errors?.[`${prefixKey}${key}`]?.message}
              placeholder={description || t('please_select', 'Please select')}
              options={values}
            />
          );
        }
      })}
    </>
  );
};

export default DynamicForm;

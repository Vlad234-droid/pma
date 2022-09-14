import React, { FC } from 'react';
import { FieldValues, UseFormSetValue } from 'react-hook-form';
import get from 'lodash.get';
import { Rule, Styles, useStyle } from '@pma/dex-wrapper';
import { FormType } from '@pma/store';

import MarkdownRenderer from 'components/MarkdownRenderer';
import { Input, Item, Select, Textarea, Field, Text } from 'components/Form';
import { useTranslation } from 'components/Translation';

type Props = {
  setValue?: UseFormSetValue<FieldValues>;
  errors: any;
  components: any[];
  formValues: any;
  prefixKey?: string;
  readonly?: boolean;
};

const DynamicForm: FC<Props> = ({ components, formValues, setValue, errors, prefixKey = '', readonly = '' }) => {
  const { css } = useStyle();
  const { t } = useTranslation();

  return (
    <>
      {components.map((component) => {
        const {
          id,
          key = '',
          label = '',
          text = '',
          description,
          type,
          validate,
          values = [],
          borderStyle = {},
        } = component;
        const value = get(formValues, `${prefixKey}${key}`);
        const error = get(errors, `${prefixKey}${key}.message`);

        if (type === FormType.TEXT) {
          return (
            <div className={css({ padding: 0, margin: 0 }, borderStyle)} key={id}>
              <div className={css({ fontSize: '16px', lineHeight: '20px' }, readonly ? markdownCustomStyle : {})}>
                <MarkdownRenderer source={text} />
              </div>
            </div>
          );
        }

        if (type === FormType.TEXT_FIELD && validate?.maxLength <= 100) {
          return (
            <div key={id} className={css(borderStyle, readonly ? componentCustomStyle : {})}>
              <Field
                key={`${prefixKey}${key}`}
                name={`${prefixKey}${key}`}
                label={label}
                Element={readonly ? Text : Input}
                Wrapper={Item}
                setValue={setValue}
                value={value}
                error={error}
                placeholder={description}
              />
            </div>
          );
        }
        if (type === FormType.TEXT_FIELD && validate?.maxLength > 100) {
          return (
            <div key={id} className={css(borderStyle, readonly ? componentCustomStyle : {})}>
              <Field
                key={`${prefixKey}${key}`}
                name={`${prefixKey}${key}`}
                label={label}
                Element={readonly ? Text : Textarea}
                Wrapper={Item}
                setValue={setValue}
                value={value}
                error={error}
                placeholder={description}
              />
            </div>
          );
        }
        if (type === FormType.SELECT) {
          return (
            <div key={id} className={css(borderStyle, readonly ? componentCustomStyle : {})}>
              <Field
                key={`${prefixKey}${key}`}
                name={`${prefixKey}${key}`}
                label={label}
                Element={readonly ? Text : Select}
                Wrapper={({ children, label }) => (
                  <Item withIcon={false} label={label}>
                    {children}
                  </Item>
                )}
                setValue={setValue}
                value={value}
                error={error}
                placeholder={description || t('please_select', 'Please select')}
                options={values}
              />
            </div>
          );
        }
      })}
    </>
  );
};

const markdownCustomStyle: Rule = ({ theme }) =>
  ({
    padding: 0,
    '& > p': {
      padding: '16px 0 8px 0',
      margin: 0,
      fontSize: theme.font.fixed.f16.fontSize,
      lineHeight: theme.font.fluid.f16.lineHeight,
      letterSpacing: '0px',
    },
    '& > h2': {
      padding: '14px 0 8px 0',
      margin: 0,
      fontSize: theme.font.fixed.f18.fontSize,
      lineHeight: theme.font.fluid.f18.lineHeight,
      letterSpacing: '0px',
    },
    '& > div': {
      marginBottom: 0,
    },
  } as Styles);

const componentCustomStyle: Rule = {
  '& > div': {
    marginBottom: 0,
  },
} as Styles;

export default DynamicForm;

import React, { FC } from 'react';
import { FieldValues, UseFormSetValue } from 'react-hook-form';
import get from 'lodash.get';
import { Rule, Styles, useStyle } from '@pma/dex-wrapper';
import { BorderedComponent, FormType, ExpressionType } from '@pma/store';

import MarkdownRenderer from 'components/MarkdownRenderer';
import { Input, Item, Select, Textarea, Field, Text, RadioGroup } from 'components/Form';
import { useTranslation } from 'components/Translation';
import { formTagComponents } from 'utils/schema';

type Props = {
  setValue?: UseFormSetValue<FieldValues>;
  errors: any;
  components: any[];
  formValues: any;
  prefixKey?: string;
  onlyView?: boolean;
};

const DynamicForm: FC<Props> = ({ components, formValues, setValue, errors, prefixKey = '', onlyView = false }) => {
  const { css, theme } = useStyle();
  const borderedComponents: BorderedComponent[] = formTagComponents(components, theme);
  const { t } = useTranslation();

  const dependentFilter = (component) => {
    const { expression = {} } = component;
    const [dependOnKey] =
      expression?.[ExpressionType.DEPENDENCY]?.[ExpressionType.DEPENDENT]?.[ExpressionType.KEY] || [];
    const [dependOnKeyValue] =
      expression?.[ExpressionType.DEPENDENCY]?.[ExpressionType.DEPENDENT]?.[ExpressionType.VALUE] || [];

    if (dependOnKey) {
      const dependedValue = get(formValues, `${prefixKey}${dependOnKey}`);
      return dependedValue && dependOnKeyValue.toString() === dependedValue.toString();
    }

    return true;
  };

  return (
    <>
      {borderedComponents.filter(dependentFilter).map((component) => {
        const {
          id,
          key = '',
          label = '',
          text = '',
          description,
          type,
          validate,
          values = [],
          expression = {},
          borderStyle = {},
        } = component;
        const value = get(formValues, `${prefixKey}${key}`);
        const error = get(errors, `${prefixKey}${key}.message`);

        const readonly = expression?.auth?.permission?.read?.length > 0;

        if (type === FormType.TEXT) {
          return (
            <div className={css({ padding: 0, margin: 0 }, borderStyle)} key={id}>
              <div
                className={css(
                  { fontSize: '16px', lineHeight: '20px' },
                  onlyView ? markdownCustomStyle : componentCustomStyle,
                )}
              >
                <MarkdownRenderer source={text} />
              </div>
            </div>
          );
        }

        if (type === FormType.TEXT_FIELD && validate?.maxLength <= 100) {
          return (
            <div key={id} className={css(borderStyle, onlyView ? componentCustomStyle : {})}>
              <Field
                key={`${prefixKey}${key}`}
                name={`${prefixKey}${key}`}
                label={label}
                Element={onlyView ? Text : Input}
                Wrapper={Item}
                setValue={setValue}
                value={value}
                error={error}
                placeholder={description}
                readonly={readonly}
              />
            </div>
          );
        }
        if (type === FormType.TEXT_FIELD && validate?.maxLength > 100) {
          return (
            <div key={id} className={css(borderStyle, onlyView ? componentCustomStyle : {})}>
              <Field
                key={`${prefixKey}${key}`}
                name={`${prefixKey}${key}`}
                label={label}
                Element={onlyView ? Text : Textarea}
                Wrapper={Item}
                setValue={setValue}
                value={value}
                error={error}
                placeholder={description}
                readonly={readonly}
              />
            </div>
          );
        }
        if (type === FormType.SELECT) {
          const viewValue = values.find((item) => item.value === value)?.label || value;

          return (
            <div key={id} className={css(borderStyle, onlyView ? componentCustomStyle : {})}>
              <Field
                key={`${prefixKey}${key}`}
                name={`${prefixKey}${key}`}
                label={label}
                Element={onlyView ? Text : Select}
                Wrapper={({ children, label }) => (
                  <Item withIcon={false} label={label}>
                    {children}
                  </Item>
                )}
                setValue={setValue}
                value={onlyView ? viewValue : value}
                error={error}
                placeholder={description || t('please_select', 'Please select')}
                options={values}
                readonly={readonly}
              />
            </div>
          );
        }
        if (type === FormType.RADIO) {
          const viewValue = values.find((item) => item.value === value)?.label || value;

          return (
            <div key={id} className={css(borderStyle, onlyView ? componentCustomStyle : {})}>
              <Field
                key={`${prefixKey}${key}`}
                name={`${prefixKey}${key}`}
                label={label}
                Element={onlyView ? Text : RadioGroup}
                Wrapper={({ children, label }) => (
                  <Item withIcon={false} label={label}>
                    {children}
                  </Item>
                )}
                setValue={setValue}
                value={onlyView ? viewValue : value}
                error={error}
                options={values}
                readonly={readonly}
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
  '& > p': {
    paddingBottom: '16px',
  },
} as Styles;

export default DynamicForm;

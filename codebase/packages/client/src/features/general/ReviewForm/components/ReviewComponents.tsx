import React, { FC } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { useStyle, Rule, Styles } from '@pma/dex-wrapper';
import { ExpressionValueType, FormType } from '@pma/store';
import MarkdownRenderer from 'components/MarkdownRenderer';
import { Field, Input, Item, Select, Text, Textarea } from 'components/Form';
import { formTagComponents } from '../utils';
import { BorderedComponent } from '../types';

type ReviewComponentsProps = {
  components: any[];
  review: Record<string, string>;
  methods: UseFormReturn;
  readonly: boolean;
};

// todo quick fix think about another way
const ItemWrapper = (props) => (
  <Item {...props} marginBot={false} labelCustomStyle={{ padding: '10px 0px 8px' }}>
    {props.children}
  </Item>
);

const ReviewComponents: FC<ReviewComponentsProps> = ({ components, review, methods, readonly }) => {
  const { css, theme } = useStyle();
  const borderedComponents: BorderedComponent[] = formTagComponents(components, theme);
  const { formState } = methods;

  return (
    <>
      {borderedComponents.map((component) => {
        const {
          id,
          key = '',
          text = '',
          label = '',
          description = '',
          type,
          validate = {},
          values = [],
          expression = {},
          borderStyle = {},
        } = component;
        const value = key && review[key] ? review[key] : '';

        const componentReadonly = expression?.auth?.permission?.read?.length ? true : readonly;

        // todo temporary solution. Do not have full permission requirements. might be wrapper around field
        // hide component if value empty for specific field which might be filled by manager
        const keyVisibleOnEmptyValue = ExpressionValueType.OVERALL_RATING;
        if (expression?.auth?.permission?.read?.length && !value && key !== keyVisibleOnEmptyValue) {
          return null;
        }
        // todo end temporary solution

        if (type === FormType.TEXT) {
          const CustomPTag = ({ children }) => {
            return <p className={css(defaultTagStyle)}>{children}</p>;
          };

          return (
            <div className={css({ padding: 0, margin: 0 }, borderStyle)} key={id}>
              <div className={css(markdownCustomStyle)}>
                <MarkdownRenderer components={{ p: CustomPTag }} source={text} />
              </div>
            </div>
          );
        }
        if (type === FormType.TEXT_FIELD) {
          return (
            <div key={id} className={css(borderStyle)}>
              <Field
                key={key}
                name={key}
                label={label}
                Element={readonly ? Text : validate?.maxLength > 100 ? Textarea : Input}
                Wrapper={ItemWrapper}
                setValue={methods.setValue}
                setError={methods.setError}
                value={value}
                error={formState.errors[key]?.message}
                placeholder={description}
                readonly={componentReadonly}
              />
            </div>
          );
        }
        if (type === FormType.SELECT) {
          return (
            <div key={id} className={css(borderStyle)}>
              <Field
                key={key}
                name={key}
                label={label}
                Element={readonly ? Text : Select}
                Wrapper={ItemWrapper}
                setValue={methods.setValue}
                setError={methods.setError}
                value={value}
                error={formState.errors[key]?.message}
                placeholder={description}
                options={values}
                readonly={componentReadonly}
              />
            </div>
          );
        }
      })}
    </>
  );
};

const defaultTagStyle: Rule = ({ theme }) => ({
  margin: '0px',
  padding: '0px',
  color: theme.colors.base,
  fontSize: theme.font.fixed.f18.fontSize,
  lineHeight: theme.font.fluid.f18.lineHeight,
  letterSpacing: '0px',
});

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
  } as Styles);

export default ReviewComponents;

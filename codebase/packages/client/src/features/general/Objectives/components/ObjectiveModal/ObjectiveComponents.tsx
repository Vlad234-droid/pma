import React, { FC } from 'react';
import { UseFormReturn } from 'react-hook-form';

import { useStyle } from '@pma/dex-wrapper';
import { FormType, Component } from '@pma/store';

import MarkdownRenderer from 'components/MarkdownRenderer';
import { GenericItemField } from 'components/GenericForm';
import { Input, Item, Select, Textarea } from 'components/Form';
import { useTranslation } from 'components/Translation';

type Props = {
  methods: UseFormReturn;
  components: Component[];
  review: Record<string, string>;
};

const ObjectiveComponents: FC<Props> = ({ components, review, methods }) => {
  const { css } = useStyle();
  const { t } = useTranslation();
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
            <GenericItemField
              key={id}
              name={key}
              methods={methods}
              label={label}
              Wrapper={Item}
              Element={Input}
              placeholder={description}
              value={value}
            />
          );
        }
        if (type === FormType.TEXT_FIELD && validate?.maxLength > 100) {
          return (
            <GenericItemField
              key={id}
              name={key}
              methods={methods}
              label={label}
              Wrapper={Item}
              Element={Textarea}
              placeholder={description}
              value={value}
            />
          );
        }
        if (type === FormType.SELECT) {
          return (
            <GenericItemField
              key={id}
              name={key}
              methods={methods}
              label={label}
              Wrapper={({ children, label }) => (
                <Item withIcon={false} label={label}>
                  {children}
                </Item>
              )}
              Element={Select}
              options={values}
              placeholder={description || t('please_select', 'Please select')}
              value={value}
            />
          );
        }
      })}
    </>
  );
};

export default ObjectiveComponents;

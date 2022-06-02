import React, { FC } from 'react';
import { UseFormReturn } from 'react-hook-form';

import { useStyle } from '@pma/dex-wrapper';

import MarkdownRenderer from 'components/MarkdownRenderer';
import { GenericItemField } from 'components/GenericForm';
import { Input, Item, Select, Textarea } from 'components/Form';
import { useTranslation } from 'components/Translation';

type Props = {
  methods: UseFormReturn;
  components: any[];
  review: Record<string, string>;
};

const ObjectiveComponents: FC<Props> = ({ components, review, methods }) => {
  const { css } = useStyle();
  const { t } = useTranslation();

  return (
    <>
      {components.map((component) => {
        const { type, key } = component;
        const value = key && review[key] ? review[key] : '';

        if (type === 'htmlelement') {
          const { tag: CustomTag = 'p' } = component;
          const Tag = ({ children }) => {
            return <CustomTag className={css({ margin: '16px 0px 8px' })}>{children}</CustomTag>;
          };

          return <MarkdownRenderer key={component.id} components={{ p: Tag }} source={component?.content} />;
        }
        if (type === 'textfield' && component.key) {
          return (
            <GenericItemField
              key={component.id}
              name={component.key}
              methods={methods}
              label={component?.label}
              Wrapper={Item}
              Element={Input}
              placeholder={component?.placeholder}
              value={value}
            />
          );
        }
        if (type === 'textarea' && component.key) {
          return (
            <GenericItemField
              key={component.id}
              name={component.key}
              methods={methods}
              label={component?.label}
              Wrapper={Item}
              Element={Textarea}
              placeholder={component?.placeholder}
              value={value}
            />
          );
        }
        if (type === 'select' && component.key) {
          return (
            <GenericItemField
              key={component.id}
              name={component.key}
              methods={methods}
              label={component?.label}
              Wrapper={({ children, label }) => (
                <Item withIcon={false} label={label}>
                  {children}
                </Item>
              )}
              Element={Select}
              options={component?.data?.values}
              placeholder={component?.placeholder || t('please_select', 'Please select')}
              value={value}
            />
          );
        }
      })}
    </>
  );
};

export default ObjectiveComponents;

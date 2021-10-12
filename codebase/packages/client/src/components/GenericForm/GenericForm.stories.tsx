import React from 'react';
import { Button } from '@dex-ddl/core';
import * as yup from 'yup';

import { Meta, Story } from '@storybook/react';

import GenericForm, { FormField } from './index';
import { Input, Textarea, Select, Item } from 'components/Form';

export default {
  title: 'components/GenericForm',
  component: GenericForm,
} as Meta;

type FormFields = {
  selectOption: string;
  firstName: string;
  lastName: string;
  test: string;
};

type Names = keyof FormFields;

const fields: Array<FormField<Names>> = [
  {
    Element: Select,
    Wrapper: ({ children, ...props }) => (
      <Item {...props} withIcon={false}>
        {children}
      </Item>
    ),
    name: 'selectOption',
    placeholder: 'Reason for change',
    testID: 'reason',
    label: 'Reason for change',
    options: [
      { value: 'id_1', label: 'I met this objective' },
      { value: 'id_2', label: 'I exceeded this objective' },
      { value: 'id_3', label: 'I did not meet this objective' },
    ],
    required: true,
  },
  {
    Element: Input,
    Wrapper: Item,
    name: 'firstName',
    placeholder: 'Reason for change',
    testID: 'reason',
    label: 'Reason for change',
    required: true,
  },
  {
    Element: () => <div>test</div>,
    name: 'test',
  },
  {
    Element: Textarea,
    Wrapper: Item,
    name: 'lastName',
    placeholder: 'Reason for change',
    testID: 'reason',
    label: 'Reason for change',
    required: true,
    rows: 10,
  },
];

const validationSchema = yup.object().shape({
  selectOption: yup.string().required(),
  firstName: yup.string().required(),
  lastName: yup.string().required(),
});

const Template: Story = () => (
  <GenericForm<FormFields>
    {...{
      formFields: fields,
      schema: validationSchema,
      onSubmit: () => console.log('test'),
      renderButtons: (fn, isValid) => (
        <Button isDisabled={!isValid} type='submit'>
          submit
        </Button>
      ),
    }}
  />
);

export const GenericFormComponent = Template.bind({});
GenericFormComponent.args = {};

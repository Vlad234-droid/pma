import React from 'react';

import { Meta, Story } from '@storybook/react';

import { Input, Textarea, Select, Item, Props } from '../index';

export default {
  title: 'components/Form',
  component: Item,
} as Meta;

const Template: Story<Props> = (args) => (
  <div style={{ background: '#fff', maxWidth: '600px' }}>
    <div style={{ maxWidth: '500px', padding: '10px' }}>
      <Item {...args} withIcon={false}>
        <Select
          placeholder='Select'
          options={[
            { value: '1', label: 'test 1' },
            { value: '2', label: 'test 2' },
          ]}
        />
      </Item>
      <Item {...args}>
        <Input />
      </Item>
      <Item {...args}>
        <Input placeholder='First name' />
      </Item>
      <Item {...args}>
        <Textarea rows={4} placeholder={'rows 4'} />
      </Item>
      <Item {...args}>
        <Textarea rows={6} placeholder={'rows 6'} />
      </Item>
    </div>
  </div>
);

export const InputField = Template.bind({});
InputField.args = {};

export const InputWithLabel = Template.bind({});
InputWithLabel.args = { label: 'Label' };

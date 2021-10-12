import React from 'react';

import { Meta, Story } from '@storybook/react';

import { Input, Radio, Checkbox, Textarea, Select, Item, Props } from '../index';

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
      <div style={{ display: 'flex', paddingTop: '20px' }}>
        <label style={{ display: 'flex', alignItems: 'center' }}>
          <Radio checked={true} name={'test'} />
          <span>label 1</span>
        </label>
        <label style={{ display: 'flex', alignItems: 'center' }}>
          <Radio name={'test'} />
          <span> label 2</span>
        </label>
      </div>
      <div style={{ display: 'flex', paddingTop: '20px' }}>
        <label style={{ display: 'flex', alignItems: 'center' }}>
          <Checkbox indeterminate={true} name={'test1'} />
          <span>label 1</span>
        </label>
        <label style={{ display: 'flex', alignItems: 'center' }}>
          <Checkbox checked={true} name={'test1'} />
          <span>label 1</span>
        </label>
        <label style={{ display: 'flex', alignItems: 'center' }}>
          <Checkbox name={'test2'} />
          <span> label 2</span>
        </label>
      </div>
    </div>
  </div>
);

export const InputField = Template.bind({});
InputField.args = {};

export const InputWithLabel = Template.bind({});
InputWithLabel.args = { label: 'Label' };

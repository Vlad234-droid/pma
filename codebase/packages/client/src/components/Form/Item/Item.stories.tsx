import React from 'react';

import { Meta, Story } from '@storybook/react';

import { Input, Radio, Checkbox, Textarea, Dropdown, Item, Props } from '../index';

export default {
  title: 'components/Form',
  component: Item,
} as Meta;

const Template: Story<Props> = (args) => (
  <div style={{ background: '#fff', maxWidth: '600px' }}>
    <div style={{ maxWidth: '500px', padding: '10px' }}>
      <Item {...args} withIcon={false}>
        <Dropdown
          name='Dropdown'
          onChange={() => undefined}
          placeholder='Select'
          options={[
            { value: '1', label: 'test 1' },
            { value: '2', label: 'test 2' },
          ]}
        />
      </Item>
      <Item {...args}>
        <Input onChange={() => undefined} />
      </Item>
      <Item {...args}>
        <Input placeholder='First name' onChange={() => undefined} />
      </Item>
      <Item {...args}>
        <Textarea rows={4} placeholder={'rows 4'} onChange={() => undefined} />
      </Item>
      <Item {...args}>
        <Textarea rows={6} placeholder={'rows 6'} onChange={() => undefined} />
      </Item>
      <div style={{ display: 'flex', paddingTop: '20px' }}>
        <label style={{ display: 'flex', alignItems: 'center' }}>
          <Radio checked={true} name={'test'} onChange={() => undefined} />
          <span>label 1</span>
        </label>
        <label style={{ display: 'flex', alignItems: 'center' }}>
          <Radio name={'test'} onChange={() => undefined} />
          <span> label 2</span>
        </label>
      </div>
      <div style={{ display: 'flex', paddingTop: '20px' }}>
        <label style={{ display: 'flex', alignItems: 'center' }}>
          <Checkbox indeterminate={true} name={'test1'} onChange={() => undefined} />
          <span>label 1</span>
        </label>
        <label style={{ display: 'flex', alignItems: 'center' }}>
          <Checkbox checked={true} name={'test1'} onChange={() => undefined} />
          <span>label 1</span>
        </label>
        <label style={{ display: 'flex', alignItems: 'center' }}>
          <Checkbox name={'test2'} onChange={() => undefined} />
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

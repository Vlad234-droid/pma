import React from 'react';

import { action } from '@storybook/addon-actions';
import { Meta, Story } from '@storybook/react';

import { Button, ButtonProps } from './index';

export default {
  title: 'components/button',
  component: Button,
} as Meta;

const Template: Story<ButtonProps & { backgroundColor?: string }> = ({ backgroundColor, ...args }) => {
  return (
    <>
      {backgroundColor ? (
        <div
          style={{
            height: '200px',
            paddingTop: '100px',
            background: backgroundColor,
          }}
        >
          <Button {...args} onPress={action('onPress')} />
        </div>
      ) : (
        <Button {...args} onPress={action('onPress')} />
      )}
    </>
  );
};

export const Primary = Template.bind({});
Primary.args = { mode: 'default', children: 'Click me!' };

export const Disabled = Template.bind({});
Disabled.args = { isDisabled: true, children: 'Click me!' };

export const Inverse = Template.bind({});
Inverse.args = {
  mode: 'inverse',
  backgroundColor: '#00539f',
  children: 'Click me!',
};

export const Custom = Template.bind({});
Custom.args = {
  styles: {
    background: 'green',
    width: '200px',
    height: '200px',
    border: '10px dotted yellow',
  },
  children: 'Click me!',
};

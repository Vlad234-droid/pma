import React from 'react';

import { Meta, Story } from '@storybook/react';

import { TooltipWrapper, WrapperProps } from './index';

export default {
  title: 'components/TooltipWrapper',
  component: TooltipWrapper,
} as Meta;

const Template: Story<WrapperProps> = (args) => (
  <div style={{ paddingTop: '100px', paddingLeft: '100px' }}>
    <TooltipWrapper {...args}>
      <div>test</div>
    </TooltipWrapper>
  </div>
);

export const Tooltip = Template.bind({});
Tooltip.args = {
  text: 'text text text text',
  width: 100,
};

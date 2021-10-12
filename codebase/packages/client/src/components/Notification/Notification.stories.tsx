import React from 'react';

import { Meta, Story } from '@storybook/react';

import { Notification, NotificationProps } from './index';

export default {
  title: 'components/Notification',
  component: Notification,
} as Meta;

const Template: Story<NotificationProps> = (args) => <Notification {...args} />;

export const Component = Template.bind({});
Component.args = {
  text: 'test',
  graphic: 'information',
  iconColor: 'pending',
};

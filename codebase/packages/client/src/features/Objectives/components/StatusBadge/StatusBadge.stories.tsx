import React from 'react';

import { Meta, Story } from '@storybook/react';

import StatusBadgeBase, { StatusBadgeProps } from './StatusBadge';

export default {
  title: 'features/Objectives/StatusBadge',
  component: StatusBadgeBase,
} as Meta;

const Template: Story<StatusBadgeProps> = (props) => <StatusBadgeBase {...props} />;

export const StatusBadge = Template.bind({});
StatusBadge.args = {};

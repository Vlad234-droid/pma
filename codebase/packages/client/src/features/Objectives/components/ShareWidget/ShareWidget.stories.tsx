import React from 'react';

import { Meta, Story } from '@storybook/react';

import ShareWidget, { Props } from './ShareWidget';

export default {
  title: 'features/Objectives/ShareWidget',
  component: ShareWidget,
} as Meta;

const Template: Story<Props> = (props) => <ShareWidget {...props} />;

export const Widget = Template.bind({});
Widget.args = {
  onClick: () => alert('share'),
};

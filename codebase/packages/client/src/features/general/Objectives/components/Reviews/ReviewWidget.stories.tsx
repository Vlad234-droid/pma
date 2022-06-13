import React from 'react';

import { Meta, Story } from '@storybook/react';

import ReviewWidget, { Props } from './ReviewWidget';

export default {
  title: 'features/general/Objectives/ReviewWidget',
  component: ReviewWidget,
} as Meta;

const Template: Story<Props> = (props) => <ReviewWidget {...props} />;

export const Widget = Template.bind({});
Widget.args = {};

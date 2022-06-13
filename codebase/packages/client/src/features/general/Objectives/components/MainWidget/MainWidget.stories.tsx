import React from 'react';

import { Meta, Story } from '@storybook/react';

import MainWidgetBase, { Props } from './MainWidget';

export default {
  title: 'features/general/Objectives/MainWidget',
  component: MainWidgetBase,
} as Meta;

const Template: Story<Props> = (props) => <MainWidgetBase {...props} />;

export const MainWidget = Template.bind({});
MainWidget.args = {
  count: 3,
};

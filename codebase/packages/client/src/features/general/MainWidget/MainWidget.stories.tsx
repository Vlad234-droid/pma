import React from 'react';

import { Meta, Story } from '@storybook/react';

import { MainWidgetBase, MainWidgetBaseProps } from './MainWidgetBase';
import { getTescoContent } from './getTescoContent';

export default {
  title: 'features/general/Objectives/MainWidget',
  component: MainWidgetBase,
} as Meta;

const Template: Story<MainWidgetBaseProps> = (props) => <MainWidgetBase {...props} getContent={getTescoContent} />;

export const MainWidget = Template.bind({});
MainWidget.args = { count: 3 };

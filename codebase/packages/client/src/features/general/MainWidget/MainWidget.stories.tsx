import React from 'react';

import { Meta, Story } from '@storybook/react';

import { MainWidget as MainWidgetBase, Props } from './MainWidget';
import { getTescoContent } from './getTescoContent';

export default {
  title: 'features/general/Objectives/MainWidget',
  component: MainWidgetBase,
} as Meta;

const Template: Story<Props> = (props) => <MainWidgetBase {...props} />;

export const MainWidget = Template.bind({});
MainWidget.args = getTescoContent({ count: 3 }, (key: string, defaultValue?: string) => defaultValue || key);

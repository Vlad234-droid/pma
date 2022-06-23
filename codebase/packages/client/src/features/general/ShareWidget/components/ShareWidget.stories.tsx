import React from 'react';

import { Meta, Story } from '@storybook/react';

import { ShareWidgetBaseProps, ShareWidgetBase } from './ShareWidgetBase';
import { getTescoContent } from './getTescoContent';

export default {
  title: 'features/general/Objectives/ShareWidget',
  component: ShareWidgetBase,
} as Meta;

const Template: Story<ShareWidgetBaseProps> = (props) => <ShareWidgetBase {...props} getContent={getTescoContent} />;

export const Widget = Template.bind({});
Widget.args = {};

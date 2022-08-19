import React from 'react';

import { Meta, Story } from '@storybook/react';

import ShareWidgetBase, { ShareWidgetBaseProps } from '../ShareWidgetBase';
import { getTescoContent } from '../../utils';

export default {
  title: 'features/general/Objectives/ShareWidget',
  component: ShareWidgetBase,
  getContent: getTescoContent,
} as Meta;

const Template: Story<ShareWidgetBaseProps> = (props) => <ShareWidgetBase {...props} />;

export const Widget = Template.bind({});
Widget.args = {};

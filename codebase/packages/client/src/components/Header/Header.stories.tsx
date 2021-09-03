import React from 'react';

import { Meta, Story } from '@storybook/react';

import { Header, HeaderProps } from './index';

export default {
  title: 'components/Header',
  component: Header,
} as Meta;

const Template: Story<HeaderProps> = (args) => <Header {...args} />;

export const Component = Template.bind({});
Component.args = {
  title: 'Title',
  onBack: () => alert('back'),
};

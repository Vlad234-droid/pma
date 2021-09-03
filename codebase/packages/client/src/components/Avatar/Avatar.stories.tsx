import React from 'react';

import { Meta, Story } from '@storybook/react';

import { Avatar, AvatarProps } from './index';

export default {
  title: 'components/Avatar',
  component: Avatar,
} as Meta;

const Template: Story<AvatarProps> = (args) => <Avatar {...args} />;

export const WithoutImage = Template.bind({});
WithoutImage.args = {};

export const WithImage = Template.bind({});
WithImage.args = {
  img: 'https://digitalcontent.api.tesco.com/v2/media/ghs-mktg/d5606eb3-af6b-4200-a7b4-a59e72a20ad9/2321-GHS-743x430-GM-TescoHome.jpeg',
};

export const WithImageAndSize = Template.bind({});
WithImageAndSize.args = {
  img: 'https://digitalcontent.api.tesco.com/v2/media/ghs-mktg/d5606eb3-af6b-4200-a7b4-a59e72a20ad9/2321-GHS-743x430-GM-TescoHome.jpeg',
  size: 100,
};

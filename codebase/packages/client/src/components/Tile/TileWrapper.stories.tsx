import React from 'react';

import { Meta, Story } from '@storybook/react';

import { TileWrapper, Props as TileWrapperProps } from './index';

export default {
  title: 'components/TileWrapper',
  component: TileWrapper,
} as Meta;

const Template: Story<TileWrapperProps> = (args) => (
  <TileWrapper {...args}>
    <div>test</div>
  </TileWrapper>
);

export const Tile = Template.bind({});
Tile.args = {
  boarder: true,
  hover: true,
  customStyle: { maxWidth: '400px' },
};

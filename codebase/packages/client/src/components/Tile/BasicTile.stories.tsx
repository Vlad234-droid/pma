import React from 'react';

import { Meta, Story } from '@storybook/react';

import { BasicTile, TileProps } from './index';

export default {
  title: 'components/BasicTile',
  component: BasicTile,
} as Meta;

const Template: Story<TileProps> = (args) => <BasicTile {...args} />;

export const Tile = Template.bind({});
Tile.args = { title: 'Title', description: 'Description', boarder: true, customStyle: { maxWidth: '400px' } };

export const TileWithImage = Template.bind({});
TileWithImage.args = {
  ...{ ...Tile.args },
  img: 'https://digitalcontent.api.tesco.com/v2/media/ghs-mktg/d5606eb3-af6b-4200-a7b4-a59e72a20ad9/2321-GHS-743x430-GM-TescoHome.jpeg',
};

export const TileAllProps = Template.bind({});
TileAllProps.args = { ...{ ...Tile.args }, hover: true, event: 'event', img: '', link: 'https://tesco.com' };

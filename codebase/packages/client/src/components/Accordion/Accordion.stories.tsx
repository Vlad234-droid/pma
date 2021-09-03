import React from 'react';

import { Meta, Story } from '@storybook/react';

import { Accordion, AccordionProps, Section, Header, Panel } from './index';

export default {
  title: 'components/Accordion',
  component: Accordion,
} as Meta;

const Template: Story<AccordionProps> = (args) => (
  <Accordion {...args}>
    <Section>
      <Header title='test-header'>Sub title</Header>
      <Panel>
        <div>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
          magna aliqua view. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
          ut labore et dolore magna aliqua view. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
          tempor incididunt ut labore et dolore magna aliqua view. Lorem ipsum dolor sit amet, consectetur adipiscing
          elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua view.
        </div>
      </Panel>
    </Section>
  </Accordion>
);

export const AccordionTemplate = Template.bind({});
AccordionTemplate.args = {
  id: 'id',
  wrapHeaderNavigation: true,
};

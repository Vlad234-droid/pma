import React from 'react';

import { Meta, Story } from '@storybook/react';

import { Accordion, BaseAccordion, AccordionProps, Section, Header, Panel } from './index';

export default {
  title: 'components/Accordion',
  component: Accordion,
} as Meta;

const Template: Story<AccordionProps & { defaultExpanded?: boolean; withControls?: boolean }> = ({
  defaultExpanded = false,
  withControls = false,
  ...args
}) => (
  <Accordion id='story-id'>
    <BaseAccordion {...args}>
      {({ expandAllSections, collapseAllSections }) => (
        <>
          {withControls && (
            <>
              <button onClick={() => expandAllSections()}>Expand all sections</button>
              <button onClick={() => collapseAllSections()}>Collapse all sections</button>
            </>
          )}
          <Section defaultExpanded={defaultExpanded}>
            <Header title='test-header'>Sub title</Header>
            <Panel>
              <div>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
                dolore magna aliqua view. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                incididunt ut labore et dolore magna aliqua view. Lorem ipsum dolor sit amet, consectetur adipiscing
                elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua view. Lorem ipsum dolor sit
                amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua
                view.
              </div>
            </Panel>
          </Section>
        </>
      )}
    </BaseAccordion>
  </Accordion>
);

export const AccordionTemplate = Template.bind({});
AccordionTemplate.args = {
  id: 'id',
  wrapHeaderNavigation: true,
};

export const WithOpenPanel = Template.bind({});
WithOpenPanel.args = {
  id: 'id',
  defaultExpanded: true,
};

export const WithControls = Template.bind({});
WithControls.args = {
  id: 'id',
  withControls: true,
};

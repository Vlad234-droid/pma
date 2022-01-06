import React, { FC } from 'react';
import { Accordion, Header, HeaderProps, Panel, Section } from 'components/Accordion';
import { ObjectiveButtons } from '../Buttons';
import { Status } from 'config/enum';

import { ObjectiveTileExplanations, ObjectiveTileHeader } from '../Tile';

import * as T from '../../types';

export type ObjectiveAccordionProps = {
  objectives: T.Objective[];
  canShowStatus: boolean;
};

export const TEST_ID = 'objective-accordion';

const ObjectiveAccordion: FC<ObjectiveAccordionProps> = ({ objectives, canShowStatus }) => (
  <Accordion id='objective-accordion'>
    <div data-test-id={TEST_ID}>
      {objectives.map(({ id, title, subTitle, description, explanations, status }) => (
        <Section key={id}>
          <ObjectiveHeader {...{ title, subTitle, description, ...(canShowStatus ? { status } : {}) }} />
          <Panel>
            <ObjectivePanel explanations={explanations} />
            <ObjectiveButtons id={id} status={status} />
          </Panel>
        </Section>
      ))}
    </div>
  </Accordion>
);

export const ObjectiveHeader: FC<
  Omit<HeaderProps, 'children'> & {
    title: string;
    subTitle?: string;
    description?: string;
    status?: Status;
  }
> = ({ title, subTitle, description, status, ...rest }) => {
  return (
    <Header headingLevel={1} title={title} status={status} {...rest}>
      <ObjectiveTileHeader {...{ subTitle, description, withSpacing: false }} />
    </Header>
  );
};

export const ObjectivePanel: FC<{ explanations: T.Explanation[] }> = ({ explanations }) => (
  <ObjectiveTileExplanations explanations={explanations} />
);

export default ObjectiveAccordion;

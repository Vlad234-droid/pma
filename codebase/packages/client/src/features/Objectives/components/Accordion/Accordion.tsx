import React, { FC } from 'react';
import { useStyle, Rule } from '@dex-ddl/core';

import { Accordion, Header, HeaderProps, Section, Panel } from 'components/Accordion';

type Explanation = {
  title: string;
  steps: string[];
};

type Objective = {
  id: string;
  title: string;
  subTitle: string;
  description: string;
  explanations: Explanation[];
};

type Props = {
  objectives: Objective[];
};

export const TEST_ID = 'objective-accordion';

const ObjectiveAccordion: FC<Props> = ({ objectives }) => (
  <Accordion id='objective-accordion'>
    <div data-test-id={TEST_ID}>
      {objectives.map(({ id, title, subTitle, description, explanations }) => (
        <Section key={id}>
          <ObjectiveHeader {...{ title, subTitle, description }} />
          <ObjectivePanel explanations={explanations} />
        </Section>
      ))}
    </div>
  </Accordion>
);

const ObjectiveHeader: FC<Omit<HeaderProps, 'children'> & { title: string; subTitle?: string; description?: string }> =
  ({ title, subTitle, description, ...rest }) => {
    const { css } = useStyle();

    return (
      <Header headingLevel={1} title={title} {...rest}>
        <h4 className={css(accordionSubTitleStyles)}>{subTitle}</h4>
        <p className={css(accordionDescriptionStyles)}>{description}</p>
      </Header>
    );
  };

const ObjectivePanel: FC<{ explanations: Explanation[] }> = ({ explanations }) => {
  const { css } = useStyle();

  return (
    <Panel>
      {explanations.map(({ title, steps }, idx) => (
        <div className={css(accordionExplanationStyles)} key={idx}>
          <h4 className={css(accordionSubTitleStyles)}>{title}</h4>
          <ol className={css(accordionList)}>
            {steps.map((step, idx) => (
              <li className={css(accordionDescriptionStyles)} key={idx}>
                {step}
              </li>
            ))}
          </ol>
        </div>
      ))}
    </Panel>
  );
};

const accordionSubTitleStyles: Rule = ({ theme }) => ({
  fontSize: '14px',
  lineHeight: '18px',
  color: theme.colors.base,
  margin: '3px 0',
});

const accordionDescriptionStyles: Rule = ({ theme }) => ({
  fontSize: '14px',
  lineHeight: '18px',
  color: theme.colors.base,
  margin: '3px 0',
});

const accordionExplanationStyles: Rule = {
  marginBottom: '15px',
};

const accordionList = {
  padding: '0 17px',
  margin: 0,
  counterReset: 'list',
  '& > li': {
    listStyle: 'none',
    position: 'relative',
    '&:before': {
      content: 'counter(list) ") "',
      counterIncrement: 'list',
      position: 'absolute',
      left: '-17px',
    },
  },
};

export default ObjectiveAccordion;

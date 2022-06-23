import React, { FC } from 'react';
import { Styles, useStyle } from '@pma/dex-wrapper';
import { Accordion, Panel, Section } from 'components/Accordion';
import { ObjectiveTypes as OT } from 'features/general/Objectives';
import { ObjectiveHeader } from './ObjectiveHeader';
import { Button } from './Button';

export const TEST_ID = 'priorities-accordion';

export type ObjectiveAccordionProps = {
  objectives: OT.Objective[];
  canShowStatus?: boolean;
};

const ObjectiveAccordion: FC<ObjectiveAccordionProps> = ({ objectives }) => {
  const { css } = useStyle();
  return (
    <Accordion id='objective-accordion'>
      <div data-test-id={TEST_ID}>
        {objectives.map(({ id, title, subTitle, description, status, lastUpdatedTime }) => {
          const sentences = description.split('. ');
          const firstSentence = sentences.shift();
          const restSentences = sentences.join('. ');

          return (
            <Section key={id}>
              <div className={css({ '& > div': { paddingBottom: 0 } } as Styles)}>
                <ObjectiveHeader {...{ title, subTitle, description: firstSentence, status, lastUpdatedTime }} />
              </div>
              <Panel>
                <div className={css({ lineHeight: '20px', fontSize: '16px' })}>{restSentences}</div>
                <Button />
              </Panel>
              <div className={css({ paddingBottom: '25px' })} />
            </Section>
          );
        })}
      </div>
    </Accordion>
  );
};

export default ObjectiveAccordion;

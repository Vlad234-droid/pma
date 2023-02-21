import React, { FC } from 'react';
import { Styles, useStyle } from '@pma/dex-wrapper';
import { Tenant } from 'utils';

import { Accordion, Panel, Section } from 'components/Accordion';
import { useTranslation } from 'components/Translation';
import { Objective } from '../../type';

import { ObjectiveHeader } from '../ObjectiveHeader';

export const TEST_ID = 'priorities-accordion';

export type ExternalAccordionProps = {
  objectives: Objective[];
  children?: (T) => JSX.Element;
};

const ExternalAccordion: FC<ExternalAccordionProps> = ({ objectives, children }) => {
  const { css } = useStyle();
  const { t } = useTranslation();

  return (
    <Accordion id='objective-accordion'>
      <div data-test-id={TEST_ID}>
        {objectives.map(({ id, uuid, subTitle, description, status, lastUpdatedTime }) => {
          const sentences = description.split('. ');
          const firstSentence = sentences.shift();
          const restSentences = sentences.join('. ');

          return (
            <Section key={id}>
              <div className={css({ '& > div': { paddingBottom: 0 } } as Styles)}>
                <ObjectiveHeader
                  {...{
                    title: t('objective_number', { ns: Tenant.BANK, number: id }),
                    subTitle,
                    description: firstSentence,
                    status,
                    lastUpdatedTime,
                  }}
                />
              </div>
              <Panel>
                <div className={css({ lineHeight: '20px', fontSize: '16px' })}>{restSentences}</div>
                {children ? children({ status, uuid }) : null}
              </Panel>
              <div className={css({ paddingBottom: '25px' })} />
            </Section>
          );
        })}
      </div>
    </Accordion>
  );
};

export default ExternalAccordion;

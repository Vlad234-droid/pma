import React, { FC } from 'react';
import { Rule, Styles, useStyle } from '@pma/dex-wrapper';
import { Accordion, Panel, Section } from 'components/Accordion';
import { useTranslation } from 'components/Translation';
import { ObjectiveTypes as OT } from 'features/general/Reviews';
import { ObjectiveHeader } from '../ObjectiveHeader';
import { Button } from './Button';
import { FileList } from 'features/bank/UploadFile';
import { Tenant } from 'utils';
import { CompletePriority } from '../CompletePriority/CompletePriority';

export const TEST_ID = 'priorities-accordion';

export type ObjectiveAccordionProps = {
  objectives: OT.Objective[];
  handleCompletion: (T) => void;
  canShowStatus?: boolean;
};

const ObjectiveAccordion: FC<ObjectiveAccordionProps> = ({ objectives, handleCompletion }) => {
  const { css } = useStyle();
  const { t } = useTranslation();
  return (
    <Accordion id='objective-accordion'>
      <div data-test-id={TEST_ID}>
        {objectives.map(({ id, subTitle, description, status, lastUpdatedTime, uuid }) => {
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
                <div className={css(buttonStyles)}>
                  <CompletePriority status={status} number={id} handleCompletion={handleCompletion} />
                  <Button reviewUUID={uuid} number={id} status={status} />
                </div>
                <FileList reviewUUID={uuid} />
              </Panel>
              <div className={css({ paddingBottom: '25px' })}></div>
            </Section>
          );
        })}
      </div>
    </Accordion>
  );
};

const buttonStyles: Rule = {
  flexWrap: 'wrap',
  display: 'flex',
  flex: 1,
  justifyContent: 'space-between',
  alignItems: 'center',
  paddingTop: '30px',
};

export default ObjectiveAccordion;

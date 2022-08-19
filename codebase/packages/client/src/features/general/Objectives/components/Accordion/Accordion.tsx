import React, { FC } from 'react';
import { Rule, useStyle } from '@pma/dex-wrapper';
import { Accordion, Panel, Section } from 'components/Accordion';
import { Trans } from 'components/Translation';

import { ObjectiveButtons } from 'features/general/Reviews/components/Buttons';
import * as T from 'features/general/Reviews/types';

import { ObjectiveTileExplanations } from '../Tile';
import ObjectiveHeader from '../ObjectiveHeader';

export type ObjectiveAccordionProps = {
  objectives: T.Objective[];
  canShowStatus?: boolean;
  isButtonsVisible?: boolean;
};

export const TEST_ID = 'objective-accordion';

const DeclineReason: FC<{ declineReason: string }> = ({ declineReason }) => {
  const { css } = useStyle();
  return (
    <div className={css(declineReasonStyles)}>
      <Trans i18nKey={'objective_decline_reason_prefix'}>Your objective was declined because it was not:</Trans>{' '}
      {declineReason}
    </div>
  );
};

const ObjectiveAccordion: FC<ObjectiveAccordionProps> = ({ objectives, canShowStatus, isButtonsVisible = true }) => (
  <Accordion id='objective-accordion'>
    <div data-test-id={TEST_ID}>
      {objectives.map(({ id, title, subTitle, description, declineReason, explanations, status }) => (
        <Section key={id}>
          <ObjectiveHeader {...{ title, subTitle, description, ...(canShowStatus ? { status } : {}) }} />
          <Panel>
            {declineReason && <DeclineReason declineReason={declineReason} />}
            <ObjectiveTileExplanations explanations={explanations} />
            {isButtonsVisible && <ObjectiveButtons id={id} status={status} />}
          </Panel>
        </Section>
      ))}
    </div>
  </Accordion>
);

const declineReasonStyles: Rule = ({ theme }) => ({
  padding: '10px 0',
  fontSize: `${theme.font.fixed.f14.fontSize}`,
  lineHeight: `${theme.font.fixed.f14.lineHeight}`,
  letterSpacing: '0px',
  fontWeight: theme.font.weight.bold,
});

export default ObjectiveAccordion;

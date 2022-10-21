import React, { FC } from 'react';
import { Rule, Styles, useStyle } from '@pma/dex-wrapper';

import { Accordion, BaseAccordion, ExpandButton, Panel, Section } from 'components/Accordion';

import { DateBadge } from '../DateBadge';
import { IconButton, Position } from 'components/IconButton';
import { Trans } from 'components/Translation';

const SessionAccordion: FC<{ isFirst?: boolean }> = ({ isFirst = false }) => {
  const { css } = useStyle();

  return (
    <Accordion id={'session-accordion'} customStyle={isFirst ? borderStyles : marginStyles}>
      <BaseAccordion id={'session-base-accordion'}>
        {() => (
          <Section defaultExpanded={false}>
            <div className={css(sectionBodyStyle)}>
              <div className={css(titleStyle)}>Calibration: West Midlands Stores WL2</div>
              <div className={css(expandButtonStyle)}>
                <DateBadge time={'2022-10-06T07:30:28.573Z'} />
                <ExpandButton />
              </div>
            </div>
            <Panel>
              <div className={css(infoContainerStyle)}>
                <div>
                  <div>Work level:</div>
                  <div>Colleagues</div>
                </div>
                <div>
                  <div>Department</div>
                  <div>Grocery</div>
                </div>
                <div>
                  <div>Store</div>
                  <div>5025</div>
                </div>
                <div>
                  <div>Ratings changed: N/A</div>
                </div>
                <div>
                  <div>Notes</div>
                  <div>
                    Quisque ornare ex et fermentum molestie. Vestibulum quis est metus. Sed sed dictum diam, nec
                    porttitor magna. Sed accumsan eu magna sit amet lobortis. Nullam efficitur, nisi sed mattis
                    suscipit, quam lorem posuere lorem, sed molestie elit nibh vel sem.
                  </div>
                </div>
              </div>
              <div className={css({ paddingBottom: '24px', display: ' flex', gap: '30px' })}>
                <IconButton
                  isDisabled={false}
                  onPress={console.log}
                  graphic='edit'
                  customVariantRules={{ default: iconButtonStyles, disabled: iconButtonStyles }}
                  iconStyles={iconStyles}
                  iconPosition={Position.LEFT}
                  iconProps={{ size: '16px' }}
                >
                  <Trans i18nKey='edit_or_start_session'>Edit or start session</Trans>
                </IconButton>
                <IconButton
                  isDisabled={false}
                  onPress={console.log}
                  graphic='delete'
                  customVariantRules={{ default: iconButtonStyles, disabled: iconButtonStyles }}
                  iconStyles={iconStyles}
                  iconPosition={Position.LEFT}
                  iconProps={{ size: '16px' }}
                >
                  <Trans i18nKey='delete'>Delete</Trans>
                </IconButton>
                <IconButton
                  isDisabled={false}
                  onPress={console.log}
                  graphic='view'
                  customVariantRules={{ default: iconButtonStyles, disabled: iconButtonStyles }}
                  iconStyles={iconStyles}
                  iconPosition={Position.LEFT}
                  iconProps={{ size: '16px' }}
                >
                  <Trans i18nKey='view_session'>View Session</Trans>
                </IconButton>
              </div>
            </Panel>
          </Section>
        )}
      </BaseAccordion>
    </Accordion>
  );
};

const borderStyles: Rule = ({ theme }) => ({
  // @ts-ignore
  borderTop: `2px solid ${theme.colors.lightGray}`,
});

const marginStyles: Rule = {
  marginTop: 0,
};

const titleStyle: Rule = ({ theme }) => ({
  color: theme.colors.tescoBlue,
  fontWeight: theme.font.weight.bold,
  fontSize: theme.font.fixed.f16.fontSize,
  lineHeight: theme.font.fixed.f16.lineHeight,
  letterSpacing: '0px',
});

const sectionBodyStyle: Rule = {
  padding: '24px 24px 24px 0px',
  display: 'flex',
  alignItems: 'center',
};

const expandButtonStyle: Rule = { marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '10px' };

const iconButtonStyles: Rule = ({ theme }) => ({
  padding: '0',
  color: theme.colors.tescoBlue,
  fontWeight: theme.font.weight.bold,
  ...theme.font.fixed.f14,
  letterSpacing: '0px',
});

const iconStyles: Rule = { marginRight: '5px' };

const infoContainerStyle: Rule = {
  '& > div': { width: '100%' },
  paddingBottom: '24px',
  display: ' flex',
  flexWrap: 'wrap',
  rowGap: '30px',
} as Styles;

export default SessionAccordion;

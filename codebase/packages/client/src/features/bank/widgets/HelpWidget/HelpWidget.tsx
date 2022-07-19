import React, { FC } from 'react';
import { colors, Rule, useStyle } from '@pma/dex-wrapper';

import { TileWrapper } from 'components/Tile';
import { Icon } from 'components/Icon';
import { useTranslation } from 'components/Translation';

export const HelpWidget: FC = () => {
  const { css } = useStyle();
  const { t } = useTranslation();

  return (
    <div data-test-id='help-widgets' className={css(wrapperStyles)}>
      <div data-test-id='question-tile' className={css(wrrapperRule)}>
        <TileWrapper customStyle={widgetStyles} background='white'>
          {/* @ts-ignore */}
          <Icon color={colors.darkBlue} graphic='question' />
          <div className={css({ fontWeight: 'bold' })}>
            {t('want_to_learn_more', 'Want to learn more about Your Contribution at Tesco?')}
          </div>
          <div className={css({ fontSize: '16px' })}>Coming soon</div>
        </TileWrapper>
      </div>
    </div>
  );
};

const wrrapperRule: Rule = {
  height: '100%',
};

const wrapperStyles: Rule = {
  display: 'flex',
  flexDirection: 'column',
  flex: '1 0 216px',
  gap: '8px',
  alignItems: 'stretch',
};

const widgetStyles: Rule = {
  display: 'flex',
  flexDirection: 'column',
  gap: '8px',
  alignItems: 'center',
  textAlign: 'center',
  justifyContent: 'center',
  height: '100%',
  padding: '24px 30px',
  border: 'none',
  fontSize: '18px',
  color: '#B3CDE6',
};

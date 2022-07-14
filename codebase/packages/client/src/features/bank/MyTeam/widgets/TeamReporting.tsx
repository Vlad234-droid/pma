import React, { FC } from 'react';
import { Rule, theme } from '@pma/dex-wrapper';

import { useTranslation } from 'components/Translation';
import BaseWidget from 'components/BaseWidget';

const TeamReporting: FC = () => {
  const { t } = useTranslation();

  return (
    <BaseWidget
      iconGraphic={'person'}
      title={t('team_reporting', 'Team reporting')}
      description={t('coming_soon', 'Coming soon')}
      hover={false}
      withButton={false}
      customStyle={{
        fontSize: theme.font.fixed.f16.fontSize,
        lineHeight: theme.font.fixed.f16.lineHeight,
        letterSpacing: '0px',
        marginTop: '8px',
        paddingTop: '6px',
        ...tileWrapperStyles,
        '& span': {
          '&:last-child': {
            fontSize: theme.font.fixed.f16.fontSize,
            marginBottom: '8px',
          },
        },
      }}
    />
  );
};

export default TeamReporting;

const tileWrapperStyles: Rule = { minWidth: '350px' };

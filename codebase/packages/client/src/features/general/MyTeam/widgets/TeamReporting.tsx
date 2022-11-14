import React, { FC } from 'react';
import { Rule, theme } from '@pma/dex-wrapper';
import { useNavigate } from 'react-router';

import { useTranslation } from 'components/Translation';
import { buildPath } from 'features/general/Routes';
import { Page } from 'pages';
import BaseWidget from 'components/BaseWidget';

const TeamReporting: FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <BaseWidget
      iconGraphic={'person'}
      title={t('team_reporting', 'Team reporting')}
      description={t(
        'see_how_your_team_are_progressing_throughout_the_year',
        'See how your team are progressing throughout the year',
      )}
      onClick={() => navigate(buildPath(Page.REPORT))}
      hover={false}
      withButton={false}
      customStyle={{
        fontSize: theme.font.fixed.f16.fontSize,
        lineHeight: theme.font.fixed.f16.lineHeight,
        letterSpacing: '0px',
        marginTop: '8px',
        cursor: 'pointer',
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

import React, { FC } from 'react';
import { colors, fontWeight, Rule, theme, useStyle } from '@pma/dex-wrapper';
import { useNavigate } from 'react-router';

import { TileWrapper } from 'components/Tile';
import { useTranslation } from 'components/Translation';
import { buildPath } from 'features/general/Routes';
import { Page } from 'pages';
import SecondaryWidget from 'features/general/SecondaryWidget';

export type Props = {
  draftCount: number;
  waitingCount: number;
};

const Actions: FC<Props> = ({ draftCount, waitingCount }) => {
  const { css } = useStyle();
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <>
      <TileWrapper customStyle={tileWrapperStyles}>
        <div data-test-id='actions' className={css(wrapperStyles)}>
          <div className={css(titleStyles)}>{t('your_actions', 'Your actions')}</div>
          <div className={css(contentStyles)}>
            <div className={css(blockStyles)}>
              <div className={css(countStyles, { color: colors.pending })}>{waitingCount}</div>
              <div className={css(subtitleStyles)}>{t('your_pending_actions', 'Your pending actions')}</div>
            </div>
            <div className={css(blockStyles)}>
              <div className={css(countStyles, { color: colors.base })}>{draftCount}</div>
              <div className={css(subtitleStyles)}>
                {t('your_colleagues_pending_actions', 'Your colleagues pending actions')}
              </div>
            </div>
          </div>
        </div>
      </TileWrapper>

      <SecondaryWidget
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
    </>
  );
};

export default Actions;

const tileWrapperStyles: Rule = { minWidth: '350px' };

const wrapperStyles: Rule = {
  textAlign: 'center',
  padding: '24px',
};

const titleStyles: Rule = ({ theme }) => ({
  display: 'block',
  fontSize: `${theme.font.fixed.f20.fontSize}`,
  lineHeight: `${theme.font.fixed.f20.lineHeight}`,
  letterSpacing: '0px',
  paddingBottom: '10px',
  fontWeight: fontWeight.bold,
});

const contentStyles: Rule = {
  justifyContent: 'space-around',
  display: 'flex',
};

const blockStyles: Rule = { display: 'inline-block' };

const subtitleStyles: Rule = ({ theme }) => ({
  maxWidth: '128px',
  fontSize: `${theme.font.fixed.f16.fontSize}`,
  lineHeight: `${theme.font.fixed.f16.lineHeight}`,
  letterSpacing: '0px',
  color: colors.base,
});

const countStyles: Rule = ({ theme }) => ({
  fontSize: `${theme.font.fixed.f28.fontSize}`,
  lineHeight: `${theme.font.fixed.f28.lineHeight}`,
  letterSpacing: '0px',
  fontWeight: fontWeight.bold,
});

import React, { FC } from 'react';
import { useStyle, Rule, CreateRule, Styles } from '@pma/dex-wrapper';

import { Trans } from 'components/Translation/Translation';
import { Data } from 'features/general/Report/config';

type Props = {
  mainTitle: string;
  data?: Array<Data>;
  preTitle?: string;
};

const InfoTable: FC<Props> = ({ mainTitle, data, preTitle = '' }) => {
  const { css, matchMedia } = useStyle();
  const small = matchMedia({ xSmall: true, small: true }) || false;

  return (
    <>
      <h2 className={css(titleStyle({ preTitle }))}>{mainTitle}</h2>
      {preTitle && (
        <div className={css(flexStyle)}>
          <p className={css(preTitleStyle)}>{preTitle}</p>
        </div>
      )}
      {data && (
        <div className={css(blockWrapper({ small }))}>
          {data?.map((chart, i) => {
            const percentage = chart?.percentage || 0;
            const quantity = chart?.count || 0;
            return (
              <div key={i} className={css(infoBlock({ small }))}>
                <span className={css(percentStyle)}>{percentage}%</span>
                <span className={css(quantityStyle({ small }))}>
                  <Trans i18nKey='people'>People</Trans> {quantity}
                </span>
                <p className={css(blockTitleStyle)}>{chart.title}</p>
              </div>
            );
          })}
        </div>
      )}
    </>
  );
};

const titleStyle: CreateRule<{ preTitle: string | undefined }> =
  ({ preTitle }) =>
  ({ theme }) => ({
    color: theme.colors.link,
    fontWeight: theme.font.weight.bold,
    fontSize: theme.font.fixed.f20.fontSize,
    lineHeight: theme.font.fixed.f20.lineHeight,
    letterSpacing: '0px',
    textAlign: 'center',
    margin: !preTitle ? '0px 0px 32px 0px' : '0px 0px 12px 0px',
  });

const percentStyle: Rule = ({ theme }) => ({
  color: theme.colors.link,
  fontWeight: theme.font.weight.bold,
  fontSize: theme.font.fixed.f28.fontSize,
  lineHeight: theme.font.fixed.f28.lineHeight,
  letterSpacing: '0px',
  marginBottom: '4px',
});
const blockTitleStyle: Rule = ({ theme }) => ({
  color: theme.colors.base,
  fontWeight: theme.font.weight.bold,
  fontSize: theme.font.fixed.f16.fontSize,
  lineHeight: theme.font.fixed.f16.lineHeight,
  letterSpacing: '0px',
  marginTop: '18.5px',
});

const quantityStyle: CreateRule<{ small: boolean }> =
  ({ small }) =>
  ({ theme }) =>
    ({
      color: theme.colors.link,
      fontWeight: 'normal',
      fontSize: theme.font.fixed.f16.fontSize,
      lineHeight: theme.font.fixed.f16.lineHeight,
      letterSpacing: '0px',
      position: 'relative',
      alignSelf: !small ? 'flex-start' : 'center',
      ':after': {
        content: "''",
        width: '100%',
        height: '2px',
        position: 'absolute',
        bottom: '-8px',
        left: '0px',
        background: theme.colors.backgroundDarkest,
      },
    } as Styles);

const blockWrapper: CreateRule<{ small: boolean }> = ({ small }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  flexDirection: !small ? 'row' : 'column',
  alignItems: 'center',
  marginTop: '32px',
});
const infoBlock: CreateRule<{ small: boolean }> = ({ small }) => ({
  display: 'flex',
  flexDirection: 'column',
  ...(small && { justifyContent: 'center', alignItems: 'center' }),
});

const flexStyle: Rule = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
};

const preTitleStyle: Rule = ({ theme }) => ({
  color: theme.colors.link,
  fontStyle: 'normal',
  fontWeight: 'normal',
  fontSize: theme.font.fixed.f18.fontSize,
  lineHeight: theme.font.fixed.f18.lineHeight,
  letterSpacing: '0px',
  marginTop: '0px',
});

export default InfoTable;

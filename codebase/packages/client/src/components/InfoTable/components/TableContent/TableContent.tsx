import React, { FC } from 'react';
import { useStyle, Rule, Theme, CreateRule, Styles } from '@dex-ddl/core';
import { useChartDataStatistics } from 'features/useChartDataStatistics';
import { IconButton } from 'components/IconButton';
import { Trans, useTranslation } from 'components/Translation/Translation';

import { TableContent as Props } from '../../type';

const TableContent: FC<Props> = ({ mainTitle, data, preTitle }) => {
  const { t } = useTranslation();
  const { css, theme } = useStyle();

  const chartData = Array.isArray(data) ? data : useChartDataStatistics(t, data) || [];

  return (
    <>
      <h2 className={css(titleStyle({ preTitle, theme }))}>{mainTitle}</h2>
      {preTitle !== '' && (
        <div className={css(flexStyle)}>
          <IconButton
            graphic='information'
            iconStyles={{
              marginRight: '10px',
            }}
            onPress={() => {
              console.log();
            }}
          />
          <p className={css(preTitleStyle)}>{preTitle}</p>
        </div>
      )}
      <div className={css(blockWrapper)}>
        {chartData?.map((block, i) => {
          const percent = block.percent || 0;
          const quantity = block.quantity || 0;
          return (
            <div key={i} className={css({ display: 'flex', flexDirection: 'column' })}>
              <span className={css(percentStyle)}>{percent}%</span>
              <span className={css(quantityStyle)}>
                <Trans i18nKey='people'>People</Trans> {quantity}
              </span>
              <p className={css(blockTitleStyle)}>{block.title}</p>
            </div>
          );
        })}
      </div>
    </>
  );
};

const titleStyle: CreateRule<{ preTitle: string | undefined; theme: Theme }> = ({ preTitle, theme }) => ({
  color: theme.colors.link,
  fontWeight: 'bold',
  fontSize: '20px',
  lineHeight: '24px',
  textAlign: 'center',
  margin: !preTitle ? '0px 0px 32px 0px' : '0px 0px 12px 0px',
});

const percentStyle: Rule = ({ theme }) => ({
  color: theme.colors.link,
  fontWeight: 'bold',
  fontSize: '28px',
  lineHeight: '32px',
  marginBottom: '4px',
});
const blockTitleStyle: Rule = ({ theme }) => ({
  color: theme.colors.base,
  fontWeight: 'bold',
  fontSize: '16px',
  lineHeight: '20px',
  marginTop: '18.5px',
});

const quantityStyle: Rule = ({ theme }) =>
  ({
    color: theme.colors.link,
    fontWeight: 'normal',
    fontSize: '16px',
    lineHeight: '20px',
    position: 'relative',
    alignSelf: 'flex-start',
    ':after': {
      content: "''",
      width: '100%',
      height: '1px',
      position: 'absolute',
      bottom: '-8px',
      left: '0px',
      background: theme.colors.backgroundDarkest,
    },
  } as Styles);

const blockWrapper: Rule = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginTop: '32px',
};

const flexStyle: Rule = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
};

const preTitleStyle: Rule = ({ theme }) => ({
  color: theme.colors.link,
  fontStyle: 'normal',
  fontWeight: 'normal',
  fontSize: '18px',
  lineHeight: '22px',
});

export default TableContent;

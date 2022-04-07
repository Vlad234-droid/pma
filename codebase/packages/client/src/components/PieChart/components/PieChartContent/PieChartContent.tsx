import React, { FC, useState } from 'react';
import { useStyle, Rule, CreateRule, Theme } from '@dex-ddl/core';
import { useTranslation } from 'components/Translation';

import { PieChartContentProps as Props, View, Obj } from '../../config';
import { useChartDataStatistics } from 'features/useChartDataStatistics';

export const TEST_ID = 'pie-chart-content-id';

const PieChartContent: FC<Props> = ({ title, titleId, data, display, percentId, hoverMessage, hoverVisibility }) => {
  const { css, theme } = useStyle();
  const { t } = useTranslation();

  const chartData = Array.isArray(data) ? data : useChartDataStatistics(t, data) || [];

  const [isHovering, setIsHovering] = useState<Record<number, boolean>>(
    chartData.map((_, i) => i).reduce((acc, item) => ({ ...acc, [item]: false }), {}),
  );

  return (
    <>
      {title && (
        <h3 data-test-id={titleId} className={css(titleStyled({ chartData, theme }))}>
          {title}
        </h3>
      )}
      <div data-test-id={TEST_ID} className={css(chartContainer({ display }))}>
        {chartData.map((item, i: number) => {
          const percent = item?.['percent'] || 0;
          return (
            <div
              className={css(chartWrapper)}
              key={i}
              onMouseEnter={() => {
                setIsHovering((prev) => ({ ...prev, [i]: true }));
              }}
              onMouseLeave={() => {
                setIsHovering((prev) => ({ ...prev, [i]: false }));
              }}
            >
              <div className={css(progress({ percent, theme, chartData, display }))}>
                <div className={css(progressValue)} data-test-id={percentId}>
                  {percent}
                  {`${display === View.CHART ? `%` : ''}`}
                </div>
              </div>
              {item['title'] && <h3 className={css(chartTitle)}>{item['title']}</h3>}
              {hoverVisibility && !!hoverMessage && !!hoverMessage.length && isHovering[i] && (
                <div className={css(hoverContainer)}>{t(hoverMessage[i])}</div>
              )}
            </div>
          );
        })}
      </div>
    </>
  );
};

const hoverContainer: Rule = ({ theme }) => ({
  position: 'absolute',
  bottom: '78px',
  background: theme.colors.link,
  padding: '16px',
  width: '294px',
  maxWidth: '294px',
  transform: 'translateX(-30%)',
  color: theme.colors.white,
  borderRadius: theme.spacing.s2_5,
});

const chartWrapper: Rule = {
  display: 'flex',
  flexDirection: 'column',
  position: 'relative',
};

const chartContainer: CreateRule<{ display: View.CHART | View.QUANTITY }> = ({ display }) => ({
  display: 'flex',
  justifyContent: 'space-around',
  width: '90%',
  ...(display === View.CHART
    ? {
        margin: '0 auto',
      }
    : {
        margin: '32px auto 0px auto',
      }),
});

const titleStyled: CreateRule<{ chartData: Array<Obj>; theme: Theme }> = ({ chartData, theme }) => ({
  fontStyle: 'normal',
  fontWeight: 'bold',
  fontSize: '20px',
  lineHeight: '24px',
  color: theme.colors.link,
  marginTop: '0px',
  textAlign: 'center',
  marginBottom: chartData.length === 1 ? '16px' : chartData.length >= 2 ? '32px' : '16px',
});

const progress: CreateRule<{
  percent: number;
  theme: Theme;
  chartData: Array<Obj>;
  display: View.CHART | View.QUANTITY;
}> = ({ percent, theme, chartData, display }) => ({
  ...(display === View.CHART && {
    height: chartData.length >= 2 ? '80px' : '98px',
    width: chartData.length >= 2 ? '80px' : '98px',
  }),
  borderRadius: '50%',
  display: 'grid',
  placeItems: 'center',
  ...(display === View.CHART && {
    background: `conic-gradient(${theme.colors.link} ${percent}%, #CFD8DC ${percent}%)`,
  }),
});
const progressValue: Rule = ({ theme }) => ({
  height: 'calc(100% - 18px)',
  width: 'calc(100% - 18px)',
  background: '#ffff',
  borderRadius: '50%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: theme.colors.link,
  fontWeight: 'bold',
  fontSize: '20px',
  lineHeight: '34px',
});

const chartTitle: Rule = ({ theme }) => ({
  color: theme.colors.base,
  fontWeight: 'bold',
  fontSize: '16px',
  lineHeight: '20px',
  margin: '8px 0px 0px 0px',
  textAlign: 'center',
});

export default PieChartContent;

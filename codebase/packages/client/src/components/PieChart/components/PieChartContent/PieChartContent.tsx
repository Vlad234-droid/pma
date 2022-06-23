import React, { FC } from 'react';
import { useStyle, Rule, CreateRule } from '@pma/dex-wrapper';
import { useTranslation } from 'components/Translation';

import { useChartDataStatistics } from 'hooks/useChartDataStatistics';
import { PieChartContentProps as Props, View, Obj } from '../../config';

export const TEST_ID = 'pie-chart-content-id';

const PieChartContent: FC<Props> = ({ title, titleId, data, display, percentId }) => {
  const { css } = useStyle();
  const { t } = useTranslation();

  const useChartData = useChartDataStatistics(t, data) ?? [];
  const chartData = Array.isArray(data) ? data : useChartData;

  return (
    <>
      {title && (
        <h3 data-test-id={titleId} className={css(titleStyled({ chartData }))}>
          {title}
        </h3>
      )}
      <div data-test-id={TEST_ID} className={css(chartContainer({ display }))}>
        {chartData.map((item, i: number) => {
          const percent = item?.['percent'] || 0;
          return (
            <div className={css(chartWrapper)} key={i}>
              <div className={css(progress({ percent, chartData, display }))}>
                <div className={css(progressValue)} data-test-id={percentId}>
                  {percent}
                  {`${display === View.CHART ? `%` : ''}`}
                </div>
              </div>
              {item['title'] && <h3 className={css(chartTitle)}>{item['title']}</h3>}
            </div>
          );
        })}
      </div>
    </>
  );
};

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

const titleStyled: CreateRule<{ chartData: Array<Obj> }> =
  ({ chartData }) =>
  ({ theme }) => ({
    fontStyle: 'normal',
    fontWeight: theme.font.weight.bold,
    fontSize: theme.font.fixed.f20.fontSize,
    lineHeight: theme.font.fixed.f20.lineHeight,
    letterSpacing: '0px',
    color: theme.colors.link,
    marginTop: '0px',
    textAlign: 'center',
    marginBottom: chartData.length === 1 ? '16px' : chartData.length >= 2 ? '32px' : '16px',
  });

const progress: CreateRule<{
  percent: number;
  chartData: Array<Obj>;
  display: View.CHART | View.QUANTITY;
}> =
  ({ percent, chartData, display }) =>
  ({ theme }) => ({
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
  background: theme.colors.white,
  borderRadius: '50%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: theme.colors.link,
  fontWeight: theme.font.weight.bold,
  fontSize: theme.font.fixed.f20.fontSize,
  lineHeight: theme.font.fixed.f28.lineHeight,
  letterSpacing: '0px',
});

const chartTitle: Rule = ({ theme }) => ({
  color: theme.colors.base,
  margin: '8px 0px 0px 0px',
  textAlign: 'center',
  fontWeight: theme.font.weight.bold,
  fontSize: theme.font.fixed.f16.fontSize,
  lineHeight: theme.font.fixed.f16.lineHeight,
});

export default PieChartContent;

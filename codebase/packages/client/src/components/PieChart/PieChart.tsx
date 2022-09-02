import React, { FC } from 'react';
import { CreateRule, Rule, useStyle } from '@pma/dex-wrapper';

import { Data, View } from 'features/general/Report/config';

export const TEST_ID = 'pie-chart-content-id';
export const PERCENT_ID = 'percent-id';
export const TITLE_ID = 'title-id';

export type Props = {
  title?: string;
  data: Array<Data>;
  display: View;
  percentId?: string;
};

const PieChart: FC<Props> = ({ title, data, display }) => {
  const { css } = useStyle();

  return (
    <>
      {title && (
        <h3 data-test-id={TITLE_ID} className={css(titleStyled({ data }))}>
          {title}
        </h3>
      )}
      <div data-test-id={TEST_ID} className={css(chartContainer({ display }))}>
        {data?.map((item, i: number) => {
          const percentage = Number(item?.['percentage']) || 0;
          const count = item?.['count'] || 0;
          return (
            <div className={css(chartWrapper)} key={i}>
              <div className={css(progress({ percentage, data, display }))}>
                <div className={css(progressValue)} data-test-id={PERCENT_ID}>
                  {display === View.QUANTITY ? count : percentage}
                  {`${display === View.CHART ? '%' : ''}`}
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

const titleStyled: CreateRule<{ data: Array<Data> }> =
  ({ data }) =>
  ({ theme }) => ({
    fontStyle: 'normal',
    fontWeight: theme.font.weight.bold,
    fontSize: theme.font.fixed.f20.fontSize,
    lineHeight: theme.font.fixed.f20.lineHeight,
    letterSpacing: '0px',
    color: theme.colors.link,
    marginTop: '0px',
    textAlign: 'center',
    marginBottom: data.length === 1 ? '16px' : data.length >= 2 ? '32px' : '16px',
  });

const progress: CreateRule<{
  percentage: number;
  data: Array<Data>;
  display: View.CHART | View.QUANTITY;
}> =
  ({ percentage, data, display }) =>
  ({ theme }) => ({
    ...(display === View.CHART && {
      height: data.length >= 2 ? '80px' : '98px',
      width: data.length >= 2 ? '80px' : '98px',
    }),
    borderRadius: '50%',
    display: 'grid',
    placeItems: 'center',
    ...(display === View.CHART && {
      background: `conic-gradient(${theme.colors.link} ${percentage}%, #CFD8DC ${percentage}%)`,
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

export default PieChart;

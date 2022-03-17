import React, { FC } from 'react';
import { useStyle, Rule, CreateRule, Theme } from '@dex-ddl/core';

import { PieChartContentProps as Props, View, Obj } from '../../config';

const PieChartContent: FC<Props> = ({ title, titleId, data, display, percentId }) => {
  const { css, theme } = useStyle();

  return (
    <>
      {title && (
        <h3 data-test-id={titleId} className={css(titleStyled({ data, theme }))}>
          {title}
        </h3>
      )}
      <div className={css(chartContainer({ display }))}>
        {data.map((item, i) => {
          const percent = item.percent || 0;
          return (
            <div className={css({ display: 'flex', flexDirection: 'column' })} key={i}>
              <div className={css(progress({ percent, theme, data, display }))}>
                <div className={css(progressValue)} data-test-id={percentId}>
                  {percent}
                  {`${display === View.CHART ? `%` : ''}`}
                </div>
              </div>
              {item.title && <h3 className={css(chartTitle)}>{item.title}</h3>}
            </div>
          );
        })}
      </div>
    </>
  );
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

const titleStyled: CreateRule<{ data: Array<Obj>; theme: Theme }> = ({ data, theme }) => ({
  fontStyle: 'normal',
  fontWeight: 'bold',
  fontSize: '20px',
  lineHeight: '24px',
  color: theme.colors.link,
  marginTop: '0px',
  textAlign: 'center',
  marginBottom: data.length === 1 ? '16px' : data.length >= 2 ? '32px' : '16px',
});

const progress: CreateRule<{
  percent: number;
  theme: Theme;
  data: Array<Obj>;
  display: View.CHART | View.QUANTITY;
}> = ({ percent, theme, data, display }) => ({
  ...(display === View.CHART && {
    height: data.length >= 2 ? '80px' : '98px',
    width: data.length >= 2 ? '80px' : '98px',
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

import React, { FC } from 'react';
import { useStyle, Rule } from '@dex-ddl/core';
import { BarChart, Legend, XAxis, YAxis, Bar, ResponsiveContainer, Cell } from 'recharts';

import { getComputedData, getGraphBars } from '../../utils';
import { RatingChartData } from 'components/Graph/types';
import { Trans } from 'components/Translation';

import { useCurrentData, useChartTitle } from '../../hooks';

export const BAR_WRAPPER = 'bar-wrapper';

type Props = {
  compareData?: RatingChartData;
  currentData: RatingChartData;
};

const colors = ['#82ca9d', '#8884d8'];

const RatingsChart: FC<Props> = ({ currentData, compareData }) => {
  const { css } = useStyle();
  const { data } = getComputedData(currentData, compareData);

  const chartTile = useChartTitle();

  //const [data] = useCurrentData() || [];

  const bars = getGraphBars(data);

  const height = compareData ? '594px' : '347px';

  return (
    <div className={css({ height: height })} data-test-id={BAR_WRAPPER}>
      <div className={css(Title)}>{`${chartTile.title} ${chartTile.year}`}</div>
      <ResponsiveContainer width='100%' height={'100%'}>
        <BarChart
          width={730}
          height={250}
          data={data}
          layout='vertical'
          margin={{ top: 32, right: 50, left: 100, bottom: 50 }}
          maxBarSize={100}
          barGap={0}
          barCategoryGap={0}
        >
          <XAxis type='number' tickCount={11} />
          <YAxis dataKey='name' type='category' />
          <Legend content={renderLegend} />
          {bars.map((bar, index) => {
            return (
              <Bar
                isAnimationActive={false}
                key={bar}
                dataKey={bar}
                fill={colors[index]}
                barSize={50}
                label={<CustomizedLabel />}
              >
                {data.map((_, index) => (
                  <Cell key={`cell-${index}`} opacity={(-index + 4) / 4} />
                ))}
              </Bar>
            );
          })}
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

const CustomizedLabel = (props) => {
  const { x, y, value, fill, height, width, index } = props;
  const [, chartData] = useCurrentData([]) || [];
  return (
    <>
      <g>
        <text
          x={x + width + 4}
          y={y + height / 2.5}
          dy={0}
          fontSize='20'
          fill={fill}
          fontWeight='Bold'
          textAnchor='start'
        >
          {`${value}%`}
        </text>
        <text
          x={x + width + 4}
          y={y + height / 1.2}
          dy={0}
          fontSize='16'
          fill={fill}
          fontWeight='Bold'
          textAnchor='start'
          opacity={0.5}
        >
          {chartData[index]?.count || 0}
        </text>
      </g>
    </>
  );
};

const renderLegend = () => {
  const { css } = useStyle();

  return (
    <>
      <div className={css(LabelVertical)}>
        <Trans i18nKey='ratings'>Ratings</Trans>
      </div>
      <div className={css(LabelHorizontal)}>
        % of <Trans i18nKey='colleagues'>Colleagues</Trans>
      </div>
    </>
  );
};

const Title: Rule = ({ theme }) => ({
  marginTop: '24px',
  fontSize: `${theme.font.fixed.f20.fontSize}`,
  lineHeight: `${theme.font.fixed.f20.lineHeight}`,
  letterSpacing: '0px',
  textAlign: 'center',
  color: `${theme.colors.tescoBlue}`,
  fontWeight: '600',
});

const LabelVertical: Rule = ({ theme }) => ({
  position: 'absolute',
  top: '-360%',
  left: '-85px',
  transform: 'rotate(-90deg)',
  fontSize: `${theme.font.fixed.f14.fontSize}`,
  lineHeight: `${theme.font.fixed.f14.lineHeight}`,
  letterSpacing: '0px',
  fontWeight: '600',
});

const LabelHorizontal: Rule = ({ theme }) => ({
  width: '100%',
  textAlign: 'center',
  fontSize: `${theme.font.fixed.f14.fontSize}`,
  lineHeight: `${theme.font.fixed.f14.lineHeight}`,
  letterSpacing: '0px',
  fontWeight: '600',
  marginTop: '16px',
});

export default RatingsChart;

import React, { FC } from 'react';
import { CreateRule, useStyle, Rule } from '@pma/dex-wrapper';
import { BarChart, Legend, XAxis, YAxis, Bar, ResponsiveContainer, Cell } from 'recharts';

import { Trans } from 'components/Translation';
import { RatingChartData } from './types';
import { getComputedData, getGraphBars } from './utils';

export const BAR_WRAPPER = 'bar-wrapper';

type Props = {
  compareData?: RatingChartData;
  currentData: RatingChartData;
  title: string;
};

const Graph: FC<Props> = ({ currentData, compareData, title }) => {
  const { css, theme } = useStyle();
  const { data } = getComputedData(currentData, compareData);
  const bars = getGraphBars(data);
  const height = compareData ? '594px' : '347px';

  return (
    <div className={css(graphContainer({ height }))} data-test-id={BAR_WRAPPER}>
      <div className={css(titleStyle)}>{title}</div>
      <ResponsiveContainer width='100%' height={'100%'}>
        <BarChart
          width={730}
          // height={250}
          data={data}
          layout='vertical'
          margin={{ top: 32, right: 50, left: 100, bottom: 50 }}
        >
          <XAxis type='number' tickCount={11} tickLine={false} axisLine={false} tick={<CustomizedTick />} />
          <YAxis dataKey='name' type='category' tickLine={false} axisLine={false} />
          <Legend content={renderLegend} />
          {/*<Area dataKey='amt' fill='#8884d8' stroke='#8884d8' />*/}
          {bars.map((bar) => {
            return (
              <Bar
                isAnimationActive={false}
                key={bar}
                dataKey={bar}
                fill={theme.colors.tescoBlue}
                barSize={50}
                label={<CustomizedLabel />}
                strokeWidth={100}
              >
                {data.map((item, index) => (
                  <Cell key={`cell-${index}`} opacity={item[bar] / 100} />
                ))}
              </Bar>
            );
          })}
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

const CustomizedTick = (props) => {
  const {
    width,
    height,
    x,
    y,
    index,
    visibleTicksCount,
    payload: { value, coordinate },
  } = props;
  const start = 160;
  const { theme } = useStyle();

  return (
    <>
      {index !== visibleTicksCount - 1 && (
        <line
          type={'number'}
          orientation={'bottom'}
          height={30}
          x={!index ? start : (width / 10) * index + start}
          y={236}
          stroke={theme.colors.tescoBlue}
          fill={'none'}
          x1={!index ? start : (width / 10) * index + start}
          x2={!index ? start + width / 10 : (width / 10) * index + width / 10 + start}
          y1={236}
          y2={236}
          strokeWidth={'6px'}
          opacity={!index ? 0.1 : index / 10}
        />
      )}
      <text
        type={'number'}
        orientation={'bottom'}
        height={height}
        x={x}
        y={y}
        stroke={'none'}
        fill={'#666'}
        textAnchor='middle'
      >
        <tspan x={coordinate} dy={'1em'}>
          {value}
        </tspan>
      </text>
    </>
  );
};

const CustomizedLabel = (props) => {
  const { x, y, value, fill, height, width } = props;
  //TODO: hook to get the count of colleagues

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
          {/*//TODO:use count*/}
          {value}
        </text>
      </g>
    </>
  );
};

const renderLegend = () => {
  const { css } = useStyle();

  return (
    <>
      <div className={css(labelVertical)}>
        <Trans i18nKey='ratings'>Ratings</Trans>
      </div>
      <div className={css(labelHorizontal)}>
        % of <Trans i18nKey='colleagues'>Colleagues</Trans>
      </div>
    </>
  );
};

const titleStyle: Rule = ({ theme }) => ({
  fontSize: `${theme.font.fixed.f20.fontSize}`,
  lineHeight: `${theme.font.fixed.f20.lineHeight}`,
  letterSpacing: '0px',
  textAlign: 'center',
  color: `${theme.colors.tescoBlue}`,
  fontWeight: '600',
});

const labelVertical: Rule = ({ theme }) => ({
  position: 'absolute',
  top: '-405%',
  left: '-115px',
  transform: 'rotate(-90deg)',
  fontSize: `${theme.font.fixed.f14.fontSize}`,
  lineHeight: `${theme.font.fixed.f14.lineHeight}`,
  letterSpacing: '0px',
  fontWeight: '600',
});

const labelHorizontal: Rule = ({ theme }) => ({
  width: '100%',
  textAlign: 'center',
  fontSize: `${theme.font.fixed.f14.fontSize}`,
  lineHeight: `${theme.font.fixed.f14.lineHeight}`,
  letterSpacing: '0px',
  fontWeight: '600',
  marginTop: '16px',
});

const graphContainer: CreateRule<{ height: string }> = ({ height }) => ({
  //@ts-ignore
  height,
});
export default Graph;

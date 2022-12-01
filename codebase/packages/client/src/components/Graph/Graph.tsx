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
  const { css, theme, matchMedia } = useStyle();
  const small = matchMedia({ xSmall: true, small: true }) || false;

  const { data } = getComputedData(currentData, compareData);
  const bars = getGraphBars(data);
  const height = compareData ? '594px' : small ? '600px' : '347px';

  return (
    <div className={css(graphContainer({ height }))} data-test-id={BAR_WRAPPER}>
      <div className={css(titleStyle)}>{title}</div>
      <ResponsiveContainer width='100%' height={'100%'}>
        <BarChart
          barCategoryGap={small ? '0%' : undefined}
          width={730}
          height={Number(height.slice(0, -2))}
          data={data}
          layout={small ? 'horizontal' : 'vertical'}
          margin={{ top: 32, right: 50, left: 100, bottom: 50 }}
        >
          {small ? (
            <XAxis dataKey={'name'} type={'category'} tickLine={false} axisLine={false} tick={<CustomizedAXisTick />} />
          ) : (
            <XAxis
              type='number'
              tickCount={11}
              tickLine={false}
              axisLine={false}
              tick={<CustomizedTick />}
              domain={[0, 100]}
            />
          )}
          {!small ? (
            <YAxis dataKey='name' type='category' tickLine={false} axisLine={false} />
          ) : (
            <YAxis
              type='number'
              tickCount={11}
              tickLine={false}
              axisLine={false}
              tick={<CustomizedYAxisTick />}
              domain={[0, 100]}
              orientation={'right'}
            />
          )}
          {!small && <Legend content={renderLegend} />}
          {/*//TODO: use not legend, broke on mobile*/}
          {/*<Legend*/}
          {/*  align={'right'}*/}
          {/*  verticalAlign={'middle'}*/}
          {/*  wrapperStyle={{*/}
          {/*    position: 'absolute',*/}
          {/*    top: '320px',*/}
          {/*    transform: 'rotate(-90deg)',*/}
          {/*  }}*/}
          {/*  payload={[{ value: '% of Colleagues', type: 'line' }]}*/}
          {/*/>*/}
          {bars.map((bar) => {
            return (
              <Bar
                isAnimationActive={true}
                key={bar}
                dataKey={bar}
                fill={theme.colors.tescoBlue}
                barSize={small ? undefined : 50}
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

const CustomizedAXisTick: FC<any> = (props: any) => {
  const { x, y, payload } = props;

  return (
    <g transform={`translate(${x},${y})`}>
      <text x={0} y={0} dy={5} textAnchor='end' fill='#666' transform='rotate(-90)'>
        {payload.value}
      </text>
    </g>
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
const CustomizedYAxisTick = (props) => {
  const {
    height,
    x,
    y,
    index,
    visibleTicksCount,
    payload: { value },
  } = props;

  const { theme } = useStyle();

  return (
    <>
      {index !== visibleTicksCount - 1 && (
        <line
          type={'number'}
          orientation={'right'}
          height={30}
          x={x - 4}
          stroke={theme.colors.tescoBlue}
          fill={'none'}
          y2={!index ? y : y + 9}
          y1={y - 40}
          x1={x - 4}
          x2={x - 4}
          strokeWidth={'6px'}
          opacity={!index ? 0.1 : index / 10}
          textAnchor='start'
        />
      )}
      <text
        type={'number'}
        orientation={'right'}
        height={height}
        x={x}
        y={y}
        stroke={'none'}
        fill={'#666'}
        textAnchor='start'
      >
        <tspan x={x} dy={'1em'}>
          {value}
        </tspan>
      </text>
    </>
  );
};

const CustomizedLabel = (props) => {
  const { x, y, value, height, width } = props;
  //TODO: hook to get the count of colleagues
  const { matchMedia, theme } = useStyle();
  const small = matchMedia({ xSmall: true, small: true }) || false;

  return (
    <>
      <g>
        <text
          x={small ? x + width / 16 : x + width + 4}
          y={small ? y - 25 : y + height / 2.5}
          dy={0}
          fontSize='20'
          fill={theme.colors.tescoBlue}
          fontWeight='Bold'
          textAnchor='start'
        >
          {`${value}%`}
        </text>
        <text
          x={small ? x + width / 16 : x + width + 4}
          y={small ? y - 6 : y + height / 1.2}
          dy={0}
          fontSize='16'
          fill={theme.colors.tescoBlue}
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

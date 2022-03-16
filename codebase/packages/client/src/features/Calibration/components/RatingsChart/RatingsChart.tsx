import React, { FC } from 'react';
import { useStyle, Rule } from '@dex-ddl/core';
import { BarChart, Legend, XAxis, YAxis, Bar, ResponsiveContainer, Cell } from 'recharts';

import { getComputedData, getGraphBars } from '../../utils';
import { RatingChartData } from '../../config/types';
import { Trans, useTranslation } from 'components/Translation';

type Props = {
  compareData?: RatingChartData;
  currentData: RatingChartData;
};

const colors = ['#82ca9d', '#8884d8'];

const RatingsChart: FC<Props> = ({ currentData, compareData }) => {
  const { css } = useStyle();
  const { t } = useTranslation();
  const { data, total } = getComputedData(currentData, compareData);
  const bars = getGraphBars(data);
  const height = compareData ? '594px' : '347px';

  return (
    <div className={css({ height: height })} data-test-id='ratings-chart'>
      <div className={css(Title)}>{`${t(
        'calibration_submission',
        'Calibration submission',
      )} ${new Date().getFullYear()}`}</div>
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
          {bars.map((bar, index) => (
            <Bar
              isAnimationActive={false}
              key={bar}
              dataKey={bar}
              fill={colors[index]}
              barSize={50}
              label={<CustomizedLabel key={total[bar]} />}
            >
              {data.map((item, index) => (
                <Cell key={`cell-${index}`} opacity={(-index + 4) / 4} />
              ))}
            </Bar>
          ))}
        </BarChart>
      </ResponsiveContainer>
    </div>
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

const CustomizedLabel = (props) => {
  const {
    x,
    y,
    value,
    fill,
    height,
    width,
    content: { key },
  } = props;

  const percent = ((value * 100) / key).toFixed();

  return (
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
        {`${percent}%`}
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
        {value}
      </text>
    </g>
  );
};

const Title: Rule = ({ theme }) => ({
  marginTop: '24px',
  fontSize: `${theme.font.fixed.f20.fontSize}`,
  lineHeight: `${theme.font.fixed.f20.lineHeight}`,
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
  fontWeight: '600',
});

const LabelHorizontal: Rule = ({ theme }) => ({
  width: '100%',
  textAlign: 'center',
  fontSize: `${theme.font.fixed.f14.fontSize}`,
  lineHeight: `${theme.font.fixed.f14.lineHeight}`,
  fontWeight: '600',
  marginTop: '16px',
});

export default RatingsChart;

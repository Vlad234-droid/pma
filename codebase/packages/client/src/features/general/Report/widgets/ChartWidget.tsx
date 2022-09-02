import React, { FC, ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { Rule, useStyle } from '@pma/dex-wrapper';

import { useChartDataStatistics } from 'hooks/useChartDataStatistics';
import { Data } from '../config';
import { ReportPage } from 'config/enum';

export const PIE_CHART_WRAPPER = 'pie-chart-wrapper';

type RenderProps = {
  data: Array<Data>;
};

type Props = {
  configKey: ReportPage;
  readonly Wrapper?: keyof JSX.IntrinsicElements;
  link?: string;
  children: (renderProps: RenderProps) => ReactNode;
  customData?: Array<Data>;
};

const ChartWidget: FC<Props> = ({ configKey, Wrapper = 'div', link = '', customData, children }) => {
  const { css } = useStyle();

  const chartDataStatistics = useChartDataStatistics(configKey);

  const data = customData ? customData : chartDataStatistics;

  if (!link)
    return (
      <Wrapper className={css(pieChartWrapper)} data-test-id={PIE_CHART_WRAPPER}>
        {children({ data })}
      </Wrapper>
    );

  return (
    <Link to={link} className={css(pieChartWrapper)} data-test-id={PIE_CHART_WRAPPER}>
      {children({ data })}
    </Link>
  );
};

const pieChartWrapper: Rule = ({ theme }) => ({
  background: theme.colors.white,
  boxShadow: '3px 3px 1px 1px rgba(0, 0, 0, 0.05)',
  borderRadius: '10px',
  padding: '24px',
  width: '100%',
  height: '100%',
  position: 'relative',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'column',
});

export default ChartWidget;

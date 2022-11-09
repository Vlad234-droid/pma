import React, { FC, ReactNode } from 'react';
import { useStyle, CreateRule } from '@pma/dex-wrapper';

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
  children: (renderProps: RenderProps) => ReactNode;
  customData?: Array<Data>;
  onClick?: () => void;
};

const ChartWidget: FC<Props> = ({ configKey, Wrapper = 'div', onClick, customData, children }) => {
  const { css } = useStyle();

  const chartDataStatistics = useChartDataStatistics(configKey);

  const data = customData ? customData : chartDataStatistics;

  return (
    <Wrapper
      className={css(pieChartWrapper({ isClickable: !!onClick }))}
      data-test-id={PIE_CHART_WRAPPER}
      onClick={onClick}
    >
      {children({ data })}
    </Wrapper>
  );
};

const pieChartWrapper: CreateRule<{ isClickable: boolean }> =
  ({ isClickable }) =>
  ({ theme }) => ({
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
    cursor: isClickable ? 'pointer' : 'auto',
  });

export default ChartWidget;

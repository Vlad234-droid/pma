import React, { FC, ReactNode } from 'react';
import { useStyle, CreateRule } from '@pma/dex-wrapper';

import { Data } from '../types';
import { ReportPage } from 'config/enum';
import { useChartDataStatistics } from 'hooks/useChartDataStatistics';

export const INFO_TABLE_WRAPPER = 'info_table_wrapper';

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

export const TableWidget: FC<Props> = ({ configKey, onClick, Wrapper = 'div', customData, children }) => {
  const { css } = useStyle();

  const chartDataStatistics = useChartDataStatistics(configKey);

  const data = customData ? customData : chartDataStatistics;

  return (
    <Wrapper className={css(infoTableWrapper({ isClickable: !!onClick }))} data-test-id={INFO_TABLE_WRAPPER}>
      {children({ data })}
    </Wrapper>
  );
};

const infoTableWrapper: CreateRule<{ isClickable: boolean }> =
  ({ isClickable }) =>
  ({ theme }) => ({
    padding: '24px',
    background: theme.colors.white,
    boxShadow: '3px 3px 1px 1px rgba(0, 0, 0, 0.05)',
    borderRadius: '10px',
    width: '100%',
    fontSize: theme.font.fixed.f16.fontSize,
    lineHeight: theme.font.fixed.f16.lineHeight,
    letterSpacing: '0px',
    position: 'relative',
    display: 'inline-block',
    height: '100%',
    cursor: isClickable ? 'pointer' : 'auto',
  });

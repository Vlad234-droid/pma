import React, { FC } from 'react';
import { Rule, useStyle } from '@pma/dex-wrapper';
import { Link } from 'react-router-dom';
import { buildPath, buildPathWithParams } from 'features/Routes';
import { PieChartContent as Content } from './components/PieChartContent';
import { PieChartProps } from './config';
import { paramsReplacer } from 'utils';

const PieChart: FC<PieChartProps> = ({
  title,
  data,
  display,
  percentId = 'percent_id',
  titleId = 'titleId',
  link = '',
  Wrapper = 'div',
  params = {},
  type = '',
}) => {
  const { css } = useStyle();

  const props = {
    title,
    data,
    display,
    percentId,
    titleId,
  };

  if (!link)
    return (
      <Wrapper className={css(pieChartWrapper)}>
        <Content {...props} />
      </Wrapper>
    );

  return (
    <Link
      to={buildPathWithParams(buildPath(paramsReplacer(link, { ':type': type })), {
        ...params,
      })}
      className={css(pieChartWrapper)}
    >
      <Content {...props} />
    </Link>
  );
};

const pieChartWrapper: Rule = ({ theme }) => ({
  background: theme.colors.white,
  boxShadow: '3px 3px 1px 1px rgba(0, 0, 0, 0.05)',
  borderRadius: '10px',
  padding: '24px',
  width: '100%',
});

export default PieChart;

import React, { FC, useState } from 'react';
import { Link } from 'react-router-dom';
import { Rule, useStyle } from '@pma/dex-wrapper';
import { buildPath, buildPathWithParams } from 'features/Routes';
import { PieChartContent as Content } from './components/PieChartContent';
import { HoverMessage } from 'components/HoverMessage';
import { PieChartProps } from './config';
import { paramsReplacer } from 'utils';

export const PIE_CHART_WRAPPER = 'pie-chart-wrapper';

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
  hoverMessage = '',
  hoverVisibility = true,
}) => {
  const { css } = useStyle();

  const [isHovering, setIsHovering] = useState<boolean>(false);

  const props = {
    title,
    data,
    display,
    percentId,
    titleId,
    hoverMessage,
    hoverVisibility,
  };

  const HoverMessageWrapper = () => (
    <HoverMessage
      isVisible={hoverVisibility && !!hoverMessage && isHovering}
      text={hoverMessage}
      customStyles={hoverContainer}
    />
  );

  if (!link)
    return (
      <Wrapper
        className={css(pieChartWrapper)}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
        data-test-id={PIE_CHART_WRAPPER}
      >
        <Content {...props} />
        <HoverMessageWrapper />
      </Wrapper>
    );

  return (
    <Link
      to={buildPathWithParams(buildPath(paramsReplacer(link, { ':type': type })), {
        ...params,
      })}
      className={css(pieChartWrapper)}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      data-test-id={PIE_CHART_WRAPPER}
    >
      <Content {...props} />
      <HoverMessageWrapper />
    </Link>
  );
};

const pieChartWrapper: Rule = ({ theme }) => ({
  background: theme.colors.white,
  boxShadow: '3px 3px 1px 1px rgba(0, 0, 0, 0.05)',
  borderRadius: '10px',
  padding: '24px',
  width: '100%',
  position: 'relative',
});

const hoverContainer: Rule = () => ({
  position: 'absolute',
  bottom: '-8px',
  left: '50%',
  transform: 'translate(-50%, 100%)',
});

export default PieChart;

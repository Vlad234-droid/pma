import React, { FC, useState } from 'react';
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

  const HoverMessage = () =>
    hoverVisibility && !!hoverMessage && isHovering && <div className={css(hoverContainer)}>{hoverMessage}</div>;

  if (!link)
    return (
      <Wrapper
        className={css(pieChartWrapper)}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        <Content {...props} />
        {HoverMessage()}
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
    >
      <Content {...props} />
      {HoverMessage()}
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

const hoverContainer: Rule = ({ theme }) => ({
  position: 'absolute',
  bottom: '-8px',
  left: '50%',
  transform: 'translate(-50%, 100%)',
  zIndex: '2',
  background: theme.colors.link,
  padding: '16px',
  width: '294px',
  maxWidth: '294px',
  color: theme.colors.white,
  borderRadius: theme.spacing.s2_5,
});

export default PieChart;

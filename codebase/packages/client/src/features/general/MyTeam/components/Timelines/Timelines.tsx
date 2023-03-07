import React, { FC, useMemo } from 'react';
import { Rule, useStyle } from '@pma/dex-wrapper';

import { TimelineType, Employee, ReviewType, Timeline } from 'config/types';
import { Icon, getIcon } from 'components/Icon';
import { useTranslation } from 'components/Translation';

import { Priority } from '../Priority';
import { filterByDate } from 'utils';

type Props = {
  employee: Employee;
};

const TimeLines: FC<Props> = ({ employee }) => {
  const { css } = useStyle();
  const { t } = useTranslation();
  const { timeline: timelines } = employee;

  const hasQuarterTimeline = timelines.some(({ reviewType }) => reviewType === ReviewType.QUARTER);

  const currentTLPoints = useMemo(() => {
    const gropedByCycle = timelines
      ?.filter(
        (timeline) =>
          timeline.type !== TimelineType.TIMELINE_POINT && timeline.properties.TIMELINE_POINT_HIDDEN !== 'true',
      )
      ?.reduce((acc, tlPoint) => {
        acc[tlPoint.colleagueCycleUuid] = [...(acc[tlPoint.colleagueCycleUuid] || []), tlPoint];
        return acc;
      }, {} as Record<string, Timeline[]>);

    return Object.keys(gropedByCycle)
      .map((colleagueCycleUuid) => [...gropedByCycle[colleagueCycleUuid]])
      .sort(([{ startTime }], [{ startTime: sEndTime }]) => filterByDate(startTime, sEndTime))[0];
  }, [JSON.stringify(timelines)]);
  return (
    <>
      <div data-test-id='timelines' className={css(wrapperStyles)}>
        <div className={css(listStyles)}>
          {currentTLPoints.map((review) => {
            const [graphics, color, title] = getIcon(review.summaryStatus, t);

            return (
              <div data-test-id='timeline' key={review.uuid} className={css(reviewItemStyles)}>
                <div className={css({ paddingBottom: '6px' })}>{review.description}</div>
                <Icon graphic={graphics} fill={color} title={title} />
              </div>
            );
          })}
        </div>
      </div>
      {hasQuarterTimeline && <Priority employee={employee} />}
    </>
  );
};

export default TimeLines;

const listStyles: Rule = { display: 'flex' };

const wrapperStyles: Rule = ({ theme }) => ({
  background: `${theme.colors.backgroundDark}`,
  padding: '24px',
  borderRadius: '10px',
});

const reviewItemStyles: Rule = ({ theme }) => ({
  // display: 'inline-block',
  paddingRight: '30px',
  textAlign: 'center',
  fontSize: `${theme.font.fixed.f14.fontSize}`,
  lineHeight: `${theme.font.fixed.f14.lineHeight}`,
  letterSpacing: '0px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
});

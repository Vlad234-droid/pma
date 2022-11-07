import React, { FC } from 'react';
import { Rule, useStyle } from '@pma/dex-wrapper';

import { TimelineType, Employee, ReviewType } from 'config/types';
import { Icon, getIcon } from 'components/Icon';
import { useTranslation } from 'components/Translation';

import { Priority } from '../Priority';
import { useSelector } from 'react-redux';
import { isAnniversaryTimelineType } from '@pma/store';
import { Status } from 'config/enum';

type Props = {
  employee: Employee;
};

const TimeLines: FC<Props> = ({ employee }) => {
  const { css } = useStyle();
  const { t } = useTranslation();
  const isAnniversary = useSelector(isAnniversaryTimelineType(employee.uuid));
  const { timeline: timelines } = employee;

  const hasQuarterTimeline = timelines.some(({ reviewType }) => reviewType === ReviewType.QUARTER);
  const reviews = timelines
    ?.filter((review) => review.type !== TimelineType.TIMELINE_POINT)
    ?.filter((review) =>
      isAnniversary ? ![Status.NOT_STARTED, Status.COMPLETED, Status.FINISHED].includes(review.status) : true,
    );

  return (
    <>
      <div data-test-id='timelines' className={css(wrapperStyles)}>
        <div className={css(listStyles)}>
          {reviews?.map((review) => {
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

const listStyles: Rule = { justifyContent: 'flex-start' };

const wrapperStyles: Rule = ({ theme }) => ({
  background: `${theme.colors.backgroundDark}`,
  padding: '24px',
  borderRadius: '10px',
});

const reviewItemStyles: Rule = ({ theme }) => ({
  display: 'inline-block',
  paddingRight: '30px',
  textAlign: 'center',
  fontSize: `${theme.font.fixed.f14.fontSize}`,
  lineHeight: `${theme.font.fixed.f14.lineHeight}`,
  letterSpacing: '0px',
});

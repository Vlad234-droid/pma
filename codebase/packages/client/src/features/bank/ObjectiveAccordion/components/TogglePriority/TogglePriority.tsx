import React, { useState, useCallback } from 'react';
import { Rule, useStyle } from '@pma/dex-wrapper';
import { TimelinePoint, TimelinePointStatusEnum } from '@pma/openapi';
import { ReviewType } from 'config/types';
import { colleagueUUIDSelector, ReviewsActions, getTimelinesByReviewTypeSelector } from '@pma/store';
import { useSelector } from 'react-redux';
import useDispatch from 'hooks/useDispatch';
import { USER } from 'config/constants';

const CURRENT = 'CURRENT';

// thinking about move to separate feat but seems it is only for bank and specific for this section.
const TogglePriority = () => {
  const { css } = useStyle();
  const colleagueUuid = useSelector(colleagueUUIDSelector);
  const dispatch = useDispatch();
  // todo use QUARTER after back is done
  const timelinePoints: TimelinePoint[] =
    useSelector(getTimelinesByReviewTypeSelector(ReviewType.OBJECTIVE, USER.current)) || {};
  const visibleTimelinePoints = timelinePoints.filter(
    (timelinePoint) => timelinePoint.status !== TimelinePointStatusEnum.NotStarted,
  );

  const timelinePoint = visibleTimelinePoints.find(
    (timelinePoint) => timelinePoint.status === TimelinePointStatusEnum.NotStarted,
  );
  const [selectedTimelinePoint, setTimelinePoint] = useState(timelinePoint);

  const handleSelectTimelinePoint = useCallback((e) => {
    const uuid = e.currentTarget.dataset['uuid'];
    const timelinePoint = visibleTimelinePoints.find((timelinePoint) => timelinePoint.uuid === uuid);
    setTimelinePoint(timelinePoint);
    // todo not clear how to interact with QUARTER on backend. after back is done update request
    dispatch(ReviewsActions.getReviews({ pathParams: { colleagueUuid, cycleUuid: CURRENT } }));
  }, []);

  if (timelinePoints?.length <= 1) {
    return null;
  }
  return (
    <div className={css(wrapperStyle)}>
      {timelinePoints.map((timelinePoint, index) => {
        if (timelinePoint.uuid === selectedTimelinePoint?.uuid) {
          return (
            <div className={css(activeStepStyle)} key={timelinePoint.uuid}>
              <span className={css({ padding: '2px 8px 4px' })}>Quarter {index + 1}</span>
            </div>
          );
        }
        return (
          <div
            data-uuid={timelinePoint.uuid}
            onClick={handleSelectTimelinePoint}
            className={css(stepStyle)}
            key={timelinePoint.uuid}
          >
            <span className={css({ padding: '2px 8px 4px' })}>Quarter {index + 1}</span>
          </div>
        );
      })}
    </div>
  );
};

const wrapperStyle: Rule = { display: 'flex', flexWrap: 'wrap', gap: '10px', marginTop: '40px' };

const stepStyle: Rule = ({ theme }) => ({
  ...theme.font.fixed.f16,
  color: theme.colors.tescoBlue,
  border: `1px solid ${theme.colors.tescoBlue}`,
  borderRadius: '3px',
  cursor: 'pointer',
});

const activeStepStyle: Rule = ({ theme }) => ({
  ...theme.font.fixed.f16,
  background: theme.colors.tescoBlue,
  color: theme.colors.white,
  borderRadius: '3px',
});

export default TogglePriority;

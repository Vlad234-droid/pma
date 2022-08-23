import React, { FC } from 'react';
import { Rule, useStyle } from '@pma/dex-wrapper';
import { Timeline } from 'config/types';

type Props = {
  handleSelectTimelinePoint: (T) => void;
  timelinePoints: Timeline[];
  activeTimelinePoints?: Timeline;
};
const TogglePriority: FC<Props> = ({ handleSelectTimelinePoint, timelinePoints, activeTimelinePoints }) => {
  const { css } = useStyle();

  if (timelinePoints?.length <= 1) {
    return null;
  }
  return (
    <div className={css(wrapperStyle)}>
      {timelinePoints.map((timelinePoint, index) => {
        if (timelinePoint.uuid === activeTimelinePoints?.uuid) {
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

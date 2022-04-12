import React, { FC } from 'react';
import { Rule, useStyle } from '@pma/dex-wrapper';

import { TimelineType, Timeline } from 'config/types';
import { Icon, getIcon } from 'components/Icon';

type Props = {
  timelines?: Timeline[];
};

const TimeLines: FC<Props> = ({ timelines }) => {
  const { css } = useStyle();

  return (
    <div data-test-id='timelines' className={css(wrapperStyles)}>
      <div className={css(listStyles)}>
        {timelines
          ?.filter((review) => review.type !== TimelineType.TIMELINE_POINT)
          ?.map((review) => {
            const [graphics, color] = getIcon(review.status);

            return (
              <div data-test-id='timeline' key={review.uuid} className={css(reviewItemStyles)}>
                <div className={css({ paddingBottom: '6px' })}>{review.description}</div>
                <Icon graphic={graphics} fill={color} />
              </div>
            );
          })}
      </div>
    </div>
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

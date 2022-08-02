import React, { FC, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { Rule, useStyle } from '@pma/dex-wrapper';
import { getTimelineByCodeSelector } from '@pma/store';

import { useTranslation } from 'components/Translation';
import { ReviewWidget } from 'features/general/ReviewWidget';
import { ReviewType, Status } from 'config/enum';
import { USER } from 'config/constants';
import { getContent } from 'features/general/Objectives/utils';
import { useTenant } from 'features/general/Permission';

type Props = {};

const YearEndReview: FC<Props> = () => {
  const { t } = useTranslation();
  const { css } = useStyle();
  const tenant = useTenant();

  const review = useSelector(getTimelineByCodeSelector(ReviewType.EYR, USER.current));

  const { status, startTime, endTime, lastUpdatedTime } = review;

  const [graphic, iconColor, background, shadow, hasDescription, content, buttonText] = useMemo(
    () =>
      getContent(
        {
          status,
          startTime,
          lastUpdatedTime,
        },
        t,
        tenant,
      ),
    [status, startTime, lastUpdatedTime],
  );

  return (
    <div data-test-id='feedback' className={css(basicTileStyle)}>
      <ReviewWidget
        title={t('review_type_description_eyr', 'Year-end review')}
        description={
          hasDescription
            ? status === Status.APPROVED
              ? t('end_year_review_widget_title_approved', 'Your year-end review is complete.')
              : t(
                  'end_year_review_widget_title',
                  'Complete this once you’ve had your year-end conversation with your line manager.',
                )
            : undefined
        }
        reviewType={ReviewType.EYR}
        disabled={status === Status.NOT_STARTED}
        graphic={graphic}
        iconColor={iconColor}
        background={background}
        shadow={shadow}
        content={content}
        buttonText={buttonText}
        customStyle={{ height: '100%' }}
      />
    </div>
  );
};

export default YearEndReview;

const basicTileStyle: Rule = {
  flex: '1 0 230px',
};

import React, { FC, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { Rule, useStyle } from '@pma/dex-wrapper';
import { getTimelineByCodeSelector, userCycleTypeSelector } from '@pma/store';
import { useNavigate } from 'react-router';
import { useLocation } from 'react-router-dom';

import { useTranslation } from 'components/Translation';
//TODO: move to components
import { ReviewWidget } from 'features/general/ReviewWidget';
import { CycleType, ReviewType, Status } from 'config/enum';
import { USER } from 'config/constants';
import { useTenant } from 'features/general/Permission';
import { getContent } from '../utils';
import {
  formatDateStringFromISO,
  minusDayToDateString,
  DateTime,
  formatDateTime,
  getLocalNow,
  paramsReplacer,
} from 'utils';
import { buildPath } from 'features/general/Routes';
import { Page } from 'pages';

const AnnualReview: FC = () => {
  const { t } = useTranslation();
  const { css } = useStyle();
  const tenant = useTenant();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const review = useSelector(getTimelineByCodeSelector(ReviewType.EYR, USER.current));
  const cycleType = useSelector(userCycleTypeSelector);

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

  if (
    cycleType === CycleType.HIRING &&
    (DateTime.fromISO(endTime) < getLocalNow() || DateTime.fromISO(startTime) > getLocalNow())
  )
    return null;

  return (
    <div data-test-id='feedback' className={css(basicTileStyle)}>
      <ReviewWidget
        onClick={() =>
          navigate(buildPath(paramsReplacer(Page.REVIEWS, { ':type': ReviewType.EYR.toLowerCase() })), {
            state: {
              backPath: pathname,
            },
          })
        }
        title={
          cycleType === CycleType.FISCAL
            ? t('annual_performance_review', 'Annual performance review')
            : t('anniversary_review', 'Anniversary Review')
        }
        description={
          hasDescription
            ? status === Status.APPROVED
              ? t('end_year_review_widget_title_approved', 'Your year-end review is complete.')
              : cycleType === CycleType.HIRING && status === Status.STARTED
              ? t('performance_period_duration', {
                  startDate: formatDateStringFromISO(startTime, 'LLL yyyy'),
                  endDate: formatDateStringFromISO(endTime, 'LLL yyyy'),
                })
              : t(
                  'end_year_review_widget_title',
                  'Complete this once you’ve had your year-end conversation with your line manager.',
                )
            : undefined
        }
        disabled={status === Status.NOT_STARTED}
        graphic={graphic}
        iconColor={iconColor}
        background={background}
        shadow={shadow}
        content={
          cycleType === CycleType.HIRING && status === Status.STARTED
            ? t(
                'your_review_due_by_date',
                `Your performance review form is due by ${formatDateTime(
                  minusDayToDateString(DateTime.fromISO(endTime)),
                  'dd LLL yyyy',
                )}`,
                { date: formatDateTime(minusDayToDateString(DateTime.fromISO(endTime)), 'dd LLL yyyy') },
              )
            : content
        }
        buttonText={buttonText}
        customStyle={{ height: '100%' }}
      />
    </div>
  );
};

export default AnnualReview;

const basicTileStyle: Rule = {
  flex: '1 0 230px',
};

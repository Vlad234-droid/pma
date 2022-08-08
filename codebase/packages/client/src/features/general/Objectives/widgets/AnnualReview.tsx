import React, { FC, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { Rule, useStyle } from '@pma/dex-wrapper';
import { getTimelineByCodeSelector, userCycleTypeSelector, uuidCompareSelector } from '@pma/store';
import { useNavigate } from 'react-router';
import { useLocation } from 'react-router-dom';

import { useTranslation } from 'components/Translation';
//TODO: move to components
import { ReviewWidget } from '../components/ReviewWidget';
import { CycleType, ReviewType, Status } from 'config/enum';
import { useTenant } from 'features/general/Permission';
import { getContent } from '../utils';
import {
  formatDateStringFromISO,
  minusDayToDateString,
  DateTime,
  formatDateTime,
  getLocalNow,
  paramsReplacer,
  minusMonthFromISODateString,
} from 'utils';
import { buildPath } from 'features/general/Routes';
import { Page } from 'pages';

type Props = {
  colleagueUuid: string;
};

const AnnualReview: FC<Props> = ({ colleagueUuid }) => {
  const { t } = useTranslation();
  const { css } = useStyle();
  const tenant = useTenant();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const isUserView = useSelector(uuidCompareSelector(colleagueUuid));

  const review = useSelector(getTimelineByCodeSelector(ReviewType.EYR, colleagueUuid));
  const cycleType = useSelector(userCycleTypeSelector);

  const { summaryStatus, startTime, endTime, lastUpdatedTime } = review;

  const [graphic, iconColor, background, shadow, hasDescription, content, buttonText] = useMemo(
    () =>
      getContent(
        {
          status: summaryStatus,
          startTime,
          lastUpdatedTime,
        },
        t,
        tenant,
      ),
    [summaryStatus, startTime, lastUpdatedTime],
  );

  if (
    cycleType === CycleType.HIRING &&
    (DateTime.fromISO(endTime) < getLocalNow() || DateTime.fromISO(startTime) > getLocalNow())
  )
    return null;

  const disabled = isUserView
    ? summaryStatus === Status.NOT_STARTED
    : summaryStatus === Status.NOT_STARTED || summaryStatus === Status.DRAFT;

  return (
    <div data-test-id='feedback' className={css(basicTileStyle)}>
      <ReviewWidget
        onClick={() =>
          navigate(
            buildPath(
              paramsReplacer(isUserView ? Page.REVIEWS : Page.USER_TL_REVIEW, {
                ':type': ReviewType.EYR.toLowerCase(),
                ...(!isUserView && { ':uuid': colleagueUuid }),
              }),
            ),
            {
              state: {
                backPath: pathname,
              },
            },
          )
        }
        title={
          cycleType === CycleType.FISCAL
            ? t('annual_performance_review', 'Annual performance review')
            : t('anniversary_review', 'Anniversary Review')
        }
        description={
          hasDescription
            ? summaryStatus === Status.APPROVED
              ? t('end_year_review_widget_title_approved', 'Your year-end review is complete.')
              : cycleType === CycleType.HIRING && summaryStatus === Status.STARTED
              ? t('performance_period_duration', {
                  startDate: formatDateStringFromISO(startTime, 'LLL yyyy'),
                  endDate: formatDateTime(minusMonthFromISODateString(endTime), 'LLL yyyy'),
                })
              : t(
                  'end_year_review_widget_title',
                  'Complete this once you’ve had your year-end conversation with your line manager.',
                )
            : undefined
        }
        disabled={disabled}
        graphic={graphic}
        iconColor={iconColor}
        background={cycleType === CycleType.FISCAL ? background : 'white'}
        shadow={shadow}
        content={
          cycleType === CycleType.HIRING && summaryStatus === Status.STARTED
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

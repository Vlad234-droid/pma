import React, { FC, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { Rule, useStyle } from '@pma/dex-wrapper';
import {
  colleagueCurrentCycleSelector,
  getTimelineByCodeSelector,
  isAnniversaryTimelineType,
  uuidCompareSelector,
} from '@pma/store';

import { useTenant } from 'features/general/Permission';
import { buildPath } from 'features/general/Routes';
import { Page } from 'pages';
import { useTranslation } from 'components/Translation';
import { ReviewWidget } from '../components/ReviewWidget';
import { ReviewType, Status } from 'config/enum';
import { getContent } from '../utils';
import {
  formatDateStringFromISO,
  minusDayToDateString,
  DateTime,
  formatDateTime,
  paramsReplacer,
  minusMonthFromISODateString,
} from 'utils';

type Props = {
  colleagueUuid: string;
};

const AnnualReview: FC<Props> = ({ colleagueUuid }) => {
  const { t } = useTranslation();
  const { css } = useStyle();
  const tenant = useTenant();
  const navigate = useNavigate();
  const { pathname, state } = useLocation();
  const isUserView = useSelector(uuidCompareSelector(colleagueUuid));
  const currentCycle = useSelector(colleagueCurrentCycleSelector(colleagueUuid));
  const tlPoint = useSelector(getTimelineByCodeSelector(ReviewType.EYR, colleagueUuid, currentCycle));
  const isAnniversary = useSelector(isAnniversaryTimelineType(colleagueUuid, currentCycle));

  const { summaryStatus, startTime, endTime, lastUpdatedTime, statistics = {} } = tlPoint || {};

  const status = (Object.keys(statistics)[0] || summaryStatus) as Status;

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
    [summaryStatus, startTime, lastUpdatedTime],
  );

  if (!tlPoint) {
    return null;
  }

  const disabled = isUserView
    ? status === Status.NOT_STARTED
    : [Status.NOT_STARTED, Status.STARTED, Status.DRAFT, Status.OVERDUE].includes(status);

  return (
    <div data-test-id='feedback' className={css(basicTileStyle)}>
      <ReviewWidget
        onClick={() =>
          navigate(
            (state as any)?.prevBackPath ||
              buildPath(
                paramsReplacer(isUserView ? Page.REVIEWS : Page.USER_TL_REVIEW, {
                  ':type': ReviewType.EYR.toLowerCase(),
                  ...(!isUserView && { ':uuid': colleagueUuid }),
                }),
              ),
            {
              state: {
                backPath: pathname,
                prevBackPath: (state as any)?.backPath,
              },
            },
          )
        }
        title={
          //@ts-ignore
          !isAnniversary
            ? t('annual_performance_review', 'Annual performance review')
            : t('anniversary_review', 'Anniversary Review')
        }
        description={
          hasDescription
            ? summaryStatus === Status.APPROVED
              ? t('end_year_review_widget_title_approved', 'Your year-end review is complete.')
              : isAnniversary && summaryStatus === Status.STARTED
              ? t('performance_period_duration', {
                  startDate: formatDateStringFromISO(startTime as string, 'LLL yyyy'),
                  endDate: formatDateTime(minusMonthFromISODateString(endTime as string), 'LLL yyyy'),
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
        //@ts-ignore
        background={!isAnniversary ? background : 'white'}
        shadow={shadow}
        content={
          isAnniversary && summaryStatus === Status.STARTED
            ? t(
                'your_review_due_by_date',
                `Your performance review form is due by ${formatDateTime(
                  minusDayToDateString(DateTime.fromISO(endTime as string)),
                  'dd LLL yyyy',
                )}`,
                { date: formatDateTime(minusDayToDateString(DateTime.fromISO(endTime as string)), 'dd LLL yyyy') },
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

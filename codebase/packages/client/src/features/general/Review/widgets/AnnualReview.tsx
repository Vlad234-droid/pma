import React, { ChangeEvent, FC, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { CreateRule, Rule, useStyle } from '@pma/dex-wrapper';
import {
  getTimelineByCodeSelector,
  isAnniversaryTimelineType,
  uuidCompareSelector,
  colleaguePerformanceCyclesSelector,
  colleagueCurrentCycleSelector,
} from '@pma/store';

import { useTenant } from 'features/general/Permission';
import { buildPath } from 'features/general/Routes';
import { Page } from 'pages';
import { useTranslation } from 'components/Translation';
import { Select } from 'components/Form';
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
import { changeColleagueCurrentCycles } from '@pma/store/src/entities/user/actions';

type Props = {
  colleagueUuid: string;
};

const AnnualReview: FC<Props> = ({ colleagueUuid }) => {
  const [value, setValue] = useState<string | undefined>();
  const { t } = useTranslation();
  const { css } = useStyle();
  const tenant = useTenant();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { pathname, state } = useLocation();
  const isUserView = useSelector(uuidCompareSelector(colleagueUuid));
  const review = useSelector(getTimelineByCodeSelector(ReviewType.EYR, colleagueUuid));
  const isAnniversary = useSelector(isAnniversaryTimelineType(colleagueUuid));
  const cycles = useSelector(colleaguePerformanceCyclesSelector);
  const currentCycle = useSelector(colleagueCurrentCycleSelector);

  const options = useMemo(() => {
    return [...cycles].reverse().map(({ endTime, startTime, uuid }) => ({
      value: uuid,
      label: `${formatDateStringFromISO(startTime, 'yyyy')} - ${formatDateStringFromISO(endTime, 'yyyy')}`,
    }));
  }, [cycles]);

  useEffect(() => {
    if (currentCycle !== 'CURRENT') {
      setValue(currentCycle);
    } else {
      setValue(options[0]?.value);
    }
  }, [options]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setValue(value);
    dispatch(changeColleagueCurrentCycles(value));
  };

  const { summaryStatus, startTime, endTime, lastUpdatedTime } = review || {};

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

  const disabled = isUserView
    ? summaryStatus === Status.NOT_STARTED
    : summaryStatus === Status.NOT_STARTED || summaryStatus === Status.DRAFT;

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
        renderHeader={({ title, titleColor }) => (
          <div className={css(headerStyle)}>
            <div className={css(titleStyle({ color: titleColor }))}>{title}</div>
            <div className={css(selectStyle)}>
              <Select options={options} onChange={handleChange} name={'period'} placeholder={''} value={value} />
            </div>
          </div>
        )}
      />
    </div>
  );
};

export default AnnualReview;

const basicTileStyle: Rule = {
  flex: '1 0 230px',
};

const headerStyle: Rule = {
  display: 'flex',
  gap: '15px',
  justifyContent: 'space-between',
};

const selectStyle: Rule = {
  zIndex: 1,
};

const titleStyle: CreateRule<{ color: string }> =
  ({ color }) =>
  ({ theme }) => ({
    ...theme.font.fixed.f18,
    letterSpacing: '0px',
    fontStyle: 'normal',
    fontWeight: theme.font.weight.bold,
    marginBottom: '12px',
    color,
  });

import React, { FC, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { Rule, useStyle } from '@pma/dex-wrapper';
import { colleagueCurrentCycleSelector, getTimelineByCodeSelector, uuidCompareSelector } from '@pma/store';
import { useNavigate } from 'react-router';
import { useLocation } from 'react-router-dom';

import { useTranslation } from 'components/Translation';
import { ReviewWidget } from '../components/ReviewWidget';
import { getContent } from '../utils';
import { useTenant, Tenant } from 'features/general/Permission';
import { buildPath } from 'features/general/Routes';
import { Page } from 'pages';
import { ReviewType, Status } from 'config/enum';
import { paramsReplacer } from 'utils';

type Props = {
  colleagueUuid: string;
};

const MidYearReview: FC<Props> = ({ colleagueUuid }) => {
  const { t } = useTranslation();
  const { css } = useStyle();
  const tenant = useTenant();
  const navigate = useNavigate();
  const { pathname, state } = useLocation();
  const isUserView = useSelector(uuidCompareSelector(colleagueUuid));
  const currentCycle = useSelector(colleagueCurrentCycleSelector(colleagueUuid));

  const tlPoint = useSelector(getTimelineByCodeSelector(ReviewType.MYR, colleagueUuid, currentCycle));

  const { summaryStatus, startTime, lastUpdatedTime, statistics = {} } = tlPoint || {};

  if (!tlPoint) {
    return null;
  }

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

  const disabled = isUserView
    ? status === Status.NOT_STARTED
    : [Status.NOT_STARTED, Status.DRAFT, Status.OVERDUE].includes(status);

  return (
    <div data-test-id='personal' className={css(basicTileStyle)}>
      <ReviewWidget
        onClick={() =>
          navigate(
            (state as any)?.prevBackPath ||
              buildPath(
                paramsReplacer(isUserView ? Page.REVIEWS : Page.USER_TL_REVIEW, {
                  ':type': ReviewType.MYR.toLowerCase(),
                  ...(!isUserView ? { ':uuid': colleagueUuid } : null),
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
        title={t('mid_year_review', 'Mid-year review')}
        subTitle={
          hasDescription
            ? summaryStatus === Status.APPROVED
              ? t('mid_year_review_widget_title_approved', 'Your mid-year review is complete.')
              : t(
                  'mid_year_review_widget_title',
                  'Complete this once you’ve had your mid-year conversation with your line manager.',
                )
            : undefined
        }
        description={
          hasDescription && summaryStatus !== Status.APPROVED && tenant === Tenant.GENERAL
            ? t(
                'mid_year_review_widget_subtitle',
                'This should be submitted and approved by 7th October, or 14th October if you are an ROI colleague.',
              )
            : undefined
        }
        disabled={disabled}
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

export default MidYearReview;

const basicTileStyle: Rule = {
  flex: '1 0 230px',
};

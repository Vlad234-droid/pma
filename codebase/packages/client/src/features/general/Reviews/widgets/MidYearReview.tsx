import React, { FC, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { Rule, useStyle } from '@pma/dex-wrapper';
import { getTimelineByCodeSelector, uuidCompareSelector } from '@pma/store';
import { useNavigate } from 'react-router';
import { useLocation } from 'react-router-dom';

import { useTranslation } from 'components/Translation';
import { ReviewWidget } from '../components/ReviewWidget';
import { getContent } from 'features/general/Reviews/utils';
import { useTenant } from 'features/general/Permission';
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
  const { pathname } = useLocation();
  const isUserView = useSelector(uuidCompareSelector(colleagueUuid));

  const review = useSelector(getTimelineByCodeSelector(ReviewType.MYR, colleagueUuid));

  const { summaryStatus, startTime, lastUpdatedTime } = review;

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
    <div data-test-id='personal' className={css(basicTileStyle)}>
      <ReviewWidget
        onClick={() =>
          navigate(
            buildPath(
              paramsReplacer(isUserView ? Page.REVIEWS : Page.USER_TL_REVIEW, {
                ':type': ReviewType.MYR.toLowerCase(),
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
        title={t('mid_year_review', 'Mid-year review')}
        description={
          hasDescription
            ? summaryStatus === Status.APPROVED
              ? t('mid_year_review_widget_title_approved', 'Your mid-year review is complete.')
              : t(
                  'mid_year_review_widget_title',
                  'Complete this once you’ve had your mid-year conversation with your line manager.',
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

import React, { FC, useMemo } from 'react';
import { Rule, useStyle } from '@pma/dex-wrapper';
import {
  colleagueCurrentCycleSelector,
  colleagueCycleDataSelector,
  colleagueCycleSelector,
  getTimelineByCodeSelector,
} from '@pma/store';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { useLocation } from 'react-router-dom';

import { useTranslation } from 'components/Translation';
import { ReviewWidget } from '../components/ReviewWidget';
import { getContent } from '../utils';
import { useTenant } from 'features/general/Permission';
import { buildPath } from 'features/general/Routes';
import { paramsReplacer } from 'utils';
import { ReviewType, Status } from 'config/enum';
import { Page } from 'pages';
import { useRolesPermission } from 'hooks/useRolesPermission';

type Props = {
  colleagueUuid: string;
  isUserView: boolean;
};

const YearEndReview: FC<Props> = ({ colleagueUuid, isUserView }) => {
  const { t } = useTranslation();
  const { css } = useStyle();
  const tenant = useTenant();
  const { isPeopleTeam } = useRolesPermission();
  const navigate = useNavigate();
  const { pathname, state } = useLocation();
  const currentCycle = useSelector(colleagueCurrentCycleSelector(colleagueUuid));
  const cycle = isUserView
    ? useSelector(colleagueCycleSelector)
    : useSelector(colleagueCycleDataSelector(colleagueUuid, currentCycle));
  const isCycleCompleted = cycle?.status && [Status.COMPLETED, Status.FINISHED].includes(cycle.status);

  const tlPoint = useSelector(getTimelineByCodeSelector(ReviewType.EYR, colleagueUuid, currentCycle));

  const { summaryStatus, startTime, statistics = {} } = tlPoint || {};

  const status = (Object.keys(statistics)[0] || summaryStatus) as Status;
  const lastUpdatedTime = statistics[status]?.lastUpdatedTime;
  const isLocked = tlPoint?.status === Status.LOCKED;
  const canEditLockedState = isLocked && isPeopleTeam && status === Status.APPROVED;

  if (!tlPoint) {
    return null;
  }

  const [graphic, iconColor, background, shadow, hasDescription, content, buttonText] = useMemo(
    () =>
      getContent(
        {
          status,
          startTime,
          lastUpdatedTime,
          viewOnly: isCycleCompleted || !isUserView,
          canEditLockedState,
        },
        t,
        tenant,
      ),
    [summaryStatus, startTime, lastUpdatedTime, isCycleCompleted, isUserView, isLocked],
  );
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
                  ':type': ReviewType.EYR.toLocaleLowerCase(),
                  ...(!isUserView ? { ':uuid': colleagueUuid } : null),
                }),
              ),
            {
              state: {
                backPath: pathname,
                prevBackPath: (state as any)?.backPath,
                filters: (state as any)?.filters,
              },
            },
          )
        }
        title={t('review_type_description_eyr', 'Year-end review')}
        description={
          hasDescription
            ? summaryStatus === Status.APPROVED
              ? t('end_year_review_widget_title_approved', 'Your year-end review is complete.')
              : t(
                  'end_year_review_widget_title',
                  'Complete this once you’ve had your year-end conversation with your line manager.',
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

export default YearEndReview;

const basicTileStyle: Rule = {
  flex: '1 0 230px',
};

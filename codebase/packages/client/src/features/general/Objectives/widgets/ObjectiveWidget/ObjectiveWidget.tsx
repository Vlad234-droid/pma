import React, { FC } from 'react';
import { Rule } from '@pma/dex-wrapper';
import {
  colleagueCurrentCycleSelector,
  colleagueUUIDSelector,
  getTimelineByReviewTypeSelector,
  timelineTypesAvailabilitySelector,
} from '@pma/store';
import { useNavigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { buildPath } from 'features/general/Routes';
import MainWidgetBase from 'components/MainWidgetBase';
import { useTranslation } from 'components/Translation';
import { getTescoContent } from '../../utils';

import { USER } from 'config/constants';
import { ReviewType, Status } from 'config/enum';

const ObjectiveWidget: FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const colleagueUuid = useSelector(colleagueUUIDSelector);
  const currentCycle = useSelector(colleagueCurrentCycleSelector(colleagueUuid));
  const timelineObjective = useSelector(
    getTimelineByReviewTypeSelector(ReviewType.OBJECTIVE, USER.current, currentCycle),
  );
  const timelineMYR = useSelector(getTimelineByReviewTypeSelector(ReviewType.MYR, USER.current, currentCycle));
  const timelineTypes = useSelector(timelineTypesAvailabilitySelector(USER.current, currentCycle));

  const canShowObjectives = timelineTypes[ReviewType.OBJECTIVE];
  if (!canShowObjectives || !timelineObjective) return null;

  const { statistics, summaryStatus: status } = timelineObjective;

  const date = timelineMYR?.startTime;

  const { subTitle, description, buttonText, backgroundColor, disabled, viewPage, widgetTitle } = getTescoContent(
    { status, statistics, nextReviewDate: date },
    t,
  );

  const handleClick = () => navigate(buildPath(viewPage), { state: { backPath: pathname } });

  return (
    <MainWidgetBase
      title={widgetTitle}
      status={status}
      onClick={handleClick}
      subTitle={subTitle}
      description={description}
      buttonText={buttonText}
      backgroundColor={backgroundColor}
      disabled={disabled}
      isClickable={!disabled && status !== Status.APPROVED}
      mode={!disabled && status !== Status.APPROVED ? 'default' : 'inverse'}
      customStyle={widgetStyles}
    />
  );
};

const widgetStyles: Rule = ({ theme }) => ({
  cursor: 'pointer',
  flex: '4 1 500px',
  fontSize: theme.font.fixed.f16.fontSize,
  lineHeight: theme.font.fixed.f16.lineHeight,
  letterSpacing: '0px',
});

export default ObjectiveWidget;

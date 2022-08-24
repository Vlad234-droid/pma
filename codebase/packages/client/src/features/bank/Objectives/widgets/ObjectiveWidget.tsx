import React, { FC } from 'react';
import { Rule } from '@pma/dex-wrapper';
import {
  getTimelineByReviewTypeSelector,
  metaPDPSelector,
  timelineTypesAvailabilitySelector,
  getTimelinesByReviewTypeSelector,
} from '@pma/store';
import { useNavigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

import Spinner from 'components/Spinner';
import { buildPath } from 'features/general/Routes';
import MainWidgetBase from 'components/MainWidgetBase';
import { useTranslation } from 'components/Translation';
import { getTescoBankContent } from '../utils';

import { USER } from 'config/constants';
import { ReviewType, Status } from 'config/enum';
import { Timeline } from 'config/types';

const ObjectiveWidget: FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const timelinePoints: Timeline[] =
    useSelector(getTimelinesByReviewTypeSelector(ReviewType.QUARTER, USER.current)) || [];

  const visibleTimelinePoints = timelinePoints?.filter(
    (timelinePoint) => timelinePoint.summaryStatus !== Status.NOT_STARTED,
  );

  const timelinePoint: Timeline =
    (visibleTimelinePoints.find(
      (timelinePoint) => timelinePoint.status === Status.STARTED, // todo not handle overdue
    ) as Timeline) || {};

  const timelineMYR = useSelector(getTimelineByReviewTypeSelector(ReviewType.MYR, USER.current));
  const timelineTypes = useSelector(timelineTypesAvailabilitySelector(USER.current));
  const meta = useSelector(metaPDPSelector);

  const { statistics, summaryStatus: status = Status.NOT_STARTED } = timelinePoint;
  const date = timelineMYR?.startTime || null;
  const canShowObjectives = timelineTypes[ReviewType.QUARTER];

  if (!canShowObjectives) return null;
  if (meta.loading) return <Spinner />;

  const { subTitle, description, buttonText, backgroundColor, disabled, viewPage, widgetTitle } = getTescoBankContent(
    { status, statistics: statistics || {}, nextReviewDate: date },
    t,
  );

  const prioritiesCount = Object.values(statistics || {}).reduce((acc, el) => acc + Number(el), 0);

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
      isClickable={!disabled && !prioritiesCount}
      mode={!disabled && !prioritiesCount ? 'default' : 'inverse'}
      customStyle={widgetStyles}
    />
  );
};

const widgetStyles: Rule = ({ theme }) => ({
  flex: '4 1 500px',
  fontSize: theme.font.fixed.f16.fontSize,
  lineHeight: theme.font.fixed.f16.lineHeight,
  letterSpacing: '0px',
});

export default ObjectiveWidget;

import React, { FC, useEffect } from 'react';
import { Styles, useStyle } from '@dex-ddl/core';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  getTimelineByReviewTypeSelector,
  timelineTypesAvailabilitySelector,
  PDPActions,
  earlyDataPDPSelector,
} from '@pma/store';

import { Page } from 'pages';
import { useTranslation } from 'components/Translation';
import SecondaryWidget, { Props as SecondaryWidgetProps } from 'features/SecondaryWidget';
import { default as MainWidget } from '../MainWidget';
import { buildPath } from 'features/Routes';
import { widgetTypes, Props } from './type';
import { ReviewType } from 'config/enum';
import { DATE_STRING_FORMAT, formatDateString } from 'utils';

const Widgets: FC<Props> = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { css } = useStyle();
  const { t } = useTranslation();

  const timelineObjective = useSelector(getTimelineByReviewTypeSelector(ReviewType.OBJECTIVE, 'me'));
  const timelineMYR = useSelector(getTimelineByReviewTypeSelector(ReviewType.MYR, 'me'));
  const timelineTypes = useSelector(timelineTypesAvailabilitySelector('me'));
  const status = timelineObjective?.status;
  const count = timelineObjective?.count || 0;
  const nextReviewDate = timelineMYR?.startTime || null;
  const canShowObjectives = timelineTypes[ReviewType.OBJECTIVE];
  const dates = useSelector(earlyDataPDPSelector) || '';
  const addedDatePDP = dates ? formatDateString(dates, DATE_STRING_FORMAT) : '';

  useEffect(() => {
    dispatch(PDPActions.getEarlyAchievementDate({}));
  }, []);

  const widgets: SecondaryWidgetProps[] = [
    {
      iconGraphic: 'list',
      title: t('personal_development_plan', 'Personal Development Plan'),
      type: widgetTypes.PDP,
      customStyle: { flex: '2 1 110px' },
      onClick: () => navigate(buildPath(Page.PERSONAL_DEVELOPMENT_PLAN)),
    },
    {
      iconGraphic: 'chatSq',
      title: t('feedback', 'Feedback'),
      type: widgetTypes.FEEDBACK,
      customStyle: { flex: '2 1 110px' },
      onClick: () => navigate(buildPath(Page.FEEDBACK)),
    },
    {
      iconGraphic: 'edit',
      title: t('My Notes'),
      type: widgetTypes.NOTES,
      customStyle: { flex: '2 1 110px' },
      onClick: () => navigate(buildPath(Page.NOTES)),
    },
  ];

  return (
    <div className={css(wrapperStyle)}>
      {canShowObjectives && (
        <MainWidget
          status={status}
          count={count}
          nextReviewDate={nextReviewDate}
          customStyle={{ flex: '4 1 500px' }}
          onClick={() => console.log('View')}
        />
      )}

      {widgets.map((props, idx) => {
        if (props.type === widgetTypes.PDP) {
          return <SecondaryWidget key={idx} {...props} date={addedDatePDP} />;
        }

        return <SecondaryWidget key={idx} {...props} />;
      })}
    </div>
  );
};

const wrapperStyle = {
  display: 'flex',
  flexWrap: 'wrap',
  gridGap: '8px',
  marginTop: '8px',
} as Styles;

export default Widgets;

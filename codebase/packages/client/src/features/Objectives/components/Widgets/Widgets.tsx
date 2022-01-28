import React, { FC, HTMLProps } from 'react';
import { useTranslation } from 'components/Translation';
import { Styles, useStyle } from '@dex-ddl/core';
import SecondaryWidget, { Props as SecondaryWidgetProps } from 'features/SecondaryWidget';
import { default as MainWidget } from '../MainWidget';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { ReviewType } from 'config/enum';
import { getTimelineByReviewTypeSelector, timelineTypesAvailabilitySelector } from '@pma/store';
import { buildPath } from 'features/Routes';
import { Page } from 'pages';

export type MainWidgetProps = {};

type Props = HTMLProps<HTMLInputElement> & MainWidgetProps;

const Widgets: FC<Props> = () => {
  const navigate = useNavigate();
  const { css } = useStyle();
  const { t } = useTranslation();

  const timelineObjective = useSelector(getTimelineByReviewTypeSelector(ReviewType.OBJECTIVE));
  const timelineMYR = useSelector(getTimelineByReviewTypeSelector(ReviewType.MYR));
  const timelineTypes = useSelector(timelineTypesAvailabilitySelector);

  const status = timelineObjective?.status;
  const count = timelineObjective?.count || 0;
  const nextReviewDate = timelineMYR?.startTime || null;
  const canShowObjectives = timelineTypes[ReviewType.OBJECTIVE];

  const widgets: SecondaryWidgetProps[] = [
    {
      iconGraphic: 'list',
      title: t('personal_development_plan', 'Personal Development Plan'),
      data: t('personal_development_plan_date', 'Added 04 Apr 2021', { date: new Date(2021, 4, 4) }),
      customStyle: { flex: '2 1 110px' },
      onClick: () => navigate(buildPath(Page.PERSONAL_DEVELOPMENT_PLAN)),
    },
    {
      iconGraphic: 'chatSq',
      title: t('feedback', 'Feedback'),
      data: t('feedback_date', 'Last updated Apr 2021', { date: new Date(2021, 4, 4) }),
      customStyle: { flex: '2 1 110px' },
      onClick: () => navigate(buildPath(Page.FEEDBACK)),
    },
    {
      iconGraphic: 'edit',
      title: t('My Notes'),
      date: t('Last updated Apr 2021', { date: new Date(2021, 4, 4) }),
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

      {widgets.map((props, idx) => (
        <SecondaryWidget key={idx} {...props} />
      ))}
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

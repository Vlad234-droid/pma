import React, { FC, HTMLProps } from 'react';
import { useTranslation } from 'components/Translation';
import { Styles, useStyle } from '@dex-ddl/core';
import SecondaryWidget, { Props as SecondaryWidgetProps } from '../SecondaryWidget';
import MainWidget from '../MainWidget';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { ReviewType } from 'config/enum';
import { getTimelineByReviewTypeSelector, timelineTypesAvailabilitySelector } from '@pma/store';

export type MainWidgetProps = {};

type Props = HTMLProps<HTMLInputElement> & MainWidgetProps;

const Widgets: FC<Props> = () => {
  const history = useHistory();
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
      iconGraphic: 'add',
      title: t('personal_development_plan', 'Personal Development Plan'),
      date: t('personal_development_plan_date', 'Added 04 Apr 2021', { date: new Date(2021, 4, 4) }),
      customStyle: { flex: '2 1 110px' },
      onClick: () => console.log(),
    },
    {
      iconGraphic: 'chatSq',
      title: t('feedback', 'Feedback'),
      date: t('feedback_date', 'Last updated Apr 2021', { date: new Date(2021, 4, 4) }),
      customStyle: { flex: '2 1 110px' },
      onClick: () => history.push('feedback'),
    },
    {
      iconGraphic: 'edit',
      title: t('My notes'),
      date: t('Last updated Apr 2021', { date: new Date(2021, 4, 4) }),
      customStyle: { flex: '2 1 110px' },
      onClick: () => console.log(),
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

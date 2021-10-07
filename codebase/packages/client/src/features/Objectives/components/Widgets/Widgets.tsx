import React, { FC, HTMLProps } from 'react';
import { useTranslation } from 'components/Translation';
import { useStyle, Styles } from '@dex-ddl/core';

import SecondaryWidget, { Props as SecondaryWidgetProps } from '../SecondaryWidget';
import MainWidget from '../MainWidget';

export type MainWidgetProps = {};

type Props = HTMLProps<HTMLInputElement> & MainWidgetProps;

const Widgets: FC<Props> = () => {
  const { css } = useStyle();
  const { t } = useTranslation();
  const widgets: SecondaryWidgetProps[] = [
    {
      iconGraphic: 'add',
      title: t('personal_development_plan', 'Personal development plan'),
      date: t('personal_development_plan_date', 'Added 04 Apr 2021', { date: new Date(2021, 4, 4) }),
      customStyle: { flex: '2 1 110px' },
      onClick: () => alert('View1'),
    },
    {
      iconGraphic: 'chatSq',
      title: t('feedback', 'Feedback'),
      date: t('feedback_date', 'Last updated Apr 2021', { date: new Date(2021, 4, 4) }),
      customStyle: { flex: '2 1 110px' },
      onClick: () => alert('View2'),
    },
    {
      iconGraphic: 'alert',
      title: t('overdue_actions', 'Overdue actions'),
      date: t('collegue_reminders', 'Collegue reminders'),
      customStyle: { flex: '2 1 110px' },
      onClick: () => alert('View3'),
    },
  ];

  return (
    <div className={css(wrapperStyle)}>
      <MainWidget customStyle={{ flex: '4 1 500px' }} onClick={() => console.log('View')} count={3} />
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

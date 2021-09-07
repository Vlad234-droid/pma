import React, { FC, HTMLProps } from 'react';
import { useStyle, Styles } from '@dex-ddl/core';

import SecondaryWidget, { Props as SecondaryWidgetProps } from '../SecondaryWidget';
import MainWidget from '../MainWidget';

export type MainWidgetProps = {};

type Props = HTMLProps<HTMLInputElement> & MainWidgetProps;

const widgets: SecondaryWidgetProps[] = [
  {
    iconGraphic: 'add',
    title: 'Personal development plan',
    date: 'Added 04 Apr 2021',
    customStyle: { flex: '2 1 110px' },
    onClick: () => alert('View1'),
  },
  {
    iconGraphic: 'chatSq',
    title: 'Feedback',
    date: 'Last updated Apr 2021',
    customStyle: { flex: '2 1 110px' },
    onClick: () => alert('View2'),
  },
  {
    iconGraphic: 'account',
    title: 'Check-ins',
    date: 'Last updated Apr 2021',
    customStyle: { flex: '2 1 110px' },
    onClick: () => alert('View3'),
  },
];

const Widgets: FC<Props> = () => {
  const { css } = useStyle();

  return (
    <div className={css(wrapperStyle)}>
      <MainWidget customStyle={{ flex: '4 1 500px' }} onClick={() => alert('View')} count={3} />
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

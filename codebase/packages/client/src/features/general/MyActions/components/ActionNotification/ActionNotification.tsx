import React, { FC } from 'react';
import { Notification } from 'components/Notification';

type Props = {
  text: string;
};

export const ActionNotification: FC<Props> = ({ text }) => (
  <Notification
    graphic='information'
    iconColor='pending'
    text={text}
    customStyle={{
      background: '#FFDBC2',
    }}
  />
);

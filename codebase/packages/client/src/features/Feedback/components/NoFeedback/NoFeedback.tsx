import React, { FC } from 'react';
import { TileWrapper } from 'components/Tile';
import { Notification } from 'components/Notification';

const NoFeedback: FC = () => {
  return (
    <TileWrapper
      customStyle={{
        padding: '24px 24px 24px 24px',
        maxWidth: '333px',
      }}
    >
      <Notification
        closable={false}
        graphic='information'
        iconColor='link'
        text='No feedback records to be displayed.'
        customStyle={{
          background: '#F3F9F7',
        }}
      />
    </TileWrapper>
  );
};

export default NoFeedback;

import React, { FC } from 'react';
import { TileWrapper } from 'components/Tile';
import { Notification } from 'components/Notification';
import { useTranslation } from 'components/Translation';

const NoFeedback: FC = () => {
  const { t } = useTranslation();

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
        text={t('no_feedback_records_to_be_displayed', 'No feedback records to be displayed.')}
        customStyle={{
          background: '#F3F9F7',
        }}
      />
    </TileWrapper>
  );
};

export default NoFeedback;

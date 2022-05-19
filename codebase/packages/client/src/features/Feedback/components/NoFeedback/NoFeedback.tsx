import React, { FC } from 'react';
import { TileWrapper } from 'components/Tile';
import { Notification } from 'components/Notification';
import { useTranslation } from 'components/Translation';
import { theme } from '@pma/dex-wrapper';

const NoFeedback: FC = () => {
  const { t } = useTranslation();

  return (
    <TileWrapper
      customStyle={{
        padding: '24px 24px 24px 24px',
        maxWidth: '100%',
      }}
    >
      <Notification
        closable={false}
        graphic='information'
        iconColor='link'
        text={t('no_feedback_records_to_be_displayed', 'No feedback records to be displayed.')}
        customStyle={{
          background: theme.colors.tescoLightGray,
        }}
      />
    </TileWrapper>
  );
};

export default NoFeedback;

import React, { FC } from 'react';
import { useStyle } from '@dex-ddl/core';
import { Header } from 'components/Header';
import { TileWrapper } from 'components/Tile';
import { EmailNotifications } from 'features/EmailNotifications';

export const TEST_ID = 'objectives-pave';

const Settings: FC = () => {
  const { css } = useStyle();

  return (
    <div className={css({ margin: '8px' })}>
      <Header title='Settings' />
      <TileWrapper>
        <EmailNotifications />
      </TileWrapper>
    </div>
  );
};

export default Settings;

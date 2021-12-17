import React, { FC } from 'react';
import { useStyle } from '@dex-ddl/core';
import { TileWrapper } from 'components/Tile';
import { EmailNotifications } from 'features/EmailNotifications';

export const TEST_ID = 'objectives-pave';

const Settings: FC = () => {
  const { css } = useStyle();

  return (
    <div>
      <div
        className={css({
          display: 'flex',
          flexWrap: 'wrap',
          gridGap: '8px',
        })}
      >
        <div className={css({ flex: '3 1 375px', display: 'flex', flexDirection: 'column', gap: '8px' })}>
          <TileWrapper>
            <EmailNotifications />
          </TileWrapper>
        </div>
        <div
          className={css({
            flex: '1 0 216px',
          })}
        />
      </div>
    </div>
  );
};

export default Settings;

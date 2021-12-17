import React, { FC } from 'react';
import { useStyle } from '@dex-ddl/core';
import { Actions } from 'features/Actions';

const MyTeam: FC = () => {
  const { css } = useStyle();

  return (
    <div className={css({ margin: '8px' })}>
      <Actions />
    </div>
  );
};

export default MyTeam;

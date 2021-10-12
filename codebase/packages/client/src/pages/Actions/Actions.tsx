import React, { FC } from 'react';
import { useStyle } from '@dex-ddl/core';
import { Header } from 'components/Header';
import { Actions } from 'features/Actions';

const MyTeam: FC = () => {
  const { css } = useStyle();

  return (
    <div className={css({ margin: '8px' })}>
      <Header title='Actions' />
      <Actions />
    </div>
  );
};

export default MyTeam;

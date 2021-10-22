import React, { FC } from 'react';
import { useStyle } from '@dex-ddl/core';
import { Header } from 'components/Header';

const CreatePerformanceCycle: FC = () => {
  const { css } = useStyle();

  return (
    <div className={css({ margin: '8px' })}>
      <Header title='Create Performance Cycle' />
    </div>
  );
};

export default CreatePerformanceCycle;

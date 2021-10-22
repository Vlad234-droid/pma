import React, { FC } from 'react';
import { useStyle } from '@dex-ddl/core';
import { Header } from 'components/Header';

const PerformanceCycleAdministration: FC = () => {
  const { css } = useStyle();

  return (
    <div className={css({ margin: '8px' })}>
      <Header title='Performance Cycle Administration' />
    </div>
  );
};

export default PerformanceCycleAdministration;

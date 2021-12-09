import React, { FC } from 'react';
import { Header } from 'components/Header';
import { useStyle } from '@dex-ddl/core';
import { PerformanceCycleForm } from '../../features/PerformanceCycle/components/PerformanceCycleForm';

const CreatePerformanceCycle: FC = () => {
  const { css } = useStyle();
  return (
    <div className={css({ margin: '8px' })}>
      <Header title='Create Performance Cycle' />
      <PerformanceCycleForm />
    </div>
  );
};

export default CreatePerformanceCycle;

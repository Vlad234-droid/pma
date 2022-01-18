import React, { FC } from 'react';
import { useStyle } from '@dex-ddl/core';

const Graph: FC = () => {
  const { css } = useStyle();

  return (
    <div className={css({ width: '500px', padding: '100px 40px' })}>
      Calibration submissions graph
    </div>
  );
};

export default Graph;

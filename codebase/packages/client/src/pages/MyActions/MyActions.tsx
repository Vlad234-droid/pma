import React, { FC } from 'react';
import { useStyle } from '@dex-ddl/core';
import { Actions } from 'features/Actions';

const MyActions: FC = () => {
  const { css } = useStyle();

  return (
    <div data-test-id={'MyActions'} className={css({ margin: '8px' })}>
      <Actions />
    </div>
  );
};

export default MyActions;

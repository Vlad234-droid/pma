import React, { FC } from 'react';
import { useStyle } from '@pma/dex-wrapper';
import { Actions } from 'features/general/Actions';

const MyActions: FC = () => {
  const { css } = useStyle();

  return (
    <div data-test-id={'MyActions'} className={css({ margin: '8px' })}>
      <Actions />
    </div>
  );
};

export default MyActions;

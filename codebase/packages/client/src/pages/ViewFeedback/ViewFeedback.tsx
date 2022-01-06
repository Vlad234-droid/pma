import React, { FC } from 'react';
import { useStyle } from '@dex-ddl/core';
import ViewFeedbackComp from 'features/ViewFeedback';

const ViewFeedback: FC = () => {
  const { css } = useStyle();

  return (
    <div className={css({ margin: '22px 42px 0px 40px' })}>
      <ViewFeedbackComp />
    </div>
  );
};

export default ViewFeedback;

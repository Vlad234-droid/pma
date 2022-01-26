import React, { FC } from 'react';
import { useStyle } from '@dex-ddl/core';
import ViewFeedback from 'features/ViewFeedback';

const ViewFeedbackPage: FC = () => {
  const { css } = useStyle();

  return (
    <div className={css({ margin: '22px 42px 0px 40px' })}>
      <ViewFeedback />
    </div>
  );
};

export default ViewFeedbackPage;

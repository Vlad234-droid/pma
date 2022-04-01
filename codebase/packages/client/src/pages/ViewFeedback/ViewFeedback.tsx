import React, { FC } from 'react';
import { useStyle } from '@pma/dex-wrapper';
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

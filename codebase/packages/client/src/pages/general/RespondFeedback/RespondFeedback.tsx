import React, { FC } from 'react';
import { useStyle } from '@pma/dex-wrapper';
import { RespondFeedback } from 'features/general/RespondFeedback';

export const RESPOND_FEEDBACK = 'respond_feedback';

const RespondFeedbackPage: FC = () => {
  const { css } = useStyle();

  return (
    <div className={css({ margin: '22px 42px 0px 40px' })} data-test-id={RESPOND_FEEDBACK}>
      <RespondFeedback />
    </div>
  );
};

export default RespondFeedbackPage;

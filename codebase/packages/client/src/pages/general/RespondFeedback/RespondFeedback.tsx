import React, { FC } from 'react';
import { useStyle } from '@pma/dex-wrapper';
import { RespondFeedbackContainer } from 'features/general/RespondFeedbackContainer';

export const RESPOND_FEEDBACK = 'respond_feedback';

const RespondFeedback: FC = () => {
  const { css } = useStyle();

  return (
    <div className={css({ margin: '22px 42px 0px 40px' })} data-test-id={RESPOND_FEEDBACK}>
      <RespondFeedbackContainer />
    </div>
  );
};

export default RespondFeedback;

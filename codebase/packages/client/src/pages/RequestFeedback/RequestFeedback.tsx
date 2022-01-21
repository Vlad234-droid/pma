import React, { FC } from 'react';
import RequestFeedback from 'features/RequestFeedback';

const REQUEST_FEEDBACK = 'request-feedback';

const RequestFeedbackPage: FC = () => {
  return (
    <div data-test-id={REQUEST_FEEDBACK}>
      <RequestFeedback />
    </div>
  );
};

export default RequestFeedbackPage;

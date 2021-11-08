import React, { FC } from 'react';
import { useStyle, Rule } from '@dex-ddl/core';
import { Header } from '../../components/Header';
import { RespondFeedbackContainer } from '../../features/RespondFeedbackContainer';

export const RESPOND_FEEDBACK = 'respond_feedback';

const RespondFeedback: FC = () => {
  const { css } = useStyle();

  return (
    <div className={css({ margin: '22px 42px 0px 40px' })} data-test-id={RESPOND_FEEDBACK}>
      <Header title='Respond to feedback requests' styles={titleStyle} customSize={true} />
      <RespondFeedbackContainer />
    </div>
  );
};

const titleStyle: Rule = {
  fontSize: '24px',
};

export default RespondFeedback;

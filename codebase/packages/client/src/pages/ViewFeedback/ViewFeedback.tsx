import React, { FC } from 'react';
import { useStyle, Rule } from '@dex-ddl/core';
import { Header } from '../../components/Header';
import ViewFeedbackComp from '../../features/ViewFeedback';

const ViewFeedback: FC = () => {
  const { css } = useStyle();

  return (
    <div className={css({ margin: '22px 42px 0px 40px' })}>
      <Header title='View feedback' styles={titleStyle} customSize={true} />
      <ViewFeedbackComp />
    </div>
  );
};

const titleStyle: Rule = {
  fontSize: '24px',
};

export default ViewFeedback;

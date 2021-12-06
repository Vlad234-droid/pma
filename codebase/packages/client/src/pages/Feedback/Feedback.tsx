import React, { FC } from 'react';
import { Rule, useStyle } from '@dex-ddl/core';
import { Header } from '../../components/Header';
import { FeedbackActions } from '../../features/Feedback';

export const FEED_BACK_PAGE = 'feed_back_page';

const FeedBack: FC = () => {
  const { css } = useStyle();

  return (
    <div className={css({ margin: '22px 42px 0px 40px' })} data-test-id={FEED_BACK_PAGE}>
      <Header title='Feedback' styles={titleStyle} customSize={true} />
      <FeedbackActions />
    </div>
  );
};

const titleStyle: Rule = {
  fontSize: '24px',
};

export default FeedBack;

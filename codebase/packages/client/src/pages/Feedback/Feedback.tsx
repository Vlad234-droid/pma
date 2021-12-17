import React, { FC } from 'react';
import { useStyle } from '@dex-ddl/core';
import { FeedbackActions } from '../../features/Feedback';

export const FEED_BACK_PAGE = 'feed_back_page';

const FeedBack: FC = () => {
  const { css } = useStyle();

  return (
    <div className={css({ margin: '22px 42px 0px 40px' })} data-test-id={FEED_BACK_PAGE}>
      <FeedbackActions />
    </div>
  );
};

export default FeedBack;

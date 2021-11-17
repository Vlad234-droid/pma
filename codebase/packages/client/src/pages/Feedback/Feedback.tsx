import React, { FC, useEffect } from 'react';
import { Rule, useStyle } from '@dex-ddl/core';
import { Header } from '../../components/Header';
import { FeedbackActions } from '../../features/Feedback';
import { useDispatch } from 'react-redux';
import { TestActions } from '../../../../store';

export const FEED_BACK_PAGE = 'feed_back_page';

const FeedBack: FC = () => {
  const { css } = useStyle();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(TestActions.addTest({ id: 'id', title: 'title', description: 'description' }));
  }, []);

  return (
    <div className={css({ margin: '22px 42px 0px 40px' })} data-test-id={FEED_BACK_PAGE}>
      {/* <div ref={myElementRef}>hello</div><button onClick={() => handleClick()}>Button</button> */}
      <Header title='Feedback' styles={titleStyle} customSize={true} />

      <FeedbackActions />
    </div>
  );
};

const titleStyle: Rule = {
  fontSize: '24px',
};

export default FeedBack;

import React, { FC, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { FeedbackActions as FeedbackActionsGet } from '@pma/store';
import { Rule, useStyle } from '@pma/dex-wrapper';
import { useNavigate } from 'react-router';
import { getCards } from './config';
import { FeedbackCard } from './components';

export const FEEDBACK_ACTIONS = 'feedback_actions';

const Feedback: FC = () => {
  const { css } = useStyle();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(FeedbackActionsGet.getRequestedFeedbacks({}));
    dispatch(FeedbackActionsGet.getGivenFeedbacks({}));
  }, []);

  return (
    <div>
      <div className={css(cardBlockStyle)}>
        {getCards(navigate).map((item) => (
          <FeedbackCard {...item} key={item.id} />
        ))}
      </div>
    </div>
  );
};

const cardBlockStyle: Rule = () => {
  return {
    display: 'flex',
    justifyContent: 'space-between',
    gap: '8px',
    flexWrap: 'wrap',
    alignItems: 'center',
    flexBasis: '400px',
    marginTop: '16px',
  };
};

export default Feedback;

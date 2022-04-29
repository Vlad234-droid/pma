import React, { FC } from 'react';
import { Rule, useStyle } from '@pma/dex-wrapper';

type ItemProps = {
  item: any;
  title: string;
  itemCodeText: string;
};

export const TEST_ID = 'feedback-item-test-id';

const FeedbackItem: FC<ItemProps> = ({ item, title, itemCodeText }) => {
  const { css } = useStyle();

  return (
    <>
      <div data-test-id={TEST_ID} className={css(infoBlockStyle)}>
        <h3>{title}</h3>
        {item.feedbackItems.map((question) => {
          return (
            <p className={css(wordBreakStyle)} key={question.code}>
              {question.code === itemCodeText ? (question.content !== '' ? question.content : '-') : ''}
            </p>
          );
        })}
      </div>
    </>
  );
};

const wordBreakStyle: Rule = {
  wordBreak: 'break-all',
};

const infoBlockStyle: Rule = ({ theme }) => {
  return {
    marginBottom: theme.spacing.s4,
    '& > h3': {
      margin: theme.spacing.s0,
      fontWeight: theme.font.weight.bold,
      fontSize: theme.spacing.s3_5,
    },
    '& > p': {
      margin: theme.spacing.s0,
      fontSize: theme.spacing.s3_5,
    },
  };
};

export default FeedbackItem;

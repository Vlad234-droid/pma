import React, { FC } from 'react';
import { useStyle, Rule, Styles } from '@dex-ddl/core';
import { getReviewByUuidS } from '@pma/store';
import { useSelector } from 'react-redux';
import { getPropperTargetType } from '../config';
import { Trans } from 'components/Translation';

type CompletedNotesProps = {
  item: any;
};

const CompletedNotes: FC<CompletedNotesProps> = ({ item }) => {
  const { css } = useStyle();

  const review = useSelector(getReviewByUuidS) || [];

  return (
    <>
      <h3 className={css(ShareResondStyle, { marginBottom: '8px' })}>
        {getPropperTargetType(item.targetType, item.targetId, item.feedbackItems, review)}
      </h3>
      <p className={css(QuestionStyle, { marginTop: '8px', marginBottom: '8px' })}>
        {item?.feedbackItems?.find((feed) => feed?.code === 'comment_to_request')?.content ?? ''}
      </p>
      <div className={css(InfoBlockStyle)}>
        <h3>
          <Trans i18nKey='looking_back_at_what_you_seen'>
            Looking back at what you&apos;ve seen recently, what would you like to say to this colleague about what
            they&apos;ve delivered or how they&apos;ve gone about it?
          </Trans>
        </h3>
        {item.feedbackItems.map((question) => {
          return <p key={question.code}>{question.code === 'Question 1' && question.content}</p>;
        })}
      </div>
      <div className={css(InfoBlockStyle)}>
        <h3>
          <Trans i18nKey='looking_forward_what_should_this_colleague_do_more'>
            Looking forward, what should this colleague do more (or less) of in order to be at their best?
          </Trans>
        </h3>
        {item.feedbackItems.map((question) => {
          return <p key={question.code}>{question.code === 'Question 2' && question.content}</p>;
        })}
      </div>
      <div className={css(InfoBlockStyle)}>
        <h3>Add any other comments you would like to share with your colleague.</h3>
        {item.feedbackItems.map((question) => {
          return <p key={question.code}>{question.code === 'Anything else?' && question.content}</p>;
        })}
      </div>
    </>
  );
};

const InfoBlockStyle: Rule = {
  marginBottom: '16px',
  '& > h3': {
    margin: '0px',
    fontWeight: 'bold',
    fontSize: '14px',
  },
  '& > p': {
    margin: '0px',
    fontSize: '14px',
  },
} as Styles;

const ShareResondStyle: Rule = {
  fontWeight: 'bold',
  fontSize: '18px',
  lineHeight: '22px',
  color: '#00539F',
  margin: '0px 0px 0px 0px',
};
const QuestionStyle: Rule = {
  fontWeight: 'normal',
  fontSize: '16px',
  lineHeight: '20px',
  margin: '0px',
};
export default CompletedNotes;

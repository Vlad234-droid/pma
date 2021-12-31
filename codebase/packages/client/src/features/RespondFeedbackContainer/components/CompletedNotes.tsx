import React, { FC } from 'react';
import { useStyle, Rule, Styles } from '@dex-ddl/core';
import { TargetTypeReverse, TargetFeedbackKeys } from 'config/enum';
import { getReviewByUuidS } from '@pma/store';
import { useSelector } from 'react-redux';

type CompletedNotesProps = {
  item: any;
};

const CompletedNotes: FC<CompletedNotesProps> = ({ item }) => {
  const { css } = useStyle();

  const review = useSelector(getReviewByUuidS) || [];

  const getPropperTargetType = (targetType, targetId, item) => {
    const { feedbackItems } = item;

    const capitalType =
      TargetTypeReverse[targetType] &&
      TargetTypeReverse[targetType].charAt(0).toUpperCase() + TargetTypeReverse[targetType].slice(1);

    if (capitalType && targetType && targetId) {
      let targetTypeStr = '';
      review.forEach((item) => {
        if (item.uuid === targetId) {
          targetTypeStr = item.title;
        }
      });

      return `“${capitalType}${targetTypeStr !== '' ? ':' : ''}${`${
        targetTypeStr !== '' ? ` ${targetTypeStr}` : `${targetTypeStr}`
      }`}”`;
    }
    if (feedbackItems.length) {
      const value =
        feedbackItems?.[feedbackItems?.findIndex((item) => item?.code === TargetFeedbackKeys[targetType])]?.content ??
        '';
      return `“${capitalType}${value !== '' ? ':' : ''}${`${value !== '' ? ` ${value}` : `${value}`}`}”`;
    }
    return '';
  };

  return (
    <>
      <h3 className={css(ShareResondStyle, { marginBottom: '8px' })}>
        {getPropperTargetType(item.targetType, item.targetId, item)}
      </h3>
      <p className={css(QuestionStyle, { marginTop: '8px', marginBottom: '8px' })}>
        {item?.feedbackItems?.find((feed) => feed?.code === 'comment_to_request')?.content ?? ''}
      </p>
      <div className={css(InfoBlockStyle)}>
        <h3>Question 1</h3>
        {item.feedbackItems.map((question) => {
          return <p key={question.code}>{question.code === 'Question 1' && question.content}</p>;
        })}
      </div>
      <div className={css(InfoBlockStyle)}>
        <h3>Question 2</h3>
        {item.feedbackItems.map((question) => {
          return <p key={question.code}>{question.code === 'Question 2' && question.content}</p>;
        })}
      </div>
      <div className={css(InfoBlockStyle)}>
        <h3>Anything else?</h3>
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

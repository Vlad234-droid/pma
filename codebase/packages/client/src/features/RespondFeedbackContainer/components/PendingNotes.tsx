import React, { FC } from 'react';
import { useStyle, Rule } from '@dex-ddl/core';
import { TargetTypeReverse, TargetFeedbackKeys } from 'config/enum';
import { getReviewByUuidS } from '@pma/store';
import { useSelector } from 'react-redux';

type PendingNotesProps = {
  item: any;
};

const PendingNotes: FC<PendingNotesProps> = ({ item }) => {
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
      <div className={css({ marginBottom: '16px' })}>
        <h3 className={css(TileTitle)}>
          This colleague has requested feedback from you. Fill out the questions below to share your feedback.
        </h3>
        <h3 className={css(SphereResondStyle)}>{getPropperTargetType(item.targetType, item.targetId, item)}</h3>
        <p className={css(QuestionStyle, { marginTop: '4px' })}>
          {item?.feedbackItems?.find((feed) => feed?.code === 'comment_to_request')?.content ?? ''}
        </p>
      </div>

      <p className={css(QuestionStyle)}>Let the colleague know how they&apos;re doing</p>
    </>
  );
};

const TileTitle: Rule = {
  fontWeight: 'normal',
  fontSize: '16px',
  lineHeight: '20px',
  margin: '0px 0px 4px 0px',
};

const SphereResondStyle: Rule = {
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

export default PendingNotes;
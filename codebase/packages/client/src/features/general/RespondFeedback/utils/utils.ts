import { TargetFeedbackKeys, TargetTypeReverse, Tesco } from 'config/enum';

export const getPropperTargetType = (targetType, targetId, feedbackItems, review) => {
  if (TargetTypeReverse[targetType] && targetType && targetId) {
    let tescoBankReview = targetId === Tesco.TescoBank ? targetId : 'Review not found';
    review.forEach((item) => {
      if (item.uuid === targetId) tescoBankReview = item.title;
    });

    return `“${TargetTypeReverse[targetType]}${tescoBankReview !== '' ? ':' : ''}${`${
      tescoBankReview !== '' ? ` ${tescoBankReview}` : `${tescoBankReview}`
    }`}”`;
  }
  if (feedbackItems?.length && TargetTypeReverse[targetType]) {
    const value = feedbackItems?.find((item) => item?.code === TargetFeedbackKeys[targetType])?.content ?? '';
    return `“${TargetTypeReverse[targetType]}${value !== '' ? ':' : ''}${`${
      value !== '' ? ` ${value}` : `${value}`
    }`}”`;
  }
  return '';
};

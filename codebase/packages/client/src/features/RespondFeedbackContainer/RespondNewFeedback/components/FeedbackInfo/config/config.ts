import { TargetTypeReverse, TargetFeedbackKeys, Tesco } from 'config/enum';

export const getPropperTargetType = (targetType, targetId, review, feedbackItems) => {
  const capitalType =
    TargetTypeReverse[targetType] &&
    TargetTypeReverse[targetType].charAt(0).toUpperCase() + TargetTypeReverse[targetType].slice(1);

  if (capitalType && targetType && targetId) {
    let targetTypeStr = targetId === Tesco.TescoBank ? targetId : '';

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
    const value = feedbackItems?.find((item) => item?.code === TargetFeedbackKeys[targetType])?.content ?? '';
    return `“${capitalType}${value !== '' ? ':' : ''}${`${value !== '' ? ` ${value}` : `${value}`}`}”`;
  }
  return '';
};

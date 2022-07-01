export enum REVIEW_MODIFICATION_MODE {
  NONE,
  SINGLE,
  MULTI,
}

export const reviewModificationMode = (countReviews: number, objectiveSchema: any) => {
  const { markup = { max: 0, min: 0 } } = objectiveSchema;

  if (countReviews >= markup.max) {
    return REVIEW_MODIFICATION_MODE.NONE;
  } else if (countReviews >= markup.min && markup.max > markup.min) {
    return REVIEW_MODIFICATION_MODE.SINGLE;
  }

  return REVIEW_MODIFICATION_MODE.MULTI;
};

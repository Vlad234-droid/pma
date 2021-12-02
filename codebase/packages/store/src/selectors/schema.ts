import { createSelector } from 'reselect';
//@ts-ignore
import { RootState } from 'typesafe-actions';
import { ReviewType } from '@pma/client/src/config/enum';

//@ts-ignore
export const schemaSelector = (state: RootState) => state.schema;
//TODO: remove
export const getObjectiveSchema = createSelector(schemaSelector, (schema: any) => {
  if (!schema?.cycle) {
    return { ...schema };
  }
  const {
    cycle: { timelinePoints = [] },
  } = schema;
  const review = timelinePoints.find((review) => review.reviewType === ReviewType.OBJECTIVE);

  const reviewMarkup = {
    ...schema,
    ...(review?.form?.json ? JSON.parse(review.form.json) : {}),
    markup: {
      min: Number(review?.properties?.pm_review_min || 0),
      max: Number(review?.properties?.pm_review_max || 0),
    },
  };
  return reviewMarkup;
});

export const getAllReviewSchemas = createSelector(schemaSelector, (schema: any) => {
  if (!schema?.cycle) {
    return schema;
  }
  const {
    cycle: { timelinePoints = [] },
  } = schema;
  const reviews: any = {};
  timelinePoints?.forEach((timelinePoint) => {
    if (timelinePoint.reviewType) {
      reviews[timelinePoint.reviewType] = {
        ...schema,
        ...(timelinePoint?.form?.json ? JSON.parse(timelinePoint.form.json) : {}),
        markup: {
          min: Number(timelinePoint?.properties?.pm_review_min || 0),
          max: Number(timelinePoint?.properties?.pm_review_max || 0),
        },
      };
    }
  });

  return reviews;
});

export const getReviewSchema = (type: ReviewType) =>
  createSelector(schemaSelector, (schema: any) => {
    if (!schema?.cycle) {
      return { ...schema };
    }
    const {
      cycle: { timelinePoints = [] },
    } = schema;
    const review = timelinePoints.find((review) => review.reviewType === type);

    const reviewMarkup = {
      ...schema,
      ...(review?.form?.json ? JSON.parse(review.form.json) : {}),
      markup: {
        min: Number(review?.properties?.pm_review_min || 0),
        max: Number(review?.properties?.pm_review_max || 0),
      },
    };
    return reviewMarkup;
  });

export const getSchemaSelector = (reviewType: ReviewType) =>
  createSelector(schemaSelector, (schema: any) => {
    if (!schema?.cycle) {
      return { ...schema };
    }
    const {
      cycle: { timelinePoints = [] },
    } = schema;
    const review = timelinePoints.find((review) => review.reviewType === reviewType);

    const reviewMarkup = {
      ...schema,
      ...(review?.form?.json ? JSON.parse(review.form.json) : {}),
      markup: {
        min: Number(review?.properties?.pm_review_min || 0),
        max: Number(review?.properties?.pm_review_max || 0),
      },
    };
    return reviewMarkup;
  });
export const schemaMetaSelector = createSelector(schemaSelector, ({ meta }) => meta);

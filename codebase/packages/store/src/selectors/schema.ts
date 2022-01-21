import { createSelector } from 'reselect';
//@ts-ignore
import { RootState } from 'typesafe-actions';
import { ReviewType, PDPType } from '@pma/client/src/config/enum';

//@ts-ignore
export const schemaSelector = (state: RootState) => state.schema;
export const schemaPDPSelector = (state: RootState) => state.pdp;

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
  if (!schema?.metadata?.cycle) {
    return { ...schema };
  }
  const {
    metadata: {
      cycle: { timelinePoints = [] },
    },
  } = schema;
  const reviews: any = {};
  timelinePoints?.forEach((timelinePoint) => {
    if (timelinePoint.reviewType) {
      const form = schema?.forms.find((form) => form.id === timelinePoint.form.id);
      reviews[timelinePoint.reviewType] = {
        ...schema,
        ...(form?.json ? JSON.parse(form.json) : {}),
        markup: {
          min: Number(timelinePoint?.properties?.pm_review_min || 0),
          max: Number(timelinePoint?.properties?.pm_review_max || 0),
        },
      };
    }
  });

  return reviews;
});

export const getReviewSchema = (type: ReviewType, withForms = true) =>
  createSelector(schemaSelector, (schema: any) => {
    let form;
    if (!schema?.metadata?.cycle) {
      return { ...schema };
    }
    const {
      metadata: {
        cycle: { timelinePoints = [] },
      },
    } = schema;
    const review = timelinePoints.find((review) => review.reviewType === type);

    if (withForms && schema?.forms?.length && review?.form) {
      form = schema?.forms.find((form) => form.id === review.form.id);
    }

    const reviewMarkup = {
      ...schema,
      ...(form?.json ? JSON.parse(form.json) : {}),
      markup: {
        min: Number(review?.properties?.pm_review_min || 0),
        max: Number(review?.properties?.pm_review_max || 0),
      },
    };
    return reviewMarkup;
  });

export const getPDPSchema = (type: PDPType) =>
  createSelector(schemaPDPSelector, (schema: any) => {
    if (!schema?.pdp?.form) {
      return { ...schema };
    }

    const form = schema?.pdp?.form;
    const pdpMarkup = {
      ...schema,
      ...(form?.json ? JSON.parse(form.json) : {}),
    };

    return pdpMarkup;
  });

export const schemaMetaSelector = createSelector(schemaSelector, ({ meta }) => meta);
export const schemaMetaPDPSelector = createSelector(schemaPDPSelector, ({ pdp }) => pdp);

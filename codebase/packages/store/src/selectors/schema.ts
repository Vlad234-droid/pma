import { createSelector } from 'reselect';
//@ts-ignore
import { RootState } from 'typesafe-actions';

//@ts-ignore
export const schemaSelector = (state: RootState) => state.schema;
export const getObjectiveSchema = createSelector(schemaSelector, (schema: any) => {
  if (!schema?.cycle) {
    return { ...schema };
  }
  const {
    cycle: { reviews = [] },
  } = schema;
  const review = reviews.find((review) => review.code === 'Objectives');

  const reviewMarkup = {
    ...schema,
    ...JSON.parse(review.form.json),
    markup: { min: Number(review.properties.pm_review_max), max: Number(review.properties.pm_review_max) },
  };
  return reviewMarkup;
});
export const schemaMetaSelector = createSelector(schemaSelector, ({ meta }) => meta);

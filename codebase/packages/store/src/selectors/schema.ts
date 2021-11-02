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

  const reviewMarkup = {
    ...schema,
    ...JSON.parse(reviews[0].form.json),
    markup: { min: reviews[0].properties.pm_review_min, max: reviews[0].properties.pm_review_max },
  };
  return reviewMarkup;
});
export const schemaMetaSelector = createSelector(schemaSelector, ({ meta }) => meta);

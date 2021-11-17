import { createSelector } from 'reselect';
//@ts-ignore
import { RootState } from 'typesafe-actions';
import { ObjectiveType } from '@pma/client/src/config/enum';

//@ts-ignore
export const schemaSelector = (state: RootState) => state.schema;
export const getObjectiveSchema = createSelector(schemaSelector, (schema: any) => {
  if (!schema?.cycle) {
    return { ...schema };
  }
  const {
    cycle: { timelinePoints = [] },
  } = schema;
  const review = timelinePoints.find((review) => review.code === ObjectiveType.OBJECTIVE);

  const reviewMarkup = {
    ...schema,
    ...JSON.parse(review.form.json),
    markup: { min: Number(review.properties.pm_review_min), max: Number(review.properties.pm_review_max) },
  };
  return reviewMarkup;
});
export const schemaMetaSelector = createSelector(schemaSelector, ({ meta }) => meta);

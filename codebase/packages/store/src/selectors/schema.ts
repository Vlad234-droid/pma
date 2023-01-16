import { createSelector } from 'reselect';
//@ts-ignore
import { RootState } from 'typesafe-actions';
import { ReviewType } from '@pma/client/src/config/enum';
import get from 'lodash.get';

import { ExpressionType } from '../config/types';

//@ts-ignore
export const schemaMetaSelector = (state: RootState) => state.schema?.meta;
export const schemaSelector = (state: RootState) => state.schema.current;
export const colleagueSchemaSelector = (colleagueUuid) => (state: RootState) =>
  state.schema.colleagueSchema[colleagueUuid] || [];
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

export const parseSchema = (schema: any) => {
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
    if (timelinePoint?.properties?.pm_timeline_point_code && timelinePoint?.form?.id) {
      const form = schema?.forms.find((form) => form.id === timelinePoint.form.id);
      if (form) {
        reviews[timelinePoint?.properties?.pm_timeline_point_code] = {
          ...schema,
          ...(form?.json || {}),
          markup: {
            min: Number(timelinePoint?.properties?.pm_review_min || 0),
            max: Number(timelinePoint?.properties?.pm_review_max || 0),
          },
        };
      }
    }
  });

  return reviews;
};

export const getAllReviewSchemas = createSelector(schemaSelector, parseSchema);

export const getColleaguesSchemas = (colleagueUuid) =>
  createSelector(
    (state) => state.schema.colleagueSchema?.[colleagueUuid],
    (data: any) => {
      if (!data) return {};
      return Object.keys(data).reduce((schema, key) => {
        const reviews = {};
        const {
          metadata: {
            cycle: { timelinePoints = [] },
          },
        } = data[key];
        timelinePoints?.forEach((timelinePoint) => {
          if (timelinePoint?.properties?.pm_timeline_point_code && timelinePoint?.form?.id) {
            const form = data[key]?.forms.find((form) => form.id === timelinePoint.form.id);
            if (form) {
              reviews[timelinePoint?.properties?.pm_timeline_point_code] = {
                ...data[key],
                ...(form?.json || {}),
                markup: {
                  min: Number(timelinePoint?.properties?.pm_review_min || 0),
                  max: Number(timelinePoint?.properties?.pm_review_max || 0),
                },
              };
            }
          }
        });

        schema[key] = reviews;

        return schema;
      }, {});
    },
  );

export const getReviewSchema = (code?: string, withForms = true) =>
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
    const review = timelinePoints.find(
      (timelinePoint) => timelinePoint?.properties?.pm_timeline_point_code?.toLowerCase() === code?.toLowerCase(),
    );

    if (withForms && schema?.forms?.length && review?.form) {
      form = schema?.forms.find((form) => form.id === review.form.id);
    }

    const reviewMarkup = {
      ...schema,
      ...(form?.json || {}),
      markup: {
        min: Number(review?.properties?.pm_review_min || 0),
        max: Number(review?.properties?.pm_review_max || 0),
      },
    };
    return reviewMarkup;
  });

export const getExpressionListenersKeys =
  (code: string, withForms = true) =>
  (expressionValue: string) =>
    createSelector(getReviewSchema(code, withForms), (schema: any) => {
      const { components } = schema;
      return components
        ?.filter((component) => {
          const listenerValues: string[] = get(component?.expression, `${ExpressionType.LISTENER}.rating`, []);
          return listenerValues?.length && listenerValues.includes(expressionValue) && component?.key;
        })
        .map(({ key }) => key);
    });
export const getExpressionRequestKey =
  (type: ReviewType, withForms = true) =>
  (expressionValue: string) =>
    createSelector(getReviewSchema(type, withForms), (schema: any) => {
      const { components } = schema;
      return (
        components?.find((component) => {
          const listenerValues: string[] = get(component?.expression, `${ExpressionType.REQUEST}.rating`, []);
          return listenerValues?.length && listenerValues.includes(expressionValue) && component?.key;
        })?.key || ''
      );
    });

export const getPDPSchema = (/*type: PDPType*/) =>
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

export const getFormByCode = (code: string) =>
  createSelector(schemaSelector, ({ forms = [] }) => forms.find((form) => form.code === code)?.json);

export const schemaMetaPDPSelector = createSelector(schemaPDPSelector, (data) => data?.pdp);
export const metaPDPSelector = createSelector(schemaPDPSelector, (data) => data?.meta);
export const earlyDataPDPSelector = createSelector(schemaPDPSelector, (data) => data?.date);

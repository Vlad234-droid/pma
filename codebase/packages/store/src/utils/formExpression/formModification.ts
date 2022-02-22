import get from 'lodash.get';
import { ExpressionType, ExpressionValueType, FormType } from '../../config/types';
import { convertFormsJsonToObject, convertFormJsonToObject } from './formPreparetion';

const checkComponentPermission = (component: any, access: string[]) => {
  const { expression } = component;
  const authRole = get(expression, `${ExpressionType.AUTH}.${ExpressionType.ROLE}`);
  const authWorkLevel = get(expression, `${ExpressionType.AUTH}.${ExpressionType.WORK_LEVEL}`);

  if (authRole?.length && !access?.some((role) => authRole.includes(role))) {
    return false;
  }
  return !(authWorkLevel?.length && !access?.some((wl) => authWorkLevel.includes(wl)));
};

const checkFormPermission = (form: any, access: string[]) => {
  const { json } = form;
  const { components = [] } = json;
  const permittedComponents = components?.filter((component) => checkComponentPermission(component, access));
  return { ...form, json: { ...json, components: permittedComponents } };
};

const checkFormsPermission = (forms: any[], access: string[]) =>
  forms?.map((form) => checkFormPermission(form, access));

export const getPermittedForms = (forms: any[], access: string[]) =>
  checkFormsPermission(convertFormsJsonToObject(forms), access);

export const getPermittedForm = (form: any, access: string[]) =>
  checkFormPermission(convertFormJsonToObject(form), access);

export const addStrategicObjectiveInForm = (form: any, count: number) => {
  const { json } = form;
  const { components = [] } = json;

  const newComponents: any[] = [];
  components?.forEach((component) => {
    const reviewValues: string[] = get(component?.expression, `${ExpressionType.REQUEST}.review`, []);
    if (reviewValues?.length && reviewValues.includes(ExpressionValueType.OBJECTIVE) && count) {
      [...Array(count)].forEach((_, index) =>
        newComponents.push({
          ...component,
          ...(component?.id ? { id: component?.id?.replace(component?.id, `${component?.id}_${index + 1}`) } : {}),
          ...(component?.key ? { key: component?.key?.replace(component?.key, `${component?.key}_${index + 1}`) } : {}),
          // todo ask backend about rules for replace.
          ...(component?.label ? { label: component?.label?.replace('Objective', `Objective ${index + 1}`) } : {}),
          expression: {}, // remove expression to avoid duplicates
        }),
      );
    } else {
      newComponents.push(component);
    }
  });

  json.components = newComponents;
  return { ...form, json };
};
export const addStrategicObjectiveInForms = (forms: any[], count: number) =>
  forms?.map((form) => addStrategicObjectiveInForm(form, count));

export const addOverallRatingInForm = (form: any, value: string) => {
  const { json } = form;
  const { components = [] } = json;

  json.components =
    components?.map((component) => {
      const ratingValues: string[] = get(component?.expression, `${ExpressionType.REQUEST}.rating`, []);
      if (ratingValues?.length && ratingValues.includes(ExpressionValueType.OVERALL_RATING) && value) {
        if (component.type === FormType.TEXT) {
          return { ...component, text: `${component.text_origin || component.text} ${value}` };
        }
        return { ...component, defaultValue: value, value };
      }
      return component;
    }) || [];
  return { ...form, json };
};

export const addOverallRatingInForms = (forms: any[], value: string) =>
  forms?.map((form) => addOverallRatingInForm(form, value));

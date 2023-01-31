import { FormType } from '../../config/types';
import { getExpressionObject, expressionReqExp } from './formExpression';

const replaceExpressionString = (text: string) => text?.replace(expressionReqExp, '');

const cleanComponentExpression = (component: any) => ({
  ...component,
  ...(component?.text ? { text: replaceExpressionString(component.text) } : {}),
  ...(component?.description ? { description: replaceExpressionString(component.description) } : {}),
});

export const convertFormJsonToObject = (form: any) => {
  const json = JSON.parse(form?.json);
  const { components = [] } = json;

  json.components = components?.map((component) => {
    let objectExpression, originValue;
    const originKey = {};

    if ([FormType.TEXT_FIELD, FormType.SELECT].includes(component.type)) {
      objectExpression = getExpressionObject(component.description);
      originValue = { description_origin: replaceExpressionString(component.description) };
    } else if (component.type === FormType.TEXT) {
      objectExpression = getExpressionObject(component.text);
      originValue = { text_origin: replaceExpressionString(component.text) };
    }
    if (component?.key) {
      originKey['origin_key'] = component?.key;
    }

    return cleanComponentExpression({ ...component, ...originKey, ...originValue, expression: objectExpression });
  });
  return { ...form, json };
};
export const convertFormsJsonToObject = (forms: any[]) => forms?.map((form) => convertFormJsonToObject(form));

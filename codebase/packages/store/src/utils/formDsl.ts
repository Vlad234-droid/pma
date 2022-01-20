import get from 'lodash.get';
import { DslType, FormType } from '../config/types';

const dslReqExp = /\{(.*?)\}/;

const createObjectFromSchema = (object, path, value) => {
  path
    .split('.')
    .reduce((obj, prop, index) => (obj[prop] = path.split('.').length === ++index ? value : obj[prop] || {}), object);

  return object;
};

const getPermissionObjectFromString = (initObject, text: string) => {
  const [path, value] = text.split(':');
  return createObjectFromSchema(initObject, path, value?.split(','));
};

const getDslObject = (text: string) => {
  const regResult = dslReqExp.exec(text);
  const permissionString = regResult?.length ? regResult[1] : '';
  const permissionsArray = permissionString.split(';');
  const initObject = {};
  permissionsArray?.forEach((permission) => {
    getPermissionObjectFromString(initObject, permission);
  });

  return initObject;
};

const dslRequest = (permissionString: string) => {
  const permissionData: any = getDslObject(permissionString);
  const reviewRequest: string[] = get(permissionData, `${DslType.REQUEST}.review`);

  return reviewRequest;
};

const hasPermission = (permissionString: string, whoCanAccess: string[]) => {
  const permissionData: any = getDslObject(permissionString);
  const authRole = get(permissionData, `${DslType.AUTH}.${DslType.ROLE}`);
  const authWorkLevel = get(permissionData, `${DslType.AUTH}.${DslType.WORK_LEVEL}`);

  if (authRole?.length && !whoCanAccess?.some((role) => authRole.includes(role))) {
    return false;
  }
  return !(authWorkLevel?.length && !whoCanAccess?.some((wl) => authWorkLevel.includes(wl)));
};

const replaceDslString = (text: string) => text?.replace(dslReqExp, '');

const cleanDsl = (component: any) => ({
  ...component,
  ...(component?.text ? { text: replaceDslString(component.text) } : {}),
  ...(component?.description ? { description: replaceDslString(component.description) } : {}),
});

const cleanFormsDsl = (forms: any[]) => {
  return forms.map((form) => {
    const json = JSON.parse(form?.json);
    const { components = [] } = json;

    json.components = components?.map((component) => cleanDsl(component));
    return { ...form, json: JSON.stringify(json) }; // todo use json in response
  });
};

const checkFormsPermission = (forms: any[], permission: string[]) => {
  return forms.map((form) => {
    const json = JSON.parse(form?.json);
    json.components = json?.components?.filter((component) => {
      if (
        [FormType.TEXT_FIELD, FormType.SELECT].includes(component.type) &&
        hasPermission(component.description, permission)
      ) {
        return true;
      }

      return component.type === FormType.TEXT && hasPermission(component.text, permission);
    });
    return { ...form, json: JSON.stringify(json) }; // todo use json in response
  });
};

// todo update only for review count. there is no other cases but better to use open closed principle when we have more cases. not using now
const updateForms = (forms: any[], elementCount: number) => {
  return forms?.map((form) => {
    const json = JSON.parse(form?.json);
    const { components = [] } = json;

    const newComponents: any[] = [];
    components?.forEach((component) => {
      const textWithDsl = component?.type === FormType.TEXT ? component?.text : component?.description;
      const dslReviewArray: string[] = dslRequest(textWithDsl);
      if (dslReviewArray?.length) {
        [...Array(elementCount)].forEach((_, index) =>
          newComponents.push(
            cleanDsl({
              ...component,
              // todo ask backend about rules for replace.
              ...(component?.key
                ? { key: component?.key?.replace(component?.key, `${component?.key}_${index + 1}`) }
                : {}),
              ...(component?.label ? { label: component?.label?.replace('Objective', `Objective ${index + 1}`) } : {}),
            }),
          ),
        );
      } else {
        newComponents.push(cleanDsl(component));
      }
    });

    json.components = newComponents;
    return { ...form, json: JSON.stringify(json) }; // todo use json in response
  });
};

// todo we gave only review request now. there is no other cases but better to use open closed principle when we have more cases. not using now
const hasReviewRequest = (forms: any[]) => {
  const formsWithObjectiveRequest = forms.filter((form) => {
    const json = JSON.parse(form?.json);

    const filteredByDslRequest = json.components.filter((component) => {
      const textWithDsl = component?.type === 'text' ? component?.text : component?.description;
      return dslRequest(textWithDsl)?.length;
    });

    return Boolean(filteredByDslRequest?.length);
  });

  return Boolean(formsWithObjectiveRequest?.length);
};

// example dsl in description and text properties
// {auth.role:LineManager,admin;auth.work_level:WL3}
// {request.review:OBJECTIVE}

export { cleanFormsDsl, checkFormsPermission, updateForms, hasReviewRequest };

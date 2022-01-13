import get from 'lodash.get';
import { DslType } from 'config/enum';

const dslReqExp = /\{(.*?)\}/;

const createObject = (object, path, value) => {
  path
    .split('.')
    .reduce((obj, prop, index) => (obj[prop] = path.split('.').length === ++index ? value : obj[prop] || {}), object);

  return object;
};

const getPermissionObjectFromString = (initObject, text: string) => {
  const [path, value] = text.split(':');
  return createObject(initObject, path, value?.split(','));
};

const getDslObject = (text) => {
  const regResult = dslReqExp.exec(text);
  const permissionString = regResult?.length ? regResult[1] : '';
  const permissionsArray = permissionString.split(';');
  const initObject = {};
  permissionsArray?.forEach((permission) => {
    getPermissionObjectFromString(initObject, permission);
  });

  return initObject;
};

// {auth.role:LineManager,admin;auth.work_level:WL3}
// {request.review:OBJECTIVE}
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

const replaceDslString = (text) => text?.replace(dslReqExp, '');

export { getDslObject, hasPermission, replaceDslString, dslRequest };

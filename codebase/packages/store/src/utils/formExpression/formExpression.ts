const expressionReqExp = /\{(.*?)\}/;

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

const getExpressionObject = (text: string) => {
  const regResult = expressionReqExp.exec(text);
  const permissionString = regResult?.length ? regResult[1] : '';
  const permissionsArray = permissionString.split(';');
  const initObject = {};
  permissionsArray?.forEach((permission) => {
    getPermissionObjectFromString(initObject, permission);
  });
  Object.keys(initObject).forEach((key) => initObject[key] === undefined && delete initObject[key]);

  return initObject;
};

export { expressionReqExp, getExpressionObject };

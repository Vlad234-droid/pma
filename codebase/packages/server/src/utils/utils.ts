export const isEmpty = (obj) => {
  for (const prop in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, prop)) {
      return false;
    }
  }

  return JSON.stringify(obj) === JSON.stringify({});
};

export const isUrlAbsolute = (url) =>
  url.indexOf('//') === 0
    ? true
    : url.indexOf('://') === -1
    ? false
    : url.indexOf('.') === -1
    ? false
    : url.indexOf('/') === -1
    ? false
    : url.indexOf(':') > url.indexOf('/')
    ? false
    : url.indexOf('://') < url.indexOf('.')
    ? true
    : false;

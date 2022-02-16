export const checkTrailingSlash = (path: String) => {
  return path.endsWith('/') ? path : path + '/';
};

export const lowerCaseFirstLetter = <T extends string>(string: T): string =>
  string.charAt(0).toLowerCase() + string.slice(1);

export const checkTrailingSlash = (path: String) => {
  return path.endsWith('/') ? path : path + '/';
};

export const upperCaseFirstLetter = <T extends string>(string: T): string =>
  string.charAt(0).toUpperCase() + string.slice(1);

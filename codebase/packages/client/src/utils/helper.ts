export const checkTrailingSlash = (path: String) => {
  return path.endsWith('/') ? path : path + '/';
};

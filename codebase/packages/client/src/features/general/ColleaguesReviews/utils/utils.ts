export const convertToReportEnum = (pathname) =>
  pathname
    .split('/')
    .filter((item) => item)
    .join('_')
    .replaceAll('-', '_')
    .toUpperCase();

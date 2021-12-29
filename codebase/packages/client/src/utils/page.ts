const paramsReplacer = (template: string, replace: Record<string, string>): string =>
  template
    .split('/')
    .map((path) => path.replace(/(:.*)/, (_, $2) => `${replace[$2]}`))
    .join('/');

export { paramsReplacer };

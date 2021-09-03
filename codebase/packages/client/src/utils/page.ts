const paramsReplacer = (template: string, replace: Record<string, string>) =>
  template.replace(/\/(:.*?)\//g, (_, $2) => `/${replace[$2]}/`);

export { paramsReplacer };

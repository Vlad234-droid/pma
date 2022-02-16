const checkPermissions = (performs: Array<string>, actions: Array<string>) => {
  if (!performs.length) return true;

  return performs.some((perform) => actions.includes(perform));
};

export default checkPermissions;

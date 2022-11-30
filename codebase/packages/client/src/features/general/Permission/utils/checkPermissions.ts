const checkPermissions = (performs: Array<string>, actions: Array<string>) => {
  if (!performs.length) return false;

  return performs.some((perform) => actions.includes(perform));
};

export default checkPermissions;

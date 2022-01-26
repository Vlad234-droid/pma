const checkPermissions = (actions: Array<string>, roles: Array<string>) => {
  if (!actions.length) return true;

  return actions.some((role) => roles.includes(role));
};

export default checkPermissions;

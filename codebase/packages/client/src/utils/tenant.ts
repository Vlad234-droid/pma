let tenant = 'general';

export const setTenant = (t: string) => {
  tenant = t;
};

export const getTenant = () => {
  return tenant;
};

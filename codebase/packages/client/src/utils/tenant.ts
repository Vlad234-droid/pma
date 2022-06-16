export enum Tenant {
  GENERAL = 'general',
  BANK = 'bank',
}

let tenant: Tenant;

export const setTenant = (t: Tenant) => {
  tenant = t;
};

export const getTenant = (): Tenant => {
  return tenant;
};

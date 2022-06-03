import { OpenIdUserInfo } from '@pma-connectors/onelogin';
import { ProcessConfig } from './config-accessor';

export type PmaUserProfile = {
  fullName?: string;
  firstName: string;
  lastName: string;
  email?: string;
  params: {
    employeeNumber?: string;
  };
  updatedAt?: number;
};

/**
 * dniUserDataResolver
 * @param config
 * @param src
 * @returns
 */
export const pmaUserDataResolver = (
  src: OpenIdUserInfo,
  config: ProcessConfig | undefined = undefined,
): PmaUserProfile => {
  //console.log(` --> OpenID <pmaUserDataResolver>: [src]: ${JSON.stringify(src)}`);

  const employeeNumber = (src.params?.employeeNumber as string) || (src.params?.EmployeeNumber as string) || undefined;

  const getProperty = (obj: any, propName: string) => obj && obj[propName];

  const userInfo = {
    fullName: src.name,
    firstName: src.given_name || getProperty(src.params, 'Firstname') || src.name?.split(/\s+/)[0],
    lastName: src.family_name || getProperty(src.params, 'Lastname') || src.name?.split(/\s+/)[1],
    email: getProperty(src, 'email') || src.preferred_username,
    params: {
      employeeNumber,
    },
    updatedAt: !isNaN(Number(src.updated_at)) ? Number(src.updated_at) : undefined,
  };

  //console.log(` --> OpenID <pmaUserDataResolver>: [result]: ${JSON.stringify(userInfo)}`);

  return userInfo;
};

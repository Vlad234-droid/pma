import {
  DeploymentEndpointApi,
  DiagnosticApi,
  ObjectiveApi,
  ProfileApi,
  SecurityApi,
  SubsidiaryApi,
  UserApi,
  Configuration,
  ConfigurationParameters,
} from './src';

const apis = {
  deploymentEndpoint: DeploymentEndpointApi,
  diagnostic: DiagnosticApi,
  objective: ObjectiveApi,
  profile: ProfileApi,
  security: SecurityApi,
  subsidiary: SubsidiaryApi,
  user: UserApi,
};

export type Api = {
  deploymentEndpoint: DeploymentEndpointApi;
  diagnostic: DiagnosticApi;
  objective: ObjectiveApi;
  profile: ProfileApi;
  security: SecurityApi;
  subsidiary: SubsidiaryApi;
  user: UserApi;
};

export const createApiClient = (configuration: ConfigurationParameters = {}): Api =>
  Object.keys(apis).reduce(
    (acc, key) => ({ ...acc, [key]: new apis[key](new Configuration(configuration)) }),
    {} as Api,
  );

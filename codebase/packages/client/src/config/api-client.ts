import { BASE_URL_API } from './constants';

import { createApiClient } from '@pma/openapi';

export default createApiClient({ basePath: BASE_URL_API });

import { API_URL } from './constants';

import { createApiClient } from '@pma/openapi';

export default createApiClient({ basePath: API_URL });

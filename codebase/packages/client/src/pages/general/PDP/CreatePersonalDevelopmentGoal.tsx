import React, { FC } from 'react';
import { CreateUpdatePDP } from 'features/general/PDP';

export const TEST_ID = 'pdp-create-page';

const CreatePersonalDevelopmentPlan: FC = () => {
  return <CreateUpdatePDP />;
};

export default CreatePersonalDevelopmentPlan;

import React, { FC } from 'react';
import { CreatePDP } from 'features/general/PDP';

export const TEST_ID = 'pdp-create-page';

const CreatePersonalDevelopmentPlan: FC = () => {
  return <CreatePDP />;
};

export default CreatePersonalDevelopmentPlan;
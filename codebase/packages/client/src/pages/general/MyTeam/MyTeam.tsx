import React, { FC } from 'react';

import MyTeam from 'features/general/MyTeam';
import ViewNavigation from 'features/general/ViewNavigation';
import { CanPerform, role } from 'features/general/Permission';

export const TEST_ID = 'my-team';

const MyTeamPage: FC = () => (
  <div>
    <CanPerform perform={[role.EXECUTIVE]} yes={() => <ViewNavigation />} />
    <MyTeam />
  </div>
);

export default MyTeamPage;

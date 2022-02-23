import React, { FC } from 'react';

import MyTeam from 'features/MyTeam';
import ViewNavigation from 'features/ViewNavigation';
import { CanPerform, role } from 'features/Permission';

export const TEST_ID = 'my-team';

const MyTeamPage: FC = () => (
  <div>
    <CanPerform perform={[role.EXECUTIVE]} yes={() => <ViewNavigation />} />
    <MyTeam />
  </div>
);

export default MyTeamPage;

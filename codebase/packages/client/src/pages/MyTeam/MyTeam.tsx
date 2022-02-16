import React, { FC } from 'react';

import MyTeam from 'features/MyTeam';
import ViewNavigation from 'features/ViewNavigation';

export const TEST_ID = 'my-team';

const MyTeamPage: FC = () => (
  <div>
    <ViewNavigation />
    <MyTeam />
  </div>
);

export default MyTeamPage;

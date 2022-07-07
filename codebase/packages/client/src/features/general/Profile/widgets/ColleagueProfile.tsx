import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import { getColleagueSelector } from '@pma/store';

import { TileWrapper } from 'components/Tile';
import Profile from '../components/Profile';

const ColleagueProfile: FC = () => {
  const colleague = useSelector(getColleagueSelector);
  const fullName = colleague?.profile?.fullName;

  const department = colleague?.profile?.department;
  const job = colleague?.profile?.job;
  const manager = colleague?.profile?.managerName;

  return (
    <TileWrapper>
      <Profile {...{ fullName, department, job, manager }} />
    </TileWrapper>
  );
};
export default ColleagueProfile;

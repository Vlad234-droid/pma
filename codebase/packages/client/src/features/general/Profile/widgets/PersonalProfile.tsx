import React, { FC, useContext } from 'react';
import AuthContext from 'contexts/authContext';
import { TileWrapper } from 'components/Tile';
import Profile from '../components/Profile';

const PersonalProfile: FC = () => {
  const {
    user: { fullName, job, department, manager },
  } = useContext<any>(AuthContext);

  return (
    <TileWrapper>
      <Profile {...{ fullName, job, department, manager }} />
    </TileWrapper>
  );
};

export default PersonalProfile;

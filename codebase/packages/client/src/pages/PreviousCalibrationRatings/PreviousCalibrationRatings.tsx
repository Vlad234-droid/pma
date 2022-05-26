import React, { FC } from 'react';
import { useStyle } from '@pma/dex-wrapper';
import { useNavigate } from 'react-router';

import { ProfileTileWrapper } from 'components/ProfileTileWrapper';

import { Backward } from 'components/Backward';
import { CalibrationRatingsTable } from 'features/CalibrationRatingsTable';

const PreviousCalibrationRatings: FC = () => {
  const { css } = useStyle();

  const navigate = useNavigate();

  const user = {
    fullName: 'Ron Rogers',
    job: 'Grocery',
    manager: 'Justin Thomas',
  };

  return (
    <>
      <Backward onPress={() => navigate(-1)} />
      <div className={css({ margin: '8px' })}>
        <ProfileTileWrapper user={user} customStyle={{ maxWidth: '80%' }}>
          <CalibrationRatingsTable />
        </ProfileTileWrapper>
      </div>
    </>
  );
};

export default PreviousCalibrationRatings;

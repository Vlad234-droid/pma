import React, { FC } from 'react';
import { useStyle } from '@pma/dex-wrapper';
import { useNavigate } from 'react-router';
import { useParams } from 'react-router-dom';
import { colleagueInfo } from '@pma/store';
import { useSelector } from 'react-redux';

import { ProfileTileWrapper } from 'components/ProfileTileWrapper';
import { Backward } from 'components/Backward';
import { CalibrationRatingsTable } from 'features/CalibrationRatingsTable';
import { useFetchColleague } from 'features/RatingsTiles/hooks/useFetchColleague';
import { AdditionalInfo } from 'features/ObjectiveRatings';

export const PROFILE_WRAPPER = 'profile-wrapper';

const PreviousCalibrationRatings: FC = () => {
  const { css } = useStyle();
  const navigate = useNavigate();
  const { uuid } = useParams<{ uuid: string }>();

  useFetchColleague(uuid);

  const { firstName, lastName, managerName, managerSirName, businessType, job, department } =
    useSelector(colleagueInfo);

  return (
    <>
      <Backward onPress={() => navigate(-1)} />
      <div className={css({ margin: '8px' })} data-test-id={PROFILE_WRAPPER}>
        <ProfileTileWrapper
          user={{ fullName: `${firstName} ${lastName}`, job: `${job} ${department}` }}
          customStyle={{ maxWidth: '80%' }}
        >
          <AdditionalInfo manager={`${managerName} ${managerSirName}`} businessType={businessType} />
          <CalibrationRatingsTable />
        </ProfileTileWrapper>
      </div>
    </>
  );
};

export default PreviousCalibrationRatings;

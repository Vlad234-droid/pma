import React, { FC } from 'react';
import { useNavigate } from 'react-router';
import { useStyle, CreateRule } from '@pma/dex-wrapper';
import { colleagueInfo } from '@pma/store';
import { useSelector } from 'react-redux';

import { YearSwitch } from 'components/YearSwitch';
import { ProfileTileWrapper } from 'components/ProfileTileWrapper';
import { Backward } from 'components/Backward';
import { UserObjectives } from 'features/general/Objectives';
import AdditionalInfo from 'components/AdditionalInfo';
import { getCurrentYear } from 'utils/date';

const PreviousObjectiveRatings: FC = () => {
  const { css, matchMedia } = useStyle();
  const mobileScreen = matchMedia({ xSmall: true, small: true, medium: true }) || false;
  const navigate = useNavigate();

  const { firstName, lastName, businessType, managerSirName, managerName, job, department } =
    useSelector(colleagueInfo);

  const handleChange = (/*year*/) => {
    //TODO: dispatch(...)
  };

  return (
    <>
      <Backward onPress={() => navigate(-1)} />
      <div className={css({ margin: '8px' })}>
        {/*{TODO: get widget from profile feature}*/}
        <ProfileTileWrapper
          user={{ fullName: `${firstName} ${lastName}`, job: `${job} ${department}` }}
          customStyle={widthStyles({ mobileScreen })}
        >
          <AdditionalInfo manager={`${managerName} ${managerSirName}`} businessType={businessType} />
        </ProfileTileWrapper>
      </div>
      <YearSwitch currentYear={getCurrentYear()} onChange={handleChange} />
      <div className={css(widthStyles({ mobileScreen }))}>
        <UserObjectives />
      </div>
    </>
  );
};

const widthStyles: CreateRule<{ mobileScreen: boolean }> = ({ mobileScreen }) => ({
  maxWidth: !mobileScreen ? '80%' : '100%',
});

export default PreviousObjectiveRatings;

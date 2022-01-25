import React, { FC } from 'react';
import { CreateRule, useBreakpoints, useStyle } from '@dex-ddl/core';
import { Contacts, PersonalInformation, ProfessionalInformation } from '../../features/Profile';
import { AuthConsumer } from 'contexts/authContext';
import { AvatarName } from 'features/Profile/components/Widgets/DashboardProfile';
import { TileWrapper } from 'components/Tile';

export const TEST_ID = 'objectives-pave';

const Profile: FC = () => {
  const { css } = useStyle();
  const [, isBreakpoint] = useBreakpoints();
  const mobileScreen = isBreakpoint.small || isBreakpoint.xSmall;

  return (
    <div className={css({ margin: '8px' })}>
      <AuthConsumer>
        {({ user }) => {
          return (
            <TileWrapper>
              <div className={css(cardWrapper({mobileScreen}))}>
                <AvatarName user={user} />
                <PersonalInformation user={user} />
                <ProfessionalInformation user={user} />
                <Contacts user={user} />
              </div>
            </TileWrapper>
          );
        }}
      </AuthConsumer>
    </div>
  );
};

const cardWrapper: CreateRule<{ mobileScreen }> = ({ mobileScreen }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: '8px',
  ...(mobileScreen ? {
    padding: '16px'
  } : {
    padding: '24px',
  })
});

export default Profile;

import React, { FC } from 'react';
import { Styles, useStyle } from '@dex-ddl/core';
import { Contacts, PersonalInformation, ProfessionalInformation } from '../../features/Profile';
import { AuthConsumer } from 'contexts/authContext';
import { AvatarName } from 'features/Profile/components/Widgets/DashboardProfile';
import { TileWrapper } from 'components/Tile';

export const TEST_ID = 'objectives-pave';

const Profile: FC = () => {
  const { css } = useStyle();

  return (
    <div className={css({ margin: '8px' })}>
      <AuthConsumer>
        {({ user }) => {
          return (
            <TileWrapper>
              <div className={css(cardWrapper)}>
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
const cardWrapper = {
  padding: '24px',
  display: 'flex',
  flexDirection: 'column',
  gap: '8px',
} as Styles;

export default Profile;

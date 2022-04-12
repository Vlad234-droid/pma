import React, { FC } from 'react';
import { CreateRule, useStyle } from '@pma/dex-wrapper';
import { Contacts, PersonalInformation, ProfessionalInformation } from '../../features/Profile';
import { AuthConsumer } from 'contexts/authContext';
import { AvatarName } from 'features/Profile/components/Widgets/DashboardProfile';
import { TileWrapper } from 'components/Tile';

export const TEST_ID = 'profile-test-page';

const Profile: FC = () => {
  const { css, matchMedia } = useStyle();
  const mobileScreen = matchMedia({ xSmall: true, small: true }) || false;

  return (
    <div data-test-id={TEST_ID} className={css({ margin: '8px' })}>
      <AuthConsumer>
        {({ user }) => {
          return (
            <TileWrapper>
              <div className={css(cardWrapper({ mobileScreen }))}>
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
  ...(mobileScreen
    ? {
        padding: '16px',
      }
    : {
        padding: '24px',
      }),
});

export default Profile;

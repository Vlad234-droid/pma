import React, { FC, useState } from 'react';
import { useTranslation } from 'components/Translation';
import { Styles, useStyle } from '@dex-ddl/core';
import { Header } from 'components/Header';
import { Contacts, PersonalInformation, ProfessionalInformation } from '../../features/Profile';
import { AuthConsumer } from '../../contexts/authContext';
import { AvatarName } from '../../features/Profile/components/Widgets/DashboardProfile';
import { TileWrapper } from '../../components/Tile';

export const TEST_ID = 'objectives-pave';

const Profile: FC = () => {
  const { css, theme } = useStyle();
  const { t } = useTranslation();
  const [previousReviewFilesModalShow, setPreviousReviewFilesModalShow] = useState(false);

  return (
    <div className={css({ margin: '8px' })}>
      <Header title='My profile' />
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

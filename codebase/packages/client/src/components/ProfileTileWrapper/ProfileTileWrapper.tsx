import React, { FC, CSSProperties, ReactNode } from 'react';
import { CreateRule, Rule, Styles, useStyle } from '@pma/dex-wrapper';

import { TileWrapper } from 'components/Tile';
import { AvatarName } from 'features/general/Profile/components/Widgets/Profile';

const ProfileTileWrapper: FC<{
  user: Record<'fullName' | 'job', string>;
  customStyle?: Rule | Styles | CSSProperties | {};
  children?: ReactNode;
}> = ({ user, customStyle = {}, children }) => {
  const { css, matchMedia } = useStyle();
  const mobileScreen = matchMedia({ xSmall: true, small: true }) || false;
  return (
    <TileWrapper customStyle={customStyle}>
      <div className={css(cardWrapper({ mobileScreen }))}>
        <AvatarName user={user} />
        {children}
      </div>
    </TileWrapper>
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

export default ProfileTileWrapper;

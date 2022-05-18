import React, { FC, CSSProperties } from 'react';
import { CreateRule, Rule, Styles, useStyle } from '@pma/dex-wrapper';

import { TileWrapper } from 'components/Tile';
import { AvatarName } from 'features/Profile/components/Widgets/DashboardProfile';

const ProfileTileWrapper: FC<{
  user: Record<'fullName' | 'job' | 'manager', string>;
  render?: () => JSX.Element;
  customStyle?: Rule | Styles | CSSProperties | {};
}> = ({ user, render = null, customStyle = {} }) => {
  const { css, matchMedia } = useStyle();
  const mobileScreen = matchMedia({ xSmall: true, small: true }) || false;
  return (
    <TileWrapper customStyle={customStyle}>
      <div className={css(cardWrapper({ mobileScreen }))}>
        <AvatarName user={user} />
        {render && render()}
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

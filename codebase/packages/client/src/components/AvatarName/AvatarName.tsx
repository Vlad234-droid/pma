import React, { FC } from 'react';
import { CreateRule, Styles, useStyle } from '@pma/dex-wrapper';
import { Avatar } from 'components/Avatar';

export type Props = {
  user: { fullName: string; job: string };
};

const AvatarName: FC<Props> = ({ user = {} }) => {
  const { css, matchMedia } = useStyle();
  const mobileScreen = matchMedia({ xSmall: true, small: true }) || false;
  const { fullName, job } = user || {};
  return (
    <div className={css(headStyle)}>
      <Avatar size={65} />
      <div className={css(headerBlockStyle)}>
        <span className={css(mainTitleStyle({ mobileScreen }))}>{fullName}</span>
        <span className={css(descriptionStyle({ mobileScreen }))}>{job}</span>
      </div>
    </div>
  );
};

export default AvatarName;

const headStyle: Styles = {
  display: 'flex',
  alignItems: 'flex-start',
  marginBottom: '16px',
};

const headerBlockStyle: Styles = {
  display: 'grid',
  padding: '0 20px',
  alignSelf: 'center',
};

const mainTitleStyle: CreateRule<{ mobileScreen: boolean }> =
  ({ mobileScreen }) =>
  ({ theme }) => ({
    fontStyle: 'normal',
    fontWeight: theme.font.weight.bold,
    letterSpacing: '0px',
    ...(mobileScreen ? { ...theme.font.fixed.f18 } : { ...theme.font.fixed.f20 }),
  });

const descriptionStyle: CreateRule<{ mobileScreen }> =
  ({ mobileScreen }) =>
  ({ theme }) => ({
    fontStyle: 'normal',
    fontWeight: 'normal',
    letterSpacing: '0px',
    ...(mobileScreen ? { ...theme.font.fixed.f18 } : { ...theme.font.fixed.f20 }),
  });

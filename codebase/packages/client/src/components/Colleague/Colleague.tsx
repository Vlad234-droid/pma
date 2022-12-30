import React, { FC } from 'react';
import { CreateRule, Styles, useStyle } from '@pma/dex-wrapper';
import { Avatar } from 'components/Avatar';

export type Props = {
  profile: { fullName: string; job: string; department: string };
};

const Colleague: FC<Props> = ({ profile = {} }) => {
  const { css, matchMedia } = useStyle();
  const mobileScreen = matchMedia({ xSmall: true, small: true }) || false;
  const { fullName, job, department } = profile || {};
  return (
    <div className={css(headStyle)}>
      <Avatar size={65} />
      <div className={css(headerBlockStyle)}>
        <h2 className={css(mainTitleStyle({ mobileScreen }))}>{fullName}</h2>
        <p className={css(descriptionStyle({ mobileScreen }))}>
          {job}, {department}
        </p>
      </div>
    </div>
  );
};

export default Colleague;

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
    margin: 0,
    ...(mobileScreen ? { ...theme.font.fixed.f18 } : { ...theme.font.fixed.f20 }),
  });

const descriptionStyle: CreateRule<{ mobileScreen }> =
  ({ mobileScreen }) =>
  ({ theme }) => ({
    fontStyle: 'normal',
    fontWeight: 'normal',
    margin: 0,
    ...(mobileScreen ? { ...theme.font.fixed.f14 } : { ...theme.font.fixed.f16 }),
  });

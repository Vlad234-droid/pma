import React, { FC, HTMLProps } from 'react';
import { Trans } from 'components/Translation';
import { CreateRule, Rule, Styles, useStyle } from '@pma/dex-wrapper';
import { TileWrapper } from 'components/Tile';
import { Avatar } from 'components/Avatar';
import { AuthConsumer } from 'contexts/authContext';

export type DashboardProfileProps = {};

type Props = HTMLProps<HTMLInputElement> & DashboardProfileProps;

const wrapperStyle = {
  padding: '24px',
} as Styles;

const headStyle = {
  display: 'flex',
  alignItems: 'flex-start',
  marginBottom: '16px',
} as Styles;

const headerBlockStyle = {
  display: 'grid',
  padding: '0 20px',
  alignSelf: 'center',
} as Styles;

const bodyBlockStyle = {
  minWidth: '200px',
  display: 'grid',
  paddingRight: '20px',
} as Styles;

const mainTitleStyle: CreateRule<{ mobileScreen }> =
  ({ mobileScreen }) =>
  ({ theme }) => ({
    fontStyle: 'normal',
    fontWeight: theme.font.weight.bold,
    letterSpacing: '0px',
    ...(mobileScreen ? { ...theme.font.fixed.f18 } : { ...theme.font.fixed.f20 }),
  });

// TODO: Extract duplicate 8
const titleStyle: Rule = ({ theme }) => ({
  fontStyle: 'normal',
  fontWeight: theme.font.weight.bold,
  ...theme.font.fixed.f16,
  letterSpacing: '0px',
});

const descriptionStyle: CreateRule<{ mobileScreen }> =
  ({ mobileScreen }) =>
  ({ theme }) => ({
    fontStyle: 'normal',
    fontWeight: 'normal',
    letterSpacing: '0px',
    ...(mobileScreen ? { ...theme.font.fixed.f18 } : { ...theme.font.fixed.f20 }),
  });

// TODO: Extract duplicate 10
const bodyStyle = {
  flexWrap: 'wrap',
  gap: '16px 8px',
  alignItems: 'center',
  display: 'inline-flex',
} as Styles;

export type AvatarNameProps = {
  user?: any;
};

export const AvatarName: FC<AvatarNameProps> = ({ user = {} }) => {
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

const DashboardProfile: FC<Props> = () => {
  const { css, matchMedia } = useStyle();
  const mobileScreen = matchMedia({ xSmall: true, small: true }) || false;
  return (
    <AuthConsumer>
      {({ user = {} }) => {
        // @ts-ignore
        const { fullName, job, department, manager } = user;
        return (
          <TileWrapper>
            <div className={css(wrapperStyle)}>
              <AvatarName user={{ fullName, job }} />
              <div className={css(bodyStyle)}>
                <div className={css(bodyBlockStyle)}>
                  <span className={css(titleStyle)}>
                    <Trans i18nKey='line_manager'>Line manager</Trans>
                  </span>
                  <span className={css(descriptionStyle({ mobileScreen }), { fontSize: '16px', lineHeight: '20px' })}>
                    {manager}
                  </span>
                </div>
                <div className={css(bodyBlockStyle)}>
                  <span className={css(titleStyle)}>
                    <Trans>Department</Trans>
                  </span>
                  <span className={css(descriptionStyle({ mobileScreen }), { fontSize: '16px', lineHeight: '20px' })}>
                    {department}
                  </span>
                </div>
              </div>
            </div>
          </TileWrapper>
        );
      }}
    </AuthConsumer>
  );
};

export default DashboardProfile;

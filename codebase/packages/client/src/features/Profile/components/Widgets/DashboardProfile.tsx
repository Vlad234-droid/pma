import React, { FC, HTMLProps } from 'react';
import { Trans } from 'components/Translation';
import { CreateRule, Rule, Styles, useBreakpoints, useStyle } from '@dex-ddl/core';
import { TileWrapper } from 'components/Tile';
import { Avatar } from 'components/Avatar';
import { AuthConsumer } from '../../../../contexts/authContext';

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

const mainTitleStyle: CreateRule<{ mobileScreen }> = ({ mobileScreen }) => ({
  fontStyle: 'normal',
  fontWeight: 700,
  ...(mobileScreen
    ? {
        fontSize: '18px',
        lineHeight: '22px',
      }
    : {
        fontSize: '20px',
        lineHeight: '24px',
      }),
});

const titleStyle: Rule = ({ theme }) =>
  ({
    fontStyle: 'normal',
    fontWeight: `${theme.font.weight.bold}`,
    fontSize: '16px',
    lineHeight: '20px',
  } as Styles);

const descriptionStyle: CreateRule<{ mobileScreen }> = ({ mobileScreen }) => ({
  fontStyle: 'normal',
  fontWeight: 'normal',
  ...(mobileScreen
    ? {
        fontSize: '18px',
        lineHeight: '22px',
      }
    : {
        fontSize: '20px',
        lineHeight: '24px',
      }),
});

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
  const { css } = useStyle();
  const [, isBreakpoint] = useBreakpoints();
  const mobileScreen = isBreakpoint.small || isBreakpoint.xSmall;
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
  const { css } = useStyle();
  const [, isBreakpoint] = useBreakpoints();
  const mobileScreen = isBreakpoint.small || isBreakpoint.xSmall;
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

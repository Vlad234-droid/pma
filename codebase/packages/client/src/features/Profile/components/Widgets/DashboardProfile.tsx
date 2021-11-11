import React, { FC, HTMLProps } from 'react';
import { Trans, useTranslation } from 'components/Translation';
import { Rule, Styles, useStyle } from '@dex-ddl/core';
import { TileWrapper } from 'components/Tile';
import { Avatar } from 'components/Avatar';
import { AuthConsumer } from '../../../../contexts/authContext';

export type DashboardProfileProps = {};

type Props = HTMLProps<HTMLInputElement> & DashboardProfileProps;

const wrapperStyle = {
  padding: '20px',
} as Styles;

const headStyle = {
  display: 'flex',
  alignItems: 'flex-start',
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
  paddingTop: '14px',
} as Styles;

const mainTitleStyle: Rule = ({ theme }) =>
  ({
    fontStyle: 'normal',
    fontWeight: `${theme.font.weight.bold}`,
    fontSize: '20px',
    lineHeight: '24px',
  } as Styles);

const titleStyle: Rule = ({ theme }) =>
  ({
    fontStyle: 'normal',
    fontWeight: `${theme.font.weight.bold}`,
    fontSize: '16px',
    lineHeight: '20px',
  } as Styles);

const descriptionStyle = {
  fontStyle: 'normal',
  fontWeight: 'normal',
  fontSize: '16px',
  lineHeight: '20px',
} as Styles;

const bodyStyle = {
  flexWrap: 'wrap',
  gap: '16px 8px',
  alignItems: 'center',
  display: 'inline-flex',
} as Styles;

export type AvatarNameProps = {
  user?: any;
};

export const AvatarName: FC<AvatarNameProps> = ({ user }) => {
  const { css } = useStyle();
  const { fullName, job } = user || {};
  return (
    <div className={css(headStyle)}>
      <Avatar size={65} />
      <div className={css(headerBlockStyle)}>
        <span className={css(mainTitleStyle)}>{fullName}</span>
        <span className={css(descriptionStyle)}>{job}</span>
      </div>
    </div>
  );
};

const DashboardProfile: FC<Props> = () => {
  const { css } = useStyle();
  const { t } = useTranslation();
  return (
    <AuthConsumer>
      {({ user }) => {
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
                  <span className={css(descriptionStyle)}>{manager}</span>
                </div>
                <div className={css(bodyBlockStyle)}>
                  <span className={css(titleStyle)}>
                    <Trans i18nKey='function'>Function</Trans>
                  </span>
                  <span className={css(descriptionStyle)}>{department}</span>
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

import React, { FC, useEffect } from 'react';
import { Trans, useTranslation } from 'components/Translation';
import { Rule, Styles, useStyle } from '@dex-ddl/core';
import { TileWrapper } from 'components/Tile';
import { Checkbox } from 'components/Form';
import { colleagueUUIDSelector, TimelineActions, UserActions } from '@pma/store';
import useDispatch from 'hooks/useDispatch';
import { useAuthContainer } from 'contexts/authContext';
import { PermissionProvider } from 'features/Permission';
import { useSelector } from 'react-redux';
import { accessByRole, accessByWorkLevel } from '../config';
import { accessByTimelinePoints } from '../config/accessByTimelinePoints';

export type Props = {};

export const EmailNotifications: FC<Props> = () => {
  const { css } = useStyle();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { user } = useAuthContainer();
  const { profileAttributes } = user?.data || [];
  const colleagueUuid = useSelector(colleagueUUIDSelector);
  useEffect(() => {
    if (colleagueUuid) dispatch(TimelineActions.getTimeline({ colleagueUuid }));
  }, [colleagueUuid]);

  const updateSettingAction = (setting) => dispatch(UserActions.updateUserNotification(setting));

  const profileAttributesFiltered = profileAttributes
    // TODO: remove when new types are added
    ?.filter(({ type }) => type === 'BOOLEAN')
    .sort(({ name: name1 }, { name: name2 }) => {
      if (name1 < name2) return -1;
      if (name2 > name1) return 1;
      return 0;
    });
  return (
    <TileWrapper title={t('Email notifications', 'Email notifications')}>
      <div className={css(listStyles)}>
        <span className={css(titleStyle)}>
          <Trans>Notifications</Trans>
        </span>
        <div className={css(descriptionStyle)}>
          <Trans>You will receive notification about marked actions</Trans>
        </div>
        {profileAttributesFiltered.map(({ name, value, type }) => (
          <PermissionProvider
            key={name}
            roles={accessByRole[name]}
            workLevels={accessByWorkLevel[name]}
            reviewTypes={accessByTimelinePoints[name]}
          >
            <div className={css({ display: 'flex' })}>
              <Checkbox
                id={name}
                onChange={({ target: { checked: value } }) =>
                  updateSettingAction([{ colleagueUuid, name, type, value }])
                }
                checked={value === 'true'}
              />
              <label className={css({ marginLeft: '8px' })} htmlFor={name}>
                <Trans i18nKey={name} />
              </label>
            </div>
          </PermissionProvider>
        ))}
      </div>
    </TileWrapper>
  );
};

const titleStyle: Rule = ({ theme }) =>
  ({
    fontStyle: 'normal',
    fontWeight: `${theme.font.weight.bold}`,
    fontSize: '20px',
    lineHeight: '24px',
  } as Styles);

const descriptionStyle = {
  fontStyle: 'normal',
  fontWeight: 'normal',
  fontSize: '16px',
  lineHeight: '20px',
  marginBottom: '8px',
} as Styles;

const listStyles: Rule = {
  display: 'flex',
  flexDirection: 'column',
  gap: '24px',
  padding: '24px',
};

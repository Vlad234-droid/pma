import React, { FC, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { Rule, useStyle } from '@pma/dex-wrapper';
import { colleagueUUIDSelector, UserActions } from '@pma/store';
import { usePermission, usePermissionByReviewType, usePermissionByWorkLevel } from 'features/general/Permission';
import { Trans } from 'components/Translation';
import { TileWrapper } from 'components/Tile';
import { Checkbox } from 'components/Form';
import useDispatch from 'hooks/useDispatch';
import { useAuthContainer } from 'contexts/authContext';
import { accessByRole, accessByTimelinePoints, accessByWorkLevel } from './config';

export const TEST_ID = 'email-notification-id';

const EmailNotificationSettings: FC = () => {
  const { css } = useStyle();
  const dispatch = useDispatch();
  const { user } = useAuthContainer();
  //@ts-ignore
  const { profileAttributes = [] }: { profileAttributes: Array<any> } = user || {};
  const colleagueUuid = useSelector(colleagueUUIDSelector);

  const handleUpdateSetting = (setting: any) =>
    dispatch(UserActions.updateProfileAttribute([{ ...setting, colleagueUuid }]));

  const profileAttributesFiltered = useMemo(() => {
    return (
      profileAttributes
        ?.filter(({ type }) => type === 'BOOLEAN')
        ?.sort(({ name: name1 }, { name: name2 }) => {
          if (name1 < name2) return -1;
          if (name2 > name1) return 1;
          return 0;
        }) || []
    );
  }, [profileAttributes]);

  return (
    <TileWrapper>
      <div data-test-id={TEST_ID} className={css(listStyles)}>
        <span className={css(titleStyle)}>
          <Trans i18nKey='notifications'>Notifications</Trans>
        </span>
        <div className={css(descriptionStyle)}>
          <Trans i18nKey='you_will_receive_notification_about_marked_actions'>
            You will receive notification about marked actions
          </Trans>
        </div>
        {profileAttributesFiltered
          .filter(
            ({ name }) =>
              usePermission(accessByRole[name] || []) ||
              usePermissionByWorkLevel(accessByWorkLevel[name] || []) ||
              usePermissionByReviewType(accessByTimelinePoints[name] || []),
          )
          .map(({ name, value, type }) => (
            <div key={name} className={css(checkBoxStyle)}>
              <Checkbox
                id={name}
                onChange={(checked) => handleUpdateSetting({ name, type, value: checked.toString() })}
                checked={value === 'true'}
              />
              <label className={css(labelStyle)} htmlFor={name}>
                <Trans i18nKey={name} />
              </label>
            </div>
          ))}
      </div>
    </TileWrapper>
  );
};

export default EmailNotificationSettings;

const checkBoxStyle: Rule = {
  display: 'flex',
  cursor: 'pointer',
  alignItems: 'center',
};

const titleStyle: Rule = ({ theme }) => {
  return {
    fontStyle: 'normal',
    fontWeight: theme.font.weight.bold,
    fontSize: theme.font.fixed.f20.fontSize,
    lineHeight: theme.font.fixed.f20.lineHeight,
    letterSpacing: '0px',
  };
};

// TODO: Extract duplicate 9
const descriptionStyle: Rule = ({ theme }) => {
  return {
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: theme.font.fixed.f16.fontSize,
    lineHeight: theme.font.fixed.f16.lineHeight,
    letterSpacing: '0px',
    marginBottom: '8px',
  };
};

const listStyles: Rule = {
  display: 'flex',
  flexDirection: 'column',
  gap: '24px',
  padding: '24px',
};

const labelStyle: Rule = {
  marginLeft: '8px',
  marginBottom: '2px',
  cursor: 'pointer',
};

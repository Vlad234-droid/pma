import React, { FC } from 'react';
import { Trans, useTranslation } from 'components/Translation';
import { Rule, Styles, useStyle } from '@dex-ddl/core';
import { TileWrapper } from 'components/Tile';
import { Checkbox } from 'components/Form';
import { UserActions } from '@pma/store';
import useDispatch from 'hooks/useDispatch';
import { useAuthContainer } from 'contexts/authContext';

export type Props = {};

export const EmailNotifications: FC<Props> = () => {
  const { css } = useStyle();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { user } = useAuthContainer();
  // @ts-ignore
  const profileAttributes = user?.data?.profileAttributes || [];
  const settings = profileAttributes
    .filter(({ name }) => name.includes('.') && name.split('.')[0] === 'notification')
    .map((attr) => ({
      ...attr,
      value: attr.type === 'BOOLEAN' ? attr.value === 'true' : attr.value,
    }));

  const updateSettingAction = (setting) => dispatch(UserActions.updateUserNotification(setting));

  return (
    <TileWrapper title={t('Email notifications', 'Email notifications')}>
      <div className={css({ display: 'flex', flexDirection: 'column', gap: '24px', padding: '24px' })}>
        <span className={css(titleStyle)}>
          <Trans>Email notifications</Trans>
        </span>
        <div className={css(descriptionStyle)}>You will receive emails about marked actions</div>
        {settings.map(({ name, value, type }) => (
          <div key={name} className={css({ display: 'flex' })}>
            <Checkbox
              id={name}
              onChange={(e) =>
                updateSettingAction([
                  {
                    name,
                    type,
                    value: e.target.checked,
                  },
                ])
              }
              checked={value}
            />
            <label className={css({ marginLeft: '8px' })} htmlFor={name}>
              <Trans i18nKey={name} />
            </label>
          </div>
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

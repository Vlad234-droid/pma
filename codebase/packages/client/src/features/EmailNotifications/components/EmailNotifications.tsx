import React, { FC } from 'react';
import { Trans, useTranslation } from 'components/Translation';
import { Rule, Styles, useStyle } from '@dex-ddl/core';
import { TileWrapper } from 'components/Tile';

export type Props = {};

const settings = [
  { id: 'objectives-are-cascaded-by-line-manager', title: 'When objectives are cascaded by Line manager' },
  { id: 'line-manager-comments-on-objectives', title: 'When Line manager comments on objectives' },
  { id: 'objectives-are-approved-by-line-manager', title: 'When objectives are approved by Line manager' },
  { id: 'objectives-are-returned-by-line-manager', title: 'When objectives are returned by Line manager' },
  { id: 'tips-are-pushed', title: 'When tips are pushed' },
];

export const EmailNotifications: FC<Props> = () => {
  const { css } = useStyle();
  const { t } = useTranslation();
  return (
    <TileWrapper title={t('Email notifications', 'Email notifications')}>
      <div className={css({ display: 'flex', flexDirection: 'column', gap: '24px', padding: '24px' })}>
        <span className={css(titleStyle)}>
          <Trans>Email notifications</Trans>
        </span>
        <div className={css(descriptionStyle)}>You will receive emails about marked actions</div>
        {settings.map(({ id, title }) => (
          <div key={id}>
            <input type='checkbox' id={id} />
            <label className={css({ marginLeft: '8px' })} htmlFor={id}>
              {title}
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

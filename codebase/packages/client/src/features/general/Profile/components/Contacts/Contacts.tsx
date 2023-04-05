import React, { FC, HTMLProps } from 'react';
import { Trans, useTranslation } from 'components/Translation';
import { CreateRule, Rule, Styles, useStyle } from '@pma/dex-wrapper';
import { BasicTile } from 'components/Tile';

export type DashboardProfileProps = {
  user?: any;
};

type Props = HTMLProps<HTMLInputElement> & DashboardProfileProps;

const bodyBlockStyle = {
  minWidth: '200px',
  display: 'grid',
  paddingRight: '20px',
  paddingTop: '14px',
} as Styles;

// TODO: Extract duplicate 8
const titleStyle: Rule = ({ theme }) =>
  ({
    fontStyle: 'normal',
    fontWeight: `${theme.font.weight.bold}`,
    fontSize: '16px',
    lineHeight: '20px',
  } as Styles);

// TODO: Extract duplicate 9
const descriptionStyle = {
  fontStyle: 'normal',
  fontWeight: 'normal',
  fontSize: '16px',
  lineHeight: '20px',
} as Styles;

// TODO: Extract duplicate 10
const bodyStyle: Rule = ({ theme }) => {
  return {
    fontSize: theme.font.fixed.f16.fontSize,
    lineHeight: theme.font.fixed.f16.lineHeight,
    letterSpacing: '0px',
    flexWrap: 'wrap',
    gap: '16px 8px',
    alignItems: 'center',
    display: 'inline-flex',
  };
};

// TODO: Extract duplicate 11
const tileStyle: CreateRule<{ mobileScreen }> =
  ({ mobileScreen }) =>
  ({ theme }) => ({
    fontSize: theme.font.fixed.f16.fontSize,
    lineHeight: theme.font.fixed.f16.lineHeight,
    letterSpacing: '0px',
    ...(mobileScreen
      ? {
          padding: '6px 0 0',
        }
      : {
          padding: '14px 10px 10px',
        }),
  });

const Contacts: FC<Props> = ({ user }) => {
  const { css, matchMedia } = useStyle();
  const mobileScreen = matchMedia({ xSmall: true, small: true }) || false;
  const { t } = useTranslation();
  const { email } = user;
  return (
    <BasicTile title={t('Contacts', 'Contacts')} description={''} customStyle={tileStyle({ mobileScreen })}>
      <div className={css(bodyStyle)}>
        <div className={css(bodyBlockStyle)}>
          <span className={css(titleStyle)}>
            <Trans>Email address</Trans>
          </span>
          <span className={css(descriptionStyle)}>{email}</span>
        </div>
      </div>
    </BasicTile>
  );
};

export default Contacts;

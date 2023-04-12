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
  flex: '1 1 0',
} as Styles;

// TODO: Extract duplicate 8
const titleStyle: Rule = ({ theme }) => {
  return {
    fontStyle: 'normal',
    fontWeight: theme.font.weight.bold,
    fontSize: theme.font.fixed.f16.fontSize,
    lineHeight: theme.font.fixed.f16.lineHeight,
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
  };
};

// TODO: Extract duplicate 10
const bodyStyle: Rule = {
  flexWrap: 'wrap',
  gap: '16px 8px',
  alignItems: 'center',
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(max(200px,30%), 1fr))',
};

// TODO: Extract duplicate 11
const tileStyle: CreateRule<{ mobileScreen }> = ({ mobileScreen }) => ({
  ...(mobileScreen
    ? {
        padding: '6px 0 0',
      }
    : {
        padding: '14px 10px 10px',
      }),
});

const ProfessionalInformation: FC<Props> = ({ user }) => {
  const { css, matchMedia } = useStyle();
  const mobileScreen = matchMedia({ xSmall: true, small: true }) || false;
  const { t } = useTranslation();
  const { hireDate, job, department, businessType, manager, countryCode } = user;

  return (
    <BasicTile
      title={t('ProfessionalInformation', 'Professional information')}
      description={''}
      customStyle={tileStyle({ mobileScreen })}
    >
      <div className={css(bodyStyle)}>
        <div className={css(bodyBlockStyle)}>
          <span className={css(titleStyle)}>
            <Trans>Job title</Trans>
          </span>
          <span className={css(descriptionStyle)}>{job}</span>
        </div>
        <div className={css(bodyBlockStyle)}>
          <span className={css(titleStyle)}>
            <Trans>Department</Trans>
          </span>
          <span className={css(descriptionStyle)}>{department}</span>
        </div>
        <div className={css(bodyBlockStyle)}>
          <span className={css(titleStyle)}>
            <Trans>Business unit</Trans>
          </span>
          <span className={css(descriptionStyle)}>{businessType}</span>
        </div>
        <div className={css(bodyBlockStyle)}>
          <span className={css(titleStyle)}>
            <Trans>Line manager</Trans>
          </span>
          <span className={css(descriptionStyle)}>{manager}</span>
        </div>
        <div className={css(bodyBlockStyle)}>
          <span className={css(titleStyle)}>
            <Trans>Hire date</Trans>
          </span>
          <span className={css(descriptionStyle)}>{hireDate}</span>
        </div>
        <div className={css(bodyBlockStyle)}>
          <span className={css(titleStyle)}>
            <Trans>Location</Trans>
          </span>
          <span className={css(descriptionStyle)}>{countryCode}</span>
        </div>
      </div>
    </BasicTile>
  );
};

export default ProfessionalInformation;

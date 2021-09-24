import React, { FC, HTMLProps } from 'react';
import { Trans, useTranslation } from 'components/Translation';
import { Rule, Styles, useStyle } from '@dex-ddl/core';
import { BasicTile } from 'components/Tile';

export type DashboardProfileProps = {
  user?: any;
};

type Props = HTMLProps<HTMLInputElement> & DashboardProfileProps;

const wrapperStyle = {
  padding: '0',
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
} as Styles;

const bodyStyle = {
  flexWrap: 'wrap',
  gap: '16px 8px',
  alignItems: 'center',
  display: 'inline-flex',
} as Styles;

const ProfessionalInformation: FC<Props> = ({ user }) => {
  const { css } = useStyle();
  const { t } = useTranslation();
  const { hireDate } = user;
  return (
    <BasicTile title={t('ProfessionalInformation', 'Professional information')} description={''}>
      <div className={css(wrapperStyle)}>
        <div className={css(bodyStyle)}>
          <div className={css(bodyBlockStyle)}>
            <span className={css(titleStyle)}>
              <Trans>Job title</Trans>
            </span>
            <span className={css(descriptionStyle)}>Manager</span>
          </div>
          <div className={css(bodyBlockStyle)}>
            <span className={css(titleStyle)}>
              <Trans>Function</Trans>
            </span>
            <span className={css(descriptionStyle)}>Store</span>
          </div>
          <div className={css(bodyBlockStyle)}>
            <span className={css(titleStyle)}>
              <Trans>Business unit</Trans>
            </span>
            <span className={css(descriptionStyle)}>CS 123</span>
          </div>
          <div className={css(bodyBlockStyle)}>
            <span className={css(titleStyle)}>
              <Trans>Line Manager</Trans>
            </span>
            <span className={css(descriptionStyle)}>Patric</span>
          </div>
          <div className={css(bodyBlockStyle)}>
            <span className={css(titleStyle)}>
              <Trans>Employment</Trans>
            </span>
            <span className={css(descriptionStyle)}>Full time</span>
          </div>
          <div className={css(bodyBlockStyle)}>
            <span className={css(titleStyle)}>
              <Trans>Status</Trans>
            </span>
            <span className={css(descriptionStyle)}>Permanent</span>
          </div>
          <div className={css(bodyBlockStyle)}>
            <span className={css(titleStyle)}>
              <Trans>Hire Date</Trans>
            </span>
            <span className={css(descriptionStyle)}>{hireDate}</span>
          </div>
          <div className={css(bodyBlockStyle)}>
            <span className={css(titleStyle)}>
              <Trans>Location</Trans>
            </span>
            <span className={css(descriptionStyle)}>London</span>
          </div>
        </div>
      </div>
    </BasicTile>
  );
};

export default ProfessionalInformation;

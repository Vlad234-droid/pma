import React, { FC } from 'react';
import { Rule, useStyle } from '@pma/dex-wrapper';
import DescriptionBlock from 'components/DescriptionBlock';
import { Attention } from 'components/Form';
import StrategicDriversForm from './components/StrategicDriversForm';
import StrategicDriversLogs from './components/StrategicDriversLogs';
import { Trans } from 'components/Translation';

const StrategicDrivers: FC = () => {
  const { css } = useStyle();

  return (
    <div className={css(contentArea)}>
      <DescriptionBlock>
        <div className={css(descriptionHeader)}>
          <Trans i18nKey='strategic_driver'>Strategic driver</Trans>
        </div>
        <Attention />
        <div className={css(descriptionText)}>
          <Trans i18nKey='create_titles_for_strategic_drivers'>
            Create titles for Strategic drivers. Click “Save” button to keep the changes. Or “Publish” to cascade them
            on the colleagues.
          </Trans>
        </div>
        <div>
          <StrategicDriversForm />
        </div>
        <StrategicDriversLogs />
      </DescriptionBlock>
    </div>
  );
};

const contentArea: Rule = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
};

const descriptionText: Rule = ({ theme }) => {
  return {
    fontSize: theme.font.fixed.f16.fontSize,
    lineHeight: theme.font.fixed.f16.lineHeight,
    letterSpacing: '0px',
    paddingBottom: '32px',
  };
};

const descriptionHeader: Rule = ({ theme }) => {
  return {
    fontSize: theme.font.fixed.f20.fontSize,
    lineHeight: theme.font.fixed.f20.lineHeight,
    letterSpacing: '0px',
    fontWeight: theme.font.weight.bold,
    paddingBottom: '8px',
  };
};

export default StrategicDrivers;

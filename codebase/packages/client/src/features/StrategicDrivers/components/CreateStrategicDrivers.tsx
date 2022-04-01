import React, { FC } from 'react';
import { CreateRule, Rule, Theme, useStyle } from '@pma/dex-wrapper';
import DescriptionBlock from 'components/DescriptionBlock';
import { Attention } from 'components/Form';
import StrategicDriversForm from './StrategicDriversForm';
import StrategicDriversLogs from './StrategicDriversLogs';
import { Trans } from 'components/Translation';

const CreateStrategicDrivers: FC = () => {
  const { css, theme } = useStyle();

  return (
    <div className={css(contentArea)}>
      <DescriptionBlock>
        <div className={css(descriptionHeader({ theme }))}>
          <Trans i18nKey='strategic_driver'>Strategic driver</Trans>
        </div>
        <Attention />
        <div className={css(descriptionText({ theme }))}>
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

const descriptionText: CreateRule<{ theme: Theme }> = (props) => {
  if (props == null) return {};
  const { theme } = props;
  return {
    fontSize: `${theme.font.fixed.f16}`,
    lineHeight: '20px',
    paddingBottom: '32px',
  };
};

const descriptionHeader: CreateRule<{ theme: Theme }> = (props) => {
  if (props == null) return {};
  const { theme } = props;
  return {
    fontSize: `${theme.font.fixed.f20}`,
    lineHeight: '24px',
    fontWeight: 'bold',
    paddingBottom: '8px',
  };
};

export default CreateStrategicDrivers;

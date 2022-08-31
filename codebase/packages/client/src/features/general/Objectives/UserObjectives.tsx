import React, { FC } from 'react';
import { useParams } from 'react-router-dom';
import { Rule, useStyle } from '@pma/dex-wrapper';

import { Trans, useTranslation } from 'components/Translation';
import { IconButton } from 'components/IconButton';
import Accordion from './components/Accordion';
import Section from 'components/Section';
import Spinner from 'components/Spinner';
import { Plug } from 'components/Plug';
import { useSelector } from 'react-redux';
import { timelineTypesAvailabilitySelector } from '@pma/store';
import { ReviewType } from 'config/enum';
import { useObjectivesData, useDownload } from './hooks';

export const TEST_WRAPPER_ID = 'TEST_WRAPPER_ID';

const UserObjectives: FC = () => {
  const { css } = useStyle();
  const { t } = useTranslation();
  const { uuid } = useParams<{ uuid: string }>();

  const timelineTypes = useSelector(timelineTypesAvailabilitySelector(uuid));
  const canShowObjectives = timelineTypes[ReviewType.OBJECTIVE];

  const {
    objectives,
    meta: { loading, loaded },
  } = useObjectivesData(uuid);
  const download = useDownload(objectives);

  if (loading) return <Spinner fullHeight />;

  return (
    <>
      {canShowObjectives && (
        <>
          {loaded && !objectives.length ? (
            <Plug text={t('no_objectives_created', 'No objectives created')} customStyle={{}} />
          ) : (
            <Section
              testId={TEST_WRAPPER_ID}
              left={{
                content: <div className={css(tileStyles)}>User objectives</div>,
              }}
              right={{
                content: (
                  <div>
                    <IconButton
                      onPress={download}
                      graphic='download'
                      customVariantRules={{ default: iconButtonStyles }}
                      iconStyles={iconStyles}
                    >
                      <Trans data-test-id={'test-download-btn'} i18nKey='download'>
                        Download
                      </Trans>
                    </IconButton>
                  </div>
                ),
              }}
            >
              <Accordion objectives={objectives} canShowStatus={true} isButtonsVisible={false} />
            </Section>
          )}
        </>
      )}
    </>
  );
};

export default UserObjectives;

const tileStyles: Rule = {
  display: 'flex',
  alignItems: 'center',
};

const iconButtonStyles: Rule = ({ theme }) => ({
  padding: '10px 10px',
  color: theme.colors.tescoBlue,
  fontWeight: 700,
});

const iconStyles: Rule = {
  marginRight: '10px',
};

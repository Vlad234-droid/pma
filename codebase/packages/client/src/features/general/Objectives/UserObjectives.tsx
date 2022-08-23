import React, { FC, useEffect, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { Rule, useStyle } from '@pma/dex-wrapper';

import { Trans, useTranslation } from 'components/Translation';
import { IconButton } from 'components/IconButton';
import Accordion from './components/Accordion';
import Section from 'components/Section';
import Spinner from 'components/Spinner';
import { Plug } from 'components/Plug';
import { useSelector } from 'react-redux';
import { reviewsMetaSelector, schemaMetaSelector, timelineTypesAvailabilitySelector } from '@pma/store';
import { ReviewType } from 'config/enum';
import { useUserObjectivesData } from './hooks';
import { downloadPDF, ObjectiveDocument, usePDF } from '@pma/pdf-renderer';

export const TEST_WRAPPER_ID = 'TEST_WRAPPER_ID';

const UserObjectives: FC = () => {
  const { css } = useStyle();
  const { t } = useTranslation();
  const { loaded: schemaLoaded } = useSelector(schemaMetaSelector);
  const { loaded: reviewLoaded, loading: reviewLoading } = useSelector(reviewsMetaSelector);
  const { uuid } = useParams<{ uuid: string }>();

  const timelineTypes = useSelector(timelineTypesAvailabilitySelector(uuid));
  const canShowObjectives = timelineTypes[ReviewType.OBJECTIVE];

  const objectives = useUserObjectivesData(uuid, reviewLoaded, schemaLoaded);
  const document = useMemo(() => <ObjectiveDocument items={objectives} />, [JSON.stringify(objectives)]);
  const [instance, updateInstance] = usePDF({ document });

  useEffect(() => {
    if (objectives.length) {
      updateInstance();
    }
  }, [JSON.stringify(objectives)]);

  if (reviewLoading) return <Spinner fullHeight />;

  return (
    <>
      {canShowObjectives && (
        <>
          {reviewLoaded && !objectives.length ? (
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
                      onPress={() => downloadPDF(instance.url!, 'objectives.pdf')}
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

import React, { FC } from 'react';
import { Rule, useStyle } from '@pma/dex-wrapper';
import { timelineTypesAvailabilitySelector } from '@pma/store';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { Trans, useTranslation } from 'components/Translation';
import ExternalAccordion from './components/ExternalAccordion';
import Section from 'components/Section';
import Spinner from 'components/Spinner';
import { Plug } from 'components/Plug';
import { ReviewType } from 'config/enum';
import { useObjectivesData } from './hooks';

export const TEST_WRAPPER_ID = 'TEST_WRAPPER_ID';

const UserObjectives: FC = () => {
  const { css } = useStyle();
  const { t } = useTranslation();
  const { uuid } = useParams<{ uuid: string }>();

  const timelineTypes = useSelector(timelineTypesAvailabilitySelector(uuid!));
  const canShowObjectives = timelineTypes[ReviewType.QUARTER];

  const {
    objectives,
    meta: { loading, loaded },
  } = useObjectivesData(uuid as string);

  if (loading) return <Spinner fullHeight />;
  if (!canShowObjectives) return null;

  return (
    <>
      {loaded && !objectives.length ? (
        <Plug text={t('no_objectives_created', 'No objectives created')} />
      ) : (
        <Section
          testId={TEST_WRAPPER_ID}
          left={{
            content: (
              <div className={css(tileStyles)}>
                <Trans i18nKey='their_quarterly_priorities'>Their Quarterly Priorities</Trans>
              </div>
            ),
          }}
          right={{
            content: <div />,
          }}
        >
          <ExternalAccordion objectives={objectives} />
        </Section>
      )}
    </>
  );
};

export default UserObjectives;

const tileStyles: Rule = {
  display: 'flex',
  alignItems: 'center',
};

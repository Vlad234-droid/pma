import React, { FC } from 'react';
import { Rule, useStyle } from '@pma/dex-wrapper';
import {
  colleagueCurrentCycleSelector,
  getTimelineByCodeSelector,
  isReviewsInStatus,
  timelineTypesAvailabilitySelector,
} from '@pma/store';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { Trans, useTranslation } from 'components/Translation';
import { IconButton } from 'components/IconButton';
import Accordion from './components/Accordion';
import Section from 'components/Section';
import Spinner from 'components/Spinner';
import { Plug } from 'components/Plug';
import StatusBadge from 'components/StatusBadge';
import { ReviewType, Status } from 'config/enum';
import { useObjectivesData, useDownload } from './hooks';

export const TEST_WRAPPER_ID = 'TEST_WRAPPER_ID';

const UserObjectives: FC = () => {
  const { css } = useStyle();
  const { t } = useTranslation();
  const { uuid } = useParams<{ uuid: string }>();

  const timelineTypes = useSelector(timelineTypesAvailabilitySelector(uuid!));
  const canShowObjectives = timelineTypes[ReviewType.OBJECTIVE];
  const timelineObjective = useSelector(getTimelineByCodeSelector(ReviewType.OBJECTIVE, uuid!));
  const currentCycle = useSelector(colleagueCurrentCycleSelector(uuid!));

  const status = timelineObjective?.summaryStatus;
  const isAllObjectivesInSameStatus = useSelector(isReviewsInStatus(ReviewType.OBJECTIVE)(status));

  const {
    objectives,
    meta: { loading, loaded },
  } = useObjectivesData(uuid as string, currentCycle);

  const download = useDownload(objectives);

  if (loading) return <Spinner fullHeight />;

  return (
    <>
      {canShowObjectives && (
        <>
          {loaded && !objectives.length ? (
            <Plug text={t('no_objectives_created', 'No objectives created')} />
          ) : (
            <Section
              testId={TEST_WRAPPER_ID}
              left={{
                content: (
                  <div className={css(tileStyles)}>
                    <Trans i18nKey='my_objectives'>User objectives</Trans>
                    {!!objectives?.length &&
                      isAllObjectivesInSameStatus &&
                      ![Status.STARTED, Status.NOT_STARTED].includes(status!) && (
                        <StatusBadge status={status!} styles={statusBadgeStyle} />
                      )}
                  </div>
                ),
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
              <Accordion
                objectives={objectives}
                canShowStatus={!isAllObjectivesInSameStatus}
                isButtonsVisible={false}
              />
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

const statusBadgeStyle: Rule = { marginLeft: '10px' };

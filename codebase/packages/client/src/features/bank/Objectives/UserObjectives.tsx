import React, { FC, useState } from 'react';
import { Rule, useStyle } from '@pma/dex-wrapper';
import {
  colleagueCurrentCycleSelector,
  colleagueCycleDataSelector,
  colleagueUUIDSelector,
  filterReviewsByTypeSelector,
  ReviewsActions,
  reviewsMetaSelector,
  timelineTypesAvailabilitySelector,
} from '@pma/store';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { Trans, useTranslation } from 'components/Translation';
import ExternalAccordion from './components/ExternalAccordion';
import Section from 'components/Section';
import Spinner from 'components/Spinner';
import { Plug } from 'components/Plug';
import { ReviewType, Status } from 'config/enum';
import { useTimelineContainer } from 'contexts/timelineContext';
import { ExclamationMark, SuccessMark } from 'components/Icon';
import SuccessModal from 'components/SuccessModal';
import useDispatch from 'hooks/useDispatch';

import { useObjectivesData } from './hooks';
import { LineManagerButton } from './components/LineManagerButton';
import { ReviewAction } from './type';

export const TEST_WRAPPER_ID = 'TEST_WRAPPER_ID';

const statusMap: Record<ReviewAction, Record<Status.WAITING_FOR_APPROVAL | Status.WAITING_FOR_COMPLETION, Status>> = {
  [ReviewAction.APPROVE]: {
    [Status.WAITING_FOR_APPROVAL]: Status.APPROVED,
    [Status.WAITING_FOR_COMPLETION]: Status.COMPLETED,
  },
  [ReviewAction.DECLINE]: {
    [Status.WAITING_FOR_APPROVAL]: Status.DECLINED,
    [Status.WAITING_FOR_COMPLETION]: Status.APPROVED,
  },
};

const UserObjectives: FC = () => {
  const dispatch = useDispatch();
  const { css } = useStyle();
  const { t } = useTranslation();
  const { uuid } = useParams<{ uuid: string }>();
  const [showSuccessModal, setSuccessModal] = useState<ReviewAction | null>(null);
  const colleagueUuid = useSelector(colleagueUUIDSelector);
  const currentCycle = useSelector(colleagueCurrentCycleSelector(colleagueUuid));
  const cycle = useSelector(colleagueCycleDataSelector(colleagueUuid, currentCycle));
  const { saving } = useSelector(reviewsMetaSelector);

  const priorities = useSelector(filterReviewsByTypeSelector(ReviewType.QUARTER));
  const timelineTypes = useSelector(timelineTypesAvailabilitySelector(uuid!));
  const { currentTimelines } = useTimelineContainer();
  const { code } = currentTimelines[ReviewType.QUARTER] || { code: '' };
  const canShowObjectives = timelineTypes[ReviewType.QUARTER];

  const {
    objectives,
    meta: { loading, loaded },
  } = useObjectivesData(uuid as string);

  const handleUpdateReview = (action: ReviewAction, currentStatus: Status, reviewUuid?: string) => {
    setSuccessModal(action);
    dispatch(
      ReviewsActions.updateReviewStatus({
        updateParams: {},
        pathParams: {
          colleagueUuid: uuid!,
          approverUuid: colleagueUuid,
          cycleUuid: cycle.uuid,
          code,
          status: statusMap[action][currentStatus],
        },
        data: {
          colleagueUuid: uuid,
          reviews: priorities.filter((priority) => priority.uuid === reviewUuid),
        },
      }),
    );
  };

  if (showSuccessModal) {
    return (
      <SuccessModal
        title={'Quarterly Priorities'}
        onClose={() => {
          setSuccessModal(null);
          dispatch(ReviewsActions.updateReviewMeta({ saved: false }));
        }}
        description={
          showSuccessModal === ReviewAction.APPROVE
            ? 'You have agreed your colleagues priority.'
            : 'You have asked for quarterly priority to be reviewed and will be in touch with colleague soon to discuss their reasons.'
        }
        mark={showSuccessModal === ReviewAction.APPROVE ? <SuccessMark /> : <ExclamationMark />}
        loading={saving}
      />
    );
  }
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
          <ExternalAccordion objectives={objectives}>
            {(props) => <LineManagerButton {...props} onAction={handleUpdateReview} />}
          </ExternalAccordion>
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

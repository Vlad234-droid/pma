import React, { useEffect } from 'react';
import { Rule, useStyle } from '@pma/dex-wrapper';
import { ReviewType, Status, Tenant } from 'config/enum';
import {
  colleagueUUIDSelector,
  getReviewSchema,
  getTimelineByCodeSelector,
  isReviewsInStatus,
  ReviewsActions,
  timelineTypesAvailabilitySelector,
  getActiveTimelineByReviewTypeSelector,
  colleagueCurrentCycleSelector,
} from '@pma/store';
import { Trans, useTranslation } from 'components/Translation';
import { EditButton } from '../Buttons';
import Accordion from '../Accordion';
import Section from 'components/Section';
import StatusBadge from 'components/StatusBadge';
import { useSelector } from 'react-redux';
import { USER } from 'config/constants';
import { IconButton } from 'components/IconButton';
import Spinner from 'components/Spinner';
import useDispatch from 'hooks/useDispatch';
import { useObjectivesData, useDownload } from '../../hooks';
import { canEditAllObjectiveFn } from '../../utils';

export const TEST_ID = 'objectives-test-id';

const Objectives = () => {
  const { css } = useStyle();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const uuid = useSelector(colleagueUUIDSelector);

  const activeTimeline = useSelector(getActiveTimelineByReviewTypeSelector(ReviewType.OBJECTIVE, USER.current));
  const colleagueUuid = useSelector(colleagueUUIDSelector);
  const objectiveSchema = useSelector(getReviewSchema(activeTimeline?.code)) || {};
  const currentCycle = useSelector(colleagueCurrentCycleSelector(colleagueUuid));
  const {
    objectives,
    meta: { loading, loaded },
  } = useObjectivesData(uuid, currentCycle);

  const timelineTypes = useSelector(timelineTypesAvailabilitySelector(colleagueUuid)) || {};
  const canShowObjectives = timelineTypes[ReviewType.OBJECTIVE];

  const timelineObjective = useSelector(getTimelineByCodeSelector(ReviewType.OBJECTIVE, USER.current, currentCycle));
  const status = timelineObjective?.summaryStatus;
  const isAllObjectivesInSameStatus = useSelector(isReviewsInStatus(ReviewType.OBJECTIVE)(status));

  const download = useDownload(objectives);

  const countDraftReviews = parseInt(timelineObjective?.statistics?.[Status.DRAFT] || '0');
  const countDeclinedReviews = parseInt(timelineObjective?.statistics?.[Status.DECLINED] || '0');
  const countWaitingForApprovalReviews = parseInt(timelineObjective?.statistics?.[Status.WAITING_FOR_APPROVAL] || '0');

  const canEditAllObjective = canEditAllObjectiveFn({
    objectiveSchema,
    countDraftReviews,
    countDeclinedReviews,
    countWaitingForApprovalReviews,
  });

  useEffect(() => {
    if (canShowObjectives) {
      dispatch(ReviewsActions.getReviews({ pathParams: { colleagueUuid, cycleUuid: currentCycle } }));
    }
  }, [canShowObjectives, currentCycle]);

  if (loading) return <Spinner fullHeight />;

  return (
    <Section
      left={{
        content: (
          <div className={css(tileStyles)}>
            <Trans i18nKey='my_objectives'>My objectives</Trans>
            {!!objectives?.length &&
              isAllObjectivesInSameStatus &&
              ![Status.STARTED, Status.NOT_STARTED].includes(status!) && (
                <StatusBadge status={status!} styles={statusBadgeStyle} />
              )}
          </div>
        ),
      }}
      right={{
        content: objectives.length ? (
          <div data-test-id={TEST_ID}>
            <IconButton
              onPress={download}
              graphic='download'
              customVariantRules={{ default: iconButtonStyles }}
              iconStyles={iconStyles}
            >
              <Trans i18nKey='download'>Download</Trans>
            </IconButton>
            {canEditAllObjective && (
              <EditButton buttonText={t('edit_all', 'Edit all')} icon={'edit'} styles={borderButtonStyles} />
            )}
          </div>
        ) : null,
      }}
    >
      {loaded && objectives.length ? (
        <Accordion objectives={objectives} canShowStatus={!isAllObjectivesInSameStatus} />
      ) : (
        <div className={css(emptyBlockStyle)}>
          <Trans i18nKey={'no_objectives_created'} ns={Tenant.GENERAL}>
            No objectives created
          </Trans>
        </div>
      )}
    </Section>
  );
};

export default Objectives;

const emptyBlockStyle: Rule = ({ theme }) => {
  return {
    paddingBottom: '20px',
    fontSize: theme.font.fixed.f16.fontSize,
    lineHeight: theme.font.fixed.f16.lineHeight,
    letterSpacing: '0px',
  };
};

const tileStyles: Rule = ({ theme }) => ({
  ...theme.font.fixed.f18,
  letterSpacing: '0px',
  display: 'flex',
  alignItems: 'center',
});

const statusBadgeStyle: Rule = { marginLeft: '10px' };

const iconStyles: Rule = { marginRight: '10px' };

const iconButtonStyles: Rule = ({ theme }) => ({
  padding: '10px 10px',
  color: theme.colors.tescoBlue,
  fontWeight: theme.font.weight.bold,
  ...theme.font.fixed.f16,
  letterSpacing: '0px',
});

const borderButtonStyles: Rule = ({ theme }) => ({
  ...theme.font.fixed.f16,
  letterSpacing: '0px',
  border: `2px solid ${theme.colors.tescoBlue}`,
  borderRadius: '30px',
  color: theme.colors.tescoBlue,
  fontWeight: theme.font.weight.bold,
  padding: '6px 16px',
});

import React, { useEffect, useMemo } from 'react';
import { Rule, useStyle } from '@pma/dex-wrapper';
import { ReviewType, Status } from 'config/enum';
import {
  colleagueUUIDSelector,
  countByStatusReviews,
  filterReviewsByTypeSelector,
  getReviewSchema,
  getTimelineByCodeSelector,
  isReviewsInStatus,
  ReviewsActions,
  reviewsMetaSelector,
  timelineTypesAvailabilitySelector,
} from '@pma/store';
import { Trans, useTranslation } from 'components/Translation';
import {
  canEditAllObjectiveFn,
  EditButton,
  ObjectiveTypes,
  transformReviewsToObjectives,
} from 'features/general/Objectives';
import { Accordion } from 'features/general/ObjectiveAccordion';
import Section from 'components/Section';
import StatusBadge from 'components/StatusBadge';
import { useSelector } from 'react-redux';
import { USER } from 'config/constants';
import { IconButton } from 'components/IconButton';
import { downloadPDF, ObjectiveDocument, usePDF } from '@pma/pdf-renderer';
import Spinner from 'components/Spinner';
import useDispatch from 'hooks/useDispatch';

export const TEST_ID = 'objectives-test-id';

const Objectives = () => {
  const { css } = useStyle();
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const colleagueUuid = useSelector(colleagueUUIDSelector);
  const originObjectives = useSelector(filterReviewsByTypeSelector(ReviewType.OBJECTIVE));
  const objectiveSchema = useSelector(getReviewSchema(ReviewType.OBJECTIVE));
  const { components = [] } = objectiveSchema;
  const formElements = components.filter((component) => component.type != 'text');
  const objectives: ObjectiveTypes.Objective[] = transformReviewsToObjectives(originObjectives, formElements);
  const timelineTypes = useSelector(timelineTypesAvailabilitySelector(colleagueUuid)) || {};
  const canShowObjectives = timelineTypes[ReviewType.OBJECTIVE];

  const { loading: reviewLoading } = useSelector(reviewsMetaSelector);
  const timelineObjective = useSelector(getTimelineByCodeSelector(ReviewType.OBJECTIVE, USER.current)) || {};
  const status = timelineObjective?.summaryStatus || undefined;
  const isAllObjectivesInSameStatus = useSelector(isReviewsInStatus(ReviewType.OBJECTIVE)(status));

  const document = useMemo(() => <ObjectiveDocument items={objectives} />, [JSON.stringify(objectives)]);
  const [instance, updateInstance] = usePDF({ document });

  const countDraftReviews = useSelector(countByStatusReviews(ReviewType.OBJECTIVE, Status.DRAFT)) || 0;
  const countDeclinedReviews = useSelector(countByStatusReviews(ReviewType.OBJECTIVE, Status.DECLINED)) || 0;
  const countWaitingForApprovalReviews =
    useSelector(countByStatusReviews(ReviewType.OBJECTIVE, Status.WAITING_FOR_APPROVAL)) || 0;

  const canEditAllObjective = canEditAllObjectiveFn({
    objectiveSchema,
    countDraftReviews,
    countDeclinedReviews,
    countWaitingForApprovalReviews,
  });

  useEffect(() => {
    if (objectives.length) {
      updateInstance();
    }
  }, [JSON.stringify(objectives)]);

  useEffect(() => {
    if (canShowObjectives) {
      dispatch(ReviewsActions.getReviews({ pathParams: { colleagueUuid, cycleUuid: 'CURRENT' } }));
    }

    return () => {
      dispatch(ReviewsActions.clearReviewData());
    };
  }, [canShowObjectives]);

  return (
    <Section
      left={{
        content: (
          <div className={css(tileStyles)}>
            <Trans i18nKey='my_objectives'>My objectives</Trans>
            {isAllObjectivesInSameStatus && ![Status.STARTED, Status.NOT_STARTED].includes(status) && (
              <StatusBadge status={status} styles={statusBadgeStyle} />
            )}
          </div>
        ),
      }}
      right={{
        content: (
          <div data-test-id={TEST_ID}>
            <IconButton
              onPress={() => downloadPDF(instance.url!, 'objectives.pdf')}
              graphic='download'
              customVariantRules={{ default: iconButtonStyles }}
              iconStyles={iconStyles}
            >
              <Trans i18nKey='download'>Download</Trans>
            </IconButton>
            {canEditAllObjective && (
              <EditButton
                isSingleObjectivesEditMode={false}
                buttonText={t('edit_all', 'Edit all')}
                icon={'edit'}
                styles={borderButtonStyles}
              />
            )}
          </div>
        ),
      }}
    >
      {reviewLoading ? (
        <Spinner fullHeight />
      ) : objectives.length ? (
        <Accordion objectives={objectives} canShowStatus={!isAllObjectivesInSameStatus} />
      ) : (
        <div className={css(emptyBlockStyle)}>
          <Trans i18nKey={'no_objectives_created'}>No objectives created</Trans>
        </div>
      )}
    </Section>
  );
};

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

export default Objectives;

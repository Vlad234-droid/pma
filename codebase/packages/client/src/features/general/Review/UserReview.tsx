import React, { FC, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CreateRule, Rule, useStyle } from '@pma/dex-wrapper';
import {
  ColleagueActions,
  colleagueCurrentCycleSelector,
  Component,
  currentUserSelector,
  ExpressionValueType,
  getColleagueMetaSelector,
  getColleagueSelector,
  getReviewByTypeSelector,
  getReviewSchema,
  getTimelineByReviewTypeSelector,
  ReviewsActions,
  reviewsMetaSelector,
  SchemaActions,
  schemaMetaSelector,
  Statuses,
  colleagueCycleDataSelector,
  TimelineActions,
  timelinesMetaSelector,
} from '@pma/store';
import { useParams } from 'react-router';

import { ReviewType, Status } from 'config/enum';
import { TriggerModal } from 'features/general/Modal/components/TriggerModal';
import { useTranslation } from 'components/Translation';
import { ProfileInfo } from 'components/ProfileInfo';
import SuccessModal from 'components/SuccessModal';
import { Icon as IconComponent, SuccessMark } from 'components/Icon';
import Spinner from 'components/Spinner';

import { LineManagerButtons } from './components/LineManagerButtons';
import { ReviewHelpModal } from './components/ReviewHelp';
import { InfoBlock } from 'components/InfoBlock';
import { formTagComponents } from 'utils/schema';
import { Review } from 'config/types';
import ReviewForm from './components/ReviewForm';

export type Props = {
  reviewType: ReviewType.MYR | ReviewType.EYR;
  onClose: () => void;
};

const UserReview: FC<Props> = ({ reviewType, onClose }) => {
  const { css, theme, matchMedia } = useStyle();
  const mobileScreen = matchMedia({ xSmall: true, small: true }) || false;
  const { t } = useTranslation();
  const { uuid } = useParams<{ uuid: string }>();
  const colleagueUuid = uuid!;

  const colleague = useSelector(getColleagueSelector(colleagueUuid));
  const { loaded: colleagueLoaded } = useSelector(getColleagueMetaSelector);

  const [successModal, setSuccessModal] = useState<Statuses.DECLINED | Statuses.APPROVED | null>(null);
  const { info } = useSelector(currentUserSelector);
  const currentCycle = useSelector(colleagueCurrentCycleSelector(colleagueUuid));
  const cycle = useSelector(colleagueCycleDataSelector(colleagueUuid, currentCycle));
  const dispatch = useDispatch();
  const review: Review = useSelector(getReviewByTypeSelector(reviewType)) || {};
  const formValues = review?.properties || {};

  const { loading: reviewLoading, loaded: reviewLoaded, saving, saved } = useSelector(reviewsMetaSelector);
  const { loading: schemaLoading, loaded: schemaLoaded } = useSelector(schemaMetaSelector);
  const { loading: timelineLoading } = useSelector(timelinesMetaSelector) || {};
  const schema = useSelector(getReviewSchema(reviewType));

  const timeline = useSelector(getTimelineByReviewTypeSelector(reviewType, colleagueUuid, currentCycle)) || ({} as any);

  const cycleCompletedCondition = cycle?.status && [Status.COMPLETED, Status.FINISHING].includes(cycle.status);
  const declineCondition =
    !cycleCompletedCondition && (review.status === Status.APPROVED || review.status === Status.WAITING_FOR_APPROVAL);
  const approveCondition = !cycleCompletedCondition && review.status === Status.WAITING_FOR_APPROVAL;

  const { components = [] as Component[] } = schema;

  const filteredComponent = useMemo(
    () =>
      components?.filter((component) => {
        const { key = '', expression = {} } = component;
        const value = key && review?.properties?.[key] ? review.properties[key] : '';
        const keyVisibleOnEmptyValue = ExpressionValueType.OVERALL_RATING;
        return !(expression?.auth?.permission?.read?.length && !value && key !== keyVisibleOnEmptyValue);
      }),
    [components, review],
  );

  useEffect(() => {
    if (!successModal && saved) {
      dispatch(ReviewsActions.updateReviewMeta({ saved: false }));
      onClose();
    }
  }, [saved, successModal]);

  useEffect(() => {
    dispatch(ReviewsActions.getReviews({ pathParams: { colleagueUuid, cycleUuid: currentCycle } }));
  }, [currentCycle]);

  useEffect(() => {
    if (reviewLoaded) {
      dispatch(SchemaActions.getSchema({ colleagueUuid, cycleUuid: currentCycle || 'CURRENT' }));
      dispatch(TimelineActions.getUserTimeline({ colleagueUuid, cycleUuid: currentCycle }));
    }
  }, [reviewLoaded]);

  useEffect(() => {
    if (!colleagueLoaded && colleagueUuid) {
      dispatch(ColleagueActions.getColleagueByUuid({ colleagueUuid }));
    }
  }, [colleagueUuid, colleagueLoaded]);

  const handleSaveDraft = () => {
    //todo not used for manager view
  };

  const handleSubmitData = async () => {
    //todo not used for manager view
  };

  const handleUpdateStatusReview = (status: Statuses.DECLINED | Statuses.APPROVED) => {
    if (colleague?.colleagueUUID) {
      dispatch(
        ReviewsActions.updateReviewStatus({
          updateParams: {},
          pathParams: {
            colleagueUuid: colleague?.colleagueUUID,
            approverUuid: info.colleagueUUID,
            cycleUuid: currentCycle,
            code: timeline?.code || reviewType,
            status: status,
          },
          data: {
            reason: '',
            status: status,
            code: timeline?.code || reviewType,
            cycleUuid: currentCycle,
            colleagueUuid: colleague?.colleagueUUID,
            // @ts-ignore
            reviews: [review],
          },
        }),
      );
      setSuccessModal(status);
    }
  };

  if (reviewLoading || schemaLoading || saving || timelineLoading) {
    return <Spinner fullHeight />;
  }

  if (!schemaLoaded || !reviewLoaded) return null;

  if (saved && successModal) {
    return (
      <SuccessModal
        title='Review sent'
        mark={<SuccessMark />}
        onClose={onClose}
        customButtonStyles={{ color: theme.colors.white, background: theme.colors.tescoBlue }}
        description={
          successModal === Statuses.DECLINED
            ? t(
                `review_form_was_sent_back_${reviewType}`.toLowerCase(),
                `The xx Year-end review form was sent back to the ${
                  colleague?.profile?.fullName || 'undefined'
                } to resubmit their rating.`,
                { fullName: colleague?.profile?.fullName },
              )
            : t(
                `review_form_approved_${reviewType}`.toLowerCase(),
                `You xxx have approved ${colleague?.profile?.fullName || 'undefined'} year-end review.`,
                { fullName: colleague?.profile?.fullName },
              )
        }
      />
    );
  }

  return (
    <div className={css(containerStyle)}>
      <div className={css(wrapperStyle({ mobileScreen }))}>
        <span className={css(iconLeftPositionStyle({ mobileScreen }))} onClick={onClose}>
          <IconComponent graphic='arrowLeft' invertColors={true} />
        </span>
        <div>
          <div className={css({ paddingBottom: '24px' })}>
            <div className={css(formTitleStyle, { paddingBottom: '24px' })}>
              {t(`review_your_colleagues_performance_${reviewType.toLowerCase()}`)}
            </div>
            <ProfileInfo
              firstName={colleague?.profile?.fullName}
              lastName={''}
              job={colleague?.profile?.job}
              department={colleague?.profile?.department}
              toneOfVoice={''}
            />
          </div>
          <div className={css({ padding: `0 0 ${theme.spacing.s5}` })}>
            <TriggerModal
              triggerComponent={
                <InfoBlock text={t('need_help_to_write', 'Need help with what to write?', { ns: 'general' })} />
              }
              title={t('completing_your_review', 'Completing your review')}
            >
              <ReviewHelpModal />
            </TriggerModal>
            <ReviewForm
              components={formTagComponents(filteredComponent, theme)}
              readonly={true}
              onClose={onClose}
              onSubmit={handleSubmitData}
              onSaveDraft={handleSaveDraft}
              reviewType={reviewType}
              defaultValues={formValues}
              reviewStatus={review?.status}
              customButtons={() => (
                <LineManagerButtons
                  onClose={onClose}
                  onSave={handleUpdateStatusReview}
                  canDecline={declineCondition}
                  canApprove={approveCondition}
                />
              )}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const containerStyle: Rule = { height: '100%' };

const wrapperStyle: CreateRule<{ mobileScreen: boolean }> =
  ({ mobileScreen }) =>
  ({ theme }) => ({
    height: '100%',
    overflow: 'auto',
    padding: mobileScreen ? `0 ${theme.spacing.s4}` : `0 ${theme.spacing.s10}`,
  });

const iconLeftPositionStyle: CreateRule<{ mobileScreen: boolean }> =
  ({ mobileScreen }) =>
  ({ theme }) => ({
    position: 'fixed',
    top: theme.spacing.s5,
    left: mobileScreen ? theme.spacing.s5 : theme.spacing.s10,
    textDecoration: 'none',
    border: 'none',
    cursor: 'pointer',
  });

const formTitleStyle: Rule = ({ theme }) => ({
  fontSize: theme.font.fixed.f24.fontSize,
  lineHeight: theme.font.fluid.f24.lineHeight,
  letterSpacing: '0px',
  fontWeight: theme.font.weight.bold,
});

export default UserReview;

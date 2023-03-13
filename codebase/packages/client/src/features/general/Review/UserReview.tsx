import React, { FC, useEffect, useMemo, useState } from 'react';
import { CreateRule, Rule, useStyle } from '@pma/dex-wrapper';
import {
  ColleagueActions,
  Component,
  ExpressionValueType,
  getReviewSchema,
  ReviewsActions,
  SchemaActions,
  Statuses,
  TimelineActions,
} from '@pma/store';
import { useDispatch, useSelector } from 'react-redux';

import { TriggerModal } from 'features/general/Modal/components/TriggerModal';
import { Icon as IconComponent, SuccessMark } from 'components/Icon';
import { useTranslation } from 'components/Translation';
import { ProfileInfo } from 'components/ProfileInfo';
import SuccessModal from 'components/SuccessModal';
import Spinner from 'components/Spinner';

import { LineManagerButtons } from './components/LineManagerButtons';
import { PeopleTeamButtons } from './components/PeopleTeamButtons';
import { ReviewHelpModal } from './components/ReviewHelp';
import { InfoBlock } from 'components/InfoBlock';
import ReviewForm from './components/ReviewForm';
import { formTagComponents } from 'utils/schema';
import { ReviewType, Status } from 'config/enum';
import { useEYRPermissions, useMetaData, useMYRPermissions, usePermissions } from './hooks';

export type Props = {
  reviewType: ReviewType.MYR | ReviewType.EYR;
  onClose: () => void;
};

const UserReview: FC<Props> = ({ reviewType, onClose }) => {
  const { css, theme, matchMedia } = useStyle();
  const mobileScreen = matchMedia({ xSmall: true, small: true }) || false;
  const { t } = useTranslation();
  const [successModal, setSuccessModal] = useState<Statuses.DECLINED | Statuses.APPROVED | null>(null);
  const dispatch = useDispatch();

  const schema = useSelector(getReviewSchema(reviewType));

  const {
    colleagueLoaded,
    reviewLoading,
    reviewLoaded,
    saving,
    saved,
    schemaLoading,
    schemaLoaded,
    timelineLoading,
    info,
  } = useMetaData();

  const { isPeopleTeam, isLineManager } = usePermissions();
  const { declineCondition, approveCondition, currentCycle, colleague, colleagueUuid, timeline, review, readonly } =
    reviewType === ReviewType.EYR ? useEYRPermissions(reviewType) : useMYRPermissions(reviewType);

  const formValues = review?.properties || {};

  const { components = [] as Component[] } = schema;

  const filteredComponent = useMemo(
    () =>
      components?.filter((component) => {
        const { key = '', expression = {} } = component;
        const canLMWrite =
          ![Status.LOCKED, Status.FINISHING, Status.COMPLETED].includes(timeline?.status) &&
          isLineManager &&
          (review?.status === Status.WAITING_FOR_APPROVAL || review?.status === Status.APPROVED);
        const canPTWrite =
          isPeopleTeam &&
          review?.status === Status.APPROVED &&
          [Status.LOCKED, Status.FINISHING, Status].includes(timeline?.status);

        const isBlocked =
          [Status.LOCKED, Status.FINISHING, Status.COMPLETED].includes(timeline?.status) &&
          review?.status === Status.WAITING_FOR_APPROVAL;

        const canWrite = key === ExpressionValueType.LM_FEEDBACK && (canLMWrite || canPTWrite);

        if (canWrite) component.canWrite = true;

        const value = key && review?.properties?.[key] ? review.properties[key] : '';
        const keyVisibleOnEmptyValue = ExpressionValueType.OVERALL_RATING;
        const visibleLnFeedback = ExpressionValueType.LM_FEEDBACK;
        const isKeyVisible = expression?.auth?.permission?.read?.length && !value && key !== keyVisibleOnEmptyValue;
        const isLNFeedbackVisible = key !== visibleLnFeedback;
        return isBlocked ? !isKeyVisible : !(isKeyVisible && isLNFeedbackVisible);
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
    dispatch(ReviewsActions.getReviews({ pathParams: { colleagueUuid, cycleUuid: currentCycle || 'CURRENT' } }));
  }, [currentCycle]);

  useEffect(() => {
    if (reviewLoaded) {
      dispatch(SchemaActions.getSchema({ colleagueUuid, cycleUuid: currentCycle || 'CURRENT' }));
      dispatch(TimelineActions.getUserTimeline({ colleagueUuid, cycleUuid: currentCycle || 'CURRENT' }));
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

  const handleUpdateReview = async (data, status) => {
    if (colleague?.colleagueUUID) {
      dispatch(
        ReviewsActions.updateReviewStatus({
          updateParams: {},
          pathParams: {
            colleagueUuid: colleague?.colleagueUUID,
            approverUuid: info.colleagueUUID,
            cycleUuid: currentCycle || 'CURRENT',
            code: timeline?.code || reviewType,
            status: status,
          },
          data: {
            reason: '',
            status: status,
            code: timeline?.code || reviewType,
            cycleUuid: currentCycle || 'CURRENT',
            colleagueUuid: colleague?.colleagueUUID,
            //@ts-ignore
            reviews: [{ ...review, properties: { ...data } }],
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
              readonly={readonly}
              onClose={onClose}
              onSubmit={handleUpdateReview}
              onSaveDraft={handleSaveDraft}
              reviewType={reviewType}
              defaultValues={formValues}
              reviewStatus={review?.status}
              customButtons={
                !readonly
                  ? (isValid = false, onSubmit) => (
                      <PeopleTeamButtons isValid={isValid} onClose={onClose} onSave={(status) => onSubmit(status)} />
                    )
                  : (_, onSubmit) => (
                      <LineManagerButtons
                        onClose={onClose}
                        onSave={(status) => onSubmit(status)}
                        canDecline={declineCondition}
                        canApprove={approveCondition}
                      />
                    )
              }
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

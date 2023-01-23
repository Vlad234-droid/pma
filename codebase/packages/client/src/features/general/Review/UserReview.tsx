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
import { USER } from 'config/constants';
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

  const colleague = useSelector(getColleagueSelector);
  const { loaded: colleagueLoaded } = useSelector(getColleagueMetaSelector);

  const [successModal, setSuccessModal] = useState(false);
  const { info } = useSelector(currentUserSelector);
  const currentCycle = useSelector(colleagueCurrentCycleSelector(colleagueUuid));
  const dispatch = useDispatch();
  const review: Review = useSelector(getReviewByTypeSelector(reviewType)) || {};
  const formValues = review?.properties || {};

  const { loading: reviewLoading, loaded: reviewLoaded, saving, saved } = useSelector(reviewsMetaSelector);
  const { loading: schemaLoading, loaded: schemaLoaded } = useSelector(schemaMetaSelector);
  const schema = useSelector(getReviewSchema(reviewType));

  const timelineReview =
    useSelector(getTimelineByReviewTypeSelector(reviewType, USER.current, currentCycle)) || ({} as any);

  const yerModifyCondition =
    reviewType === ReviewType.EYR && timelineReview?.status === Status.COMPLETED && review.status === Status.APPROVED;

  const readonly = !yerModifyCondition;

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

  const handleDeclineApprovedReview = () => {
    if (colleague?.colleagueUUID) {
      dispatch(
        ReviewsActions.updateReviewStatus({
          updateParams: {},
          pathParams: {
            colleagueUuid: colleague?.colleagueUUID,
            approverUuid: info.colleagueUUID,
            cycleUuid: currentCycle,
            code: timelineReview.code,
            status: Statuses.DECLINED,
          },
          data: {
            reason: '',
            status: Statuses.DECLINED,
            code: timelineReview.code,
            cycleUuid: currentCycle,
            colleagueUuid: colleague?.colleagueUUID,
            // @ts-ignore
            reviews: [review],
          },
        }),
      );
      setSuccessModal(true);
    }
  };

  if (reviewLoading || schemaLoading || saving) {
    return <Spinner fullHeight />;
  }

  if (!schemaLoaded || !reviewLoaded) return null;

  if (saved && successModal) {
    return (
      <SuccessModal
        title='Review sent'
        mark={<SuccessMark />}
        onClose={onClose}
        description={`The Year-end review form was sent back to the ${
          colleague?.profile?.fullName || 'undefined'
        } to resubmit their rating.`}
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
              Review your collegue’s End-yeat performance
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
                <LineManagerButtons onClose={onClose} onSave={handleDeclineApprovedReview} readonly={readonly} />
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

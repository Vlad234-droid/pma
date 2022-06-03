import React, { FC, useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { CreateRule, Rule, useStyle } from '@pma/dex-wrapper';
import {
  currentUserSelector,
  getReviewByTypeSelector,
  getReviewSchema,
  getTimelineByReviewTypeSelector,
  ReviewsActions,
  reviewsMetaSelector,
  SchemaActions,
  schemaMetaSelector,
  Component,
} from '@pma/store';

import { ReviewType, Status } from 'config/enum';
import { createYupSchema } from 'utils/yup';
import { TriggerModal } from 'features/Modal/components/TriggerModal';
import { getReviewFormContent } from 'features/Objectives/utils';
import { useTranslation } from 'components/Translation';
import { Attention } from 'components/Form';
import SuccessModal from 'components/SuccessModal';
import { Icon as IconComponent } from 'components/Icon';
import Spinner from 'components/Spinner';

import ReviewHelpModal from './ReviewHelpModal';
import ReviewHelpTrigger from './ReviewHelpTrigger';
import ReviewButtons from './ReviewButtons';
import ReviewComponents from './ReviewComponents';
import ReviewComponentsNew from './ReviewComponentsNew';
import { USER } from 'config/constants';
import { useFormWithCloseProtection } from 'hooks/useFormWithCloseProtection';

export type ReviewFormModal = {
  reviewType: ReviewType;
  onClose: () => void;
};

const ReviewFormModal: FC<ReviewFormModal> = ({ reviewType, onClose }) => {
  const { css, theme, matchMedia } = useStyle();
  const mobileScreen = matchMedia({ xSmall: true, small: true }) || false;
  const { t } = useTranslation();

  const [successModal, setSuccessModal] = useState(false);
  const { info } = useSelector(currentUserSelector);
  const dispatch = useDispatch();
  const [review] = useSelector(getReviewByTypeSelector(reviewType));
  const formValues = review || {};
  const { loading: reviewLoading, loaded: reviewLoaded, updated: reviewUpdated } = useSelector(reviewsMetaSelector);
  const { loading: schemaLoading, loaded: schemaLoaded } = useSelector(schemaMetaSelector);
  const schema = useSelector(getReviewSchema(reviewType));
  // todo hardcoded. rewrite overallRatingRequestKey after merge
  const overallRatingListeners: string[] = ['what_rating', 'how_rating'];
  // todo hardcoded. rewrite getExpressionRequestKey after merge
  const overallRatingRequestKey = 'overall_rating';

  const timelineReview = useSelector(getTimelineByReviewTypeSelector(reviewType, USER.current));
  const readonly = [Status.WAITING_FOR_APPROVAL, Status.APPROVED].includes(timelineReview.status);

  const { helperText, title } = getReviewFormContent(reviewType, t);

  const { components = [] as Component[], display: newSchemaVersion } = schema;

  const componentV2 = newSchemaVersion
    ? components
        .flatMap((e) => e?.components || e)
        .filter((e) => e?.type === 'textarea' || e?.type === 'textfield' || e?.type === 'select')
    : [];
  const yepSchema = newSchemaVersion
    ? componentV2.reduce(createYupSchema(t), {})
    : components.reduce(createYupSchema(t), {});
  const methods = useFormWithCloseProtection({
    mode: 'onChange',
    resolver: yupResolver<Yup.AnyObjectSchema>(Yup.object().shape(yepSchema)),
    defaultValues: formValues,
  });

  const {
    getValues,
    handleSubmit,
    formState: { isValid },
    reset,
    watch,
    setValue,
  } = methods;

  const onSaveDraft = () => {
    const data = getValues();
    dispatch(
      ReviewsActions.updateReviews({
        pathParams: { colleagueUuid: info.colleagueUUID, type: reviewType, cycleUuid: 'CURRENT' },
        data: [
          {
            status: Status.DRAFT,
            properties: { ...data },
          },
        ],
      }),
    );
    onClose();
  };
  const onSubmit = async (data) => {
    dispatch(
      ReviewsActions.updateReviews({
        pathParams: { colleagueUuid: info.colleagueUUID, type: reviewType, cycleUuid: 'CURRENT' },
        data: [
          {
            status: Status.WAITING_FOR_APPROVAL,
            properties: { ...data },
          },
        ],
      }),
    );
    reset();
    setSuccessModal(true);
  };

  const updateRatingReviewRequest = useCallback(
    (review) => {
      const permitToOverallRatingRequest = overallRatingListeners?.length
        ? overallRatingListeners?.every((listener) => review[listener])
        : false;
      if (permitToOverallRatingRequest) {
        const filteredData = Object.fromEntries(
          Object.entries(review).filter(([key]) => overallRatingListeners?.includes(key)),
        );
        dispatch(ReviewsActions.updateRatingReview({ type: reviewType, number: 1, fields: filteredData }));
      }
    },
    [overallRatingListeners],
  );

  useEffect(() => {
    dispatch(
      ReviewsActions.getColleagueReviews({ pathParams: { colleagueUuid: info.colleagueUUID, cycleUuid: 'CURRENT' } }),
    );
    dispatch(SchemaActions.getSchema({ colleagueUuid: info.colleagueUUID }));
  }, []);

  useEffect(() => {
    const subscription = watch((review, { name = '' }) => {
      if (overallRatingListeners?.includes(name)) {
        updateRatingReviewRequest(review);
      }
    });
    return () => subscription.unsubscribe();
  }, [watch, reviewLoaded, schemaLoaded, overallRatingListeners]);

  useEffect(() => {
    if (overallRatingRequestKey && review?.[overallRatingRequestKey]) {
      setValue(overallRatingRequestKey, review[overallRatingRequestKey]);
    }
  }, [reviewUpdated, review, overallRatingRequestKey]);

  useEffect(() => {
    if (reviewLoaded && review) {
      reset(review);
    }
  }, [reviewLoaded]);

  if (reviewLoading && schemaLoading) {
    return <Spinner fullHeight />;
  }

  if (successModal) {
    return (
      <SuccessModal
        title='Review sent'
        onClose={onClose}
        description={t(
          `${timelineReview?.code?.toLowerCase()}_review_sent_to_manager`,
          'Your review has been sent to your line manager.',
        )}
      />
    );
  }

  return (
    <div className={css(containerStyle)}>
      <div className={css(wrapperStyle({ mobileScreen }))}>
        <span className={css(iconLeftPositionStyle({ mobileScreen }))} onClick={onClose}>
          <IconComponent graphic='arrowLeft' invertColors={true} />
        </span>
        <form data-test-id={'REVIEW_FORM_MODAL'}>
          <div className={css(formFieldsWrapperStyle)}>
            <div className={css(formTitleStyle)}>{title}</div>
            <div className={css(helperTextStyle)}>{helperText}</div>
            <div className={css({ padding: `0 0 ${theme.spacing.s5}`, display: 'flex' })}>
              <TriggerModal
                triggerComponent={<ReviewHelpTrigger />}
                title={t('completing_your_review', 'Completing your review')}
              >
                <ReviewHelpModal />
              </TriggerModal>
            </div>
            {!readonly && <Attention />}
            {newSchemaVersion ? (
              <ReviewComponentsNew
                components={components}
                review={formValues}
                methods={methods}
                readonly={readonly}
                status={timelineReview.status}
              />
            ) : (
              <ReviewComponents components={components} review={formValues} methods={methods} readonly={readonly} />
            )}
          </div>
          <ReviewButtons
            isValid={isValid}
            readonly={readonly}
            onClose={onClose}
            onSaveDraft={onSaveDraft}
            onSave={handleSubmit(onSubmit)}
          />
        </form>
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
  color: theme.colors.tescoBlue,
  fontWeight: theme.font.weight.bold,
});

const helperTextStyle: Rule = ({ theme }) => ({
  fontSize: theme.font.fixed.f18.fontSize,
  lineHeight: theme.font.fluid.f18.lineHeight,
  letterSpacing: '0px',
  color: theme.colors.tescoBlue,
  paddingTop: theme.spacing.s2,
  paddingBottom: theme.spacing.s5,
});

const formFieldsWrapperStyle: Rule = ({ theme }) => ({ padding: `0 0 ${theme.spacing.s5}` });

export default ReviewFormModal;

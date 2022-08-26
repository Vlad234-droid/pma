import React, { FC, useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { CreateRule, Rule, useStyle } from '@pma/dex-wrapper';
import {
  Component,
  currentUserSelector,
  getReviewPropertiesByTypeSelector,
  getReviewSchema,
  getTimelineByReviewTypeSelector,
  ReviewsActions,
  reviewsMetaSelector,
  SchemaActions,
  schemaMetaSelector,
  uuidCompareSelector,
} from '@pma/store';
import { useParams } from 'react-router';

import { ReviewType, Status } from 'config/enum';
import { createYupSchema } from 'utils/yup';
import { TriggerModal } from 'features/general/Modal/components/TriggerModal';
import { useTranslation } from 'components/Translation';
import { Attention } from 'components/Form';
import SuccessModal from 'components/SuccessModal';
import { Icon as IconComponent } from 'components/Icon';
import Spinner from 'components/Spinner';

import { ReviewHelpModal } from './components/ReviewHelp';
import { ReviewButtons } from './components/ReviewButtons';
import { ReviewComponents } from 'components/ReviewComponents';
import { InfoBlock } from 'components/InfoBlock';
import { USER } from 'config/constants';
import { useFormWithCloseProtection } from 'hooks/useFormWithCloseProtection';

type Translation = [string, string];

const TRANSLATION: Record<ReviewType.MYR | ReviewType.EYR, { title: Translation; helperText: Translation }> = {
  [ReviewType.MYR]: {
    title: ['mid_year_review_title', 'How is your year going so far?'],
    helperText: [
      'mid_year_review_help_text',
      'Use this to capture the outcome of the conversation you’ve had with your line manager. Remember to focus as much on your how as your what. Use the look forward section to capture your development for the year ahead.',
    ],
  },
  [ReviewType.EYR]: {
    title: ['end_year_review_title', 'What have you contributed this year and how have you gone about it?'],
    helperText: [
      'end_year_review_help_text',
      'Use this to capture the outcome of the conversation you’ve had with your line manager. Remember to focus as much on your how as your what. Use the look forward section to capture your priorities and development for the year ahead.',
    ],
  },
};

export type Review = {
  reviewType: ReviewType.MYR | ReviewType.EYR;
  onClose: () => void;
};

enum View {
  USER = 'USER',
  MANAGER = 'MANAGER',
}

const ReviewFormModal: FC<Review> = ({ reviewType, onClose }) => {
  const { css, theme, matchMedia } = useStyle();
  const mobileScreen = matchMedia({ xSmall: true, small: true }) || false;
  const { t } = useTranslation();
  const { uuid } = useParams<{ uuid: string }>();
  const isUserView = useSelector(uuidCompareSelector(uuid));

  const [view, setView] = useState<View | null>(null);
  const [successModal, setSuccessModal] = useState(false);
  const { info } = useSelector(currentUserSelector);
  const colleagueUuid = uuid ? uuid : info.colleagueUUID;
  const dispatch = useDispatch();
  const [review] = useSelector(getReviewPropertiesByTypeSelector(reviewType));
  const formValues = review || {};
  const { loading: reviewLoading, loaded: reviewLoaded, updated: reviewUpdated } = useSelector(reviewsMetaSelector);
  const { loading: schemaLoading, loaded: schemaLoaded } = useSelector(schemaMetaSelector);
  const schema = useSelector(getReviewSchema(reviewType));
  // todo hardcoded. rewrite overallRatingRequestKey after merge
  const overallRatingListeners: string[] = ['what_rating', 'how_rating'];
  // todo hardcoded. rewrite getExpressionRequestKey after merge
  const overallRatingRequestKey = 'overall_rating';

  const timelineReview = useSelector(getTimelineByReviewTypeSelector(reviewType, USER.current));
  const readonly =
    view === View.MANAGER
      ? true
      : [Status.WAITING_FOR_APPROVAL, Status.APPROVED].includes(timelineReview?.summaryStatus);

  const { components = [] as Component[] } = schema;

  const yepSchema = components.reduce(createYupSchema(t), {});
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
        pathParams: { colleagueUuid: info.colleagueUUID, code: timelineReview.code, cycleUuid: 'CURRENT' },
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
        pathParams: { colleagueUuid: info.colleagueUUID, code: timelineReview.code, cycleUuid: 'CURRENT' },
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
    if (!uuid) return setView(View.USER);
    isUserView ? setView(View.USER) : setView(View.MANAGER);
  }, []);

  useEffect(() => {
    dispatch(ReviewsActions.getColleagueReviews({ pathParams: { colleagueUuid, cycleUuid: 'CURRENT' } }));
    dispatch(SchemaActions.getSchema({ colleagueUuid }));
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

  if (!view) return null;

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
            <div className={css(formTitleStyle)}>{t(...TRANSLATION[reviewType].title, { ns: 'general' })}</div>
            <div className={css(helperTextStyle)}>{t(...TRANSLATION[reviewType].helperText, { ns: 'general' })}</div>
            <div className={css({ padding: `0 0 ${theme.spacing.s5}`, display: 'flex' })}>
              <TriggerModal
                triggerComponent={
                  <InfoBlock text={t('need_help_to_write', 'Need help with what to write?', { ns: 'general' })} />
                }
                title={t('completing_your_review', 'Completing your review')}
              >
                <ReviewHelpModal />
              </TriggerModal>
            </div>
            {!readonly && <Attention />}
            <ReviewComponents components={components} review={formValues} methods={methods} readonly={readonly} />
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

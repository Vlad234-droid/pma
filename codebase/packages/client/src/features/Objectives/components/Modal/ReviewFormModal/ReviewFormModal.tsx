import React, { FC, useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { CreateRule, Rule, Styles, useStyle } from '@pma/dex-wrapper';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  currentUserSelector,
  ExpressionValueType,
  FormType,
  getExpressionListenersKeys,
  getExpressionRequestKey,
  getReviewByTypeSelector,
  getReviewSchema,
  getTimelineByReviewTypeSelector,
  ReviewsActions,
  reviewsMetaSelector,
  SchemaActions,
  schemaMetaSelector,
} from '@pma/store';

import { ReviewType, Status } from 'config/enum';
import { createYupSchema } from 'utils/yup';
import { TriggerModal } from 'features/Modal/components/TriggerModal';
import { getReviewFormContent, formTagComponents } from 'features/Objectives/utils';
import { useTranslation } from 'components/Translation';
import { Input, Item, ItemProps, Select, Textarea, Attention, Text } from 'components/Form';
import { GenericItemField } from 'components/GenericForm';
import MarkdownRenderer from 'components/MarkdownRenderer';
import SuccessModal from 'components/SuccessModal';
import { Icon as IconComponent } from 'components/Icon';

import ReviewHelpModal from './ReviewHelpModal';
import ReviewHelpTrigger from './ReviewHelpTrigger';
import ReviewButtons from './ReviewButtons';

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
  const overallRatingListeners: string[] = useSelector(
    getExpressionListenersKeys(reviewType)(ExpressionValueType.OVERALL_RATING),
  );
  const overallRatingRequestKey: string = useSelector(
    getExpressionRequestKey(reviewType)(ExpressionValueType.OVERALL_RATING),
  );
  const timelineReview = useSelector(getTimelineByReviewTypeSelector(reviewType, 'me'));
  const readonly = [Status.WAITING_FOR_APPROVAL, Status.APPROVED].includes(timelineReview.status);

  const { helperText, title } = getReviewFormContent(reviewType, t);

  const { components = [] } = schema;
  const styledComponents = formTagComponents(components, theme);

  const yepSchema = styledComponents.reduce(createYupSchema(t), {});
  const methods = useForm({
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
            properties: {
              mapJson: data,
            },
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
            properties: {
              mapJson: data,
            },
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
    // todo use loading component when we have
    return null;
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
            {styledComponents.map((component) => {
              const {
                id,
                key,
                text,
                label,
                description,
                type,
                validate,
                values = [],
                expression = {},
                style = {},
              } = component;
              const value = formValues[key] ? formValues[key] : '';

              // todo temporary solution. Do not have full permission requirements. might be wrapper around field
              const keyVisibleOnEmptyValue = ExpressionValueType.OVERALL_RATING;
              let componentReadonly = readonly;
              if (expression?.auth?.permission?.read?.length && !value && key !== keyVisibleOnEmptyValue) {
                return null;
              } else if (expression?.auth?.permission?.read?.length) {
                componentReadonly = true;
              }
              // todo end temporary solution

              if (type === FormType.TEXT) {
                const CustomPTag = ({ children }) => {
                  return <p className={css(defaultTag)}>{children}</p>;
                };
                const defaultTag: Rule = ({ theme }) => ({
                  margin: '0px',
                  padding: '0px',
                  color: theme.colors.base,
                  fontSize: '18px',
                  lineHeight: '22px',
                });

                return (
                  <div className={css({ padding: 0, margin: 0 }, style)} key={id}>
                    <div
                      className={css({
                        padding: 0,
                        '& > p': {
                          padding: '16px 0 8px 0',
                          margin: 0,
                          fontSize: '16px',
                          lineHeight: '20px',
                        },
                        '& > h2': {
                          padding: readonly ? '14px 0 8px 0' : '14px 0px 8px',
                          margin: 0,
                          fontSize: '18px',
                          lineHeight: '22px',
                        },
                      } as Styles)}
                    >
                      <MarkdownRenderer components={{ p: CustomPTag }} source={text} />
                    </div>
                  </div>
                );
              }
              if (type === FormType.TEXT_FIELD) {
                return (
                  <div className={css(style)}>
                    <GenericItemField
                      key={id}
                      name={key}
                      methods={methods}
                      label={label}
                      Wrapper={Item}
                      wrapperProps={
                        (readonly
                          ? { marginBot: false, labelCustomStyle: { padding: 0 } }
                          : { marginBot: false, labelCustomStyle: { padding: '10px 0px 8px' } }) as ItemProps
                      }
                      //@ts-ignore
                      Element={readonly ? Text : validate?.maxLength > 100 ? Textarea : Input}
                      placeholder={description}
                      value={value}
                      readonly={componentReadonly}
                    />
                  </div>
                );
              }
              if (type === FormType.SELECT) {
                return (
                  <div className={css(style)}>
                    <GenericItemField
                      key={id}
                      name={key}
                      methods={methods}
                      label={label}
                      Wrapper={Item}
                      wrapperProps={
                        (readonly
                          ? { marginBot: false, labelCustomStyle: { padding: 0 } }
                          : { marginBot: false, labelCustomStyle: { padding: '10px 0px 8px' } }) as ItemProps
                      }
                      //@ts-ignore
                      Element={readonly ? Text : Select}
                      options={values}
                      placeholder={description}
                      value={value}
                      readonly={componentReadonly}
                    />
                  </div>
                );
              }
            })}
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
  fontSize: '24px',
  lineHeight: '28px',
  letterSpacing: '0px',
  color: theme.colors.tescoBlue,
  fontWeight: theme.font.weight.bold,
});

const helperTextStyle: Rule = ({ theme }) => ({
  fontSize: '18px',
  lineHeight: '24px',
  letterSpacing: '0px',
  color: theme.colors.tescoBlue,
  paddingTop: theme.spacing.s2,
  paddingBottom: theme.spacing.s5,
});

const formFieldsWrapperStyle: Rule = ({ theme }) => ({ padding: `0 0 ${theme.spacing.s5}` });

export default ReviewFormModal;

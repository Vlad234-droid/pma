import React, { FC, useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { Button, Icon, Rule, Styles, useBreakpoints, useStyle } from '@dex-ddl/core';
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
import { TFunction, Trans, useTranslation } from 'components/Translation';
import { Input, Item, Select, Textarea, Attention, Text } from 'components/Form';
import { GenericItemField } from 'components/GenericForm';
import MarkdownRenderer from 'components/MarkdownRenderer';
import SuccessModal from 'components/SuccessModal';
import { Icon as IconComponent } from 'components/Icon';

import { SubmitButton } from './index';
import ReviewHelpModal from './ReviewHelpModal';

export type ReviewFormModal = {
  reviewType: ReviewType;
  onClose: () => void;
};

const getContent = (reviewType: ReviewType, t: TFunction) => {
  const contents: {
    [key: string]: {
      title: string;
      helperText: string;
    };
  } = {
    [ReviewType.MYR]: {
      title: t('mid_year_review_title', 'How is your year going so far?'),
      helperText: t(
        'mid_year_review_help_text',
        'Use this to capture a summary of the mid-year conversation you’ve had with your line manager. Remember to focus as much on your how as your what.',
      ),
    },
    [ReviewType.EYR]: {
      title: t('end_year_review_title', 'What have you contributed this year and how have you gone about it?'),
      helperText: t(
        'end_year_review_help_text',
        'Use this to capture the outcome of the conversation you’ve had with your line manager. Remember to focus as much on your how as your what. Use the look forward section to capture your priorities and development for the year ahead.',
      ),
    },
  };

  return contents[reviewType];
};

const ReviewFormModal: FC<ReviewFormModal> = ({ reviewType, onClose }) => {
  const { css, theme } = useStyle();
  const { t } = useTranslation();
  const [, isBreakpoint] = useBreakpoints();
  const mobileScreen = isBreakpoint.small || isBreakpoint.xSmall;
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

  const { helperText, title } = getContent(reviewType, t);

  const { components = [] } = schema;

  const yepSchema = components.reduce(createYupSchema(t), {});
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
    <div className={css({ height: '100%' })}>
      <div
        className={css({
          height: '100%',
          overflow: 'auto',
          padding: mobileScreen ? `0 ${theme.spacing.s4}` : `0 ${theme.spacing.s10}`,
        })}
      >
        <span
          className={css({
            position: 'fixed',
            top: theme.spacing.s5,
            left: mobileScreen ? theme.spacing.s5 : theme.spacing.s10,
            textDecoration: 'none',
            border: 'none',
            cursor: 'pointer',
          })}
          onClick={onClose}
        >
          <IconComponent graphic='arrowLeft' invertColors={true} />
        </span>
        <form data-test-id={'REVIEW_FORM_MODAL'}>
          <div className={css({ padding: `0 0 ${theme.spacing.s5}` })}>
            <div
              className={css({
                fontSize: '24px',
                lineHeight: '28px',
                color: theme.colors.tescoBlue,
                fontWeight: theme.font.weight.bold,
              })}
            >
              {title}
            </div>
            <div
              className={css({
                fontSize: '18px',
                lineHeight: '24px',
                color: theme.colors.tescoBlue,
                paddingTop: theme.spacing.s2,
                paddingBottom: theme.spacing.s5,
              })}
            >
              {helperText}
            </div>
            <div className={css({ padding: `0 0 ${theme.spacing.s5}`, display: 'flex' })}>
              <TriggerModal
                triggerComponent={
                  <div className={css({ display: 'flex', alignItems: 'center' })}>
                    <Icon graphic='information' iconStyles={{ width: '18px' }} />
                    <span
                      className={css(theme.font.fixed.f14, {
                        color: theme.colors.tescoBlue,
                        padding: `${theme.spacing.s0} ${theme.spacing.s2}`,
                      })}
                    >
                      <Trans i18nKey='need_help_to_write'>Need help with what to write?</Trans>
                    </span>
                  </div>
                }
                title={t('completing_your_review', 'Completing your review')}
              >
                <ReviewHelpModal />
              </TriggerModal>
            </div>
            {!readonly && <Attention />}
            {components.map((component) => {
              const { id, key, text, label, description, type, validate, values = [], expression = {} } = component;
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
                  const { css } = useStyle();
                  return <p className={css(defaultTag)}>{children}</p>;
                };
                const defaultTag: Rule = ({ theme }) => ({
                  margin: '0px',
                  padding: '0px',
                  color: theme.colors.base,
                  fontSize: '18px',
                  lineHeight: '22px',
                });

                const components = { p: CustomPTag };
                return (
                  <div style={{ padding: 0, margin: 0 }} key={id}>
                    <div
                      className={css({
                        padding: 0,
                        '& > p': {
                          padding: readonly ? '16px 0 8px 0' : '0 0 8px 0',
                          margin: 0,
                          fontSize: '16px',
                          lineHeight: '20px',
                        },
                        '& > h2': {
                          padding: readonly ? '32px 0 16px 0' : '32px 0 20px 0',
                          margin: 0,
                          fontSize: '18px',
                          lineHeight: '22px',
                        },
                      } as Styles)}
                    >
                      <MarkdownRenderer components={components} source={text} />
                    </div>
                  </div>
                );
              }
              if (type === FormType.TEXT_FIELD) {
                return (
                  <GenericItemField
                    key={id}
                    name={key}
                    methods={methods}
                    label={label}
                    Wrapper={
                      readonly
                        ? ({ children, label }) => (
                            <Item withIcon={false} label={label} marginBot={false} labelCustomStyle={{ padding: 0 }}>
                              {children}
                            </Item>
                          )
                        : Item
                    }
                    //@ts-ignore
                    Element={readonly ? Text : validate?.maxLength > 100 ? Textarea : Input}
                    placeholder={description}
                    value={value}
                    readonly={componentReadonly}
                  />
                );
              }
              if (type === FormType.SELECT) {
                return (
                  <GenericItemField
                    key={id}
                    name={key}
                    methods={methods}
                    label={label}
                    Wrapper={
                      readonly
                        ? ({ children, label }) => (
                            <Item withIcon={false} label={label} marginBot={false} labelCustomStyle={{ padding: 0 }}>
                              {children}
                            </Item>
                          )
                        : Item
                    }
                    //@ts-ignore
                    Element={readonly ? Text : Select}
                    options={values}
                    placeholder={description}
                    value={value}
                    readonly={componentReadonly}
                  />
                );
              }
            })}
          </div>
          <div
            className={css({
              position: 'absolute',
              bottom: 0,
              left: 0,
              width: '100%',
            })}
          >
            <div
              className={css({
                position: 'relative',
                bottom: theme.spacing.s0,
                left: theme.spacing.s0,
                right: theme.spacing.s0,
                //@ts-ignore
                borderTop: `${theme.border.width.b1} solid ${theme.colors.lightGray}`,
              })}
            >
              <div
                className={css({
                  padding: mobileScreen ? theme.spacing.s7 : theme.spacing.s9,
                  display: 'flex',
                  justifyContent: 'center',
                })}
              >
                {readonly ? (
                  <Button
                    styles={[
                      theme.font.fixed.f16,
                      {
                        fontWeight: theme.font.weight.bold,
                        width: '50%',
                        margin: `${theme.spacing.s0} ${theme.spacing.s0_5}`,
                        background: theme.colors.white,
                        border: `${theme.border.width.b1} solid ${theme.colors.tescoBlue}`,
                        color: `${theme.colors.tescoBlue}`,
                      },
                    ]}
                    onClick={onClose}
                  >
                    <Trans i18nKey='close'>Close</Trans>
                  </Button>
                ) : (
                  <>
                    <Button
                      onClick={onSaveDraft}
                      styles={[
                        theme.font.fixed.f16,
                        {
                          fontWeight: theme.font.weight.bold,
                          width: '50%',
                          margin: `${theme.spacing.s0} ${theme.spacing.s0_5}`,
                          background: theme.colors.white,
                          border: `${theme.border.width.b1} solid ${theme.colors.tescoBlue}`,
                          color: `${theme.colors.tescoBlue}`,
                        },
                      ]}
                    >
                      <Trans i18nKey='save_as_draft'>Save as draft</Trans>
                    </Button>
                    <SubmitButton
                      title={''}
                      description={'Are you sure you want to submit your review to your line manager for approval?'}
                      isDisabled={!isValid}
                      onSave={handleSubmit(onSubmit)}
                      styles={[
                        theme.font.fixed.f16,
                        {
                          fontWeight: theme.font.weight.bold,
                          width: '50%',
                          margin: `${theme.spacing.s0} ${theme.spacing.s0_5}`,
                          background: `${theme.colors.tescoBlue}`,
                        },
                      ]}
                    />
                  </>
                )}
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ReviewFormModal;

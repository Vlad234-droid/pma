import React, { FC, HTMLProps, useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { Button, Icon, useBreakpoints, useStyle } from '@dex-ddl/core';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  FormType,
  currentUserSelector,
  getReviewByTypeSelector,
  getTimelineByReviewTypeSelector,
  ReviewsActions,
  reviewsMetaSelector,
  schemaMetaSelector,
  SchemaActions,
  getReviewSchema,
  getExpressionListenersKeys,
  ExpressionValueType,
} from '@pma/store';

import { ReviewType, Status } from 'config/enum';
import { createYupSchema } from 'utils/yup';
import { Trans, useTranslation, TFunction } from 'components/Translation';
import { Input, Item, Select, Textarea } from 'components/Form';
import { GenericItemField } from 'components/GenericForm';
import MarkdownRenderer from 'components/MarkdownRenderer';
import { TriggerModal } from 'features/Modal/components/TriggerModal';

import { SubmitButton } from './index';
import MidYearHelpModal from './MidYearHelpModal';
import SuccessModal from 'components/SuccessModal';

export type ReviewFormModal = {
  reviewType: ReviewType;
  onClose: () => void;
};

type Props = HTMLProps<HTMLInputElement> & ReviewFormModal;

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

const ReviewFormModal: FC<Props> = ({ reviewType, onClose }) => {
  const { css, theme } = useStyle();
  const { t } = useTranslation();
  const [, isBreakpoint] = useBreakpoints();
  const mobileScreen = isBreakpoint.small || isBreakpoint.xSmall;
  const [successModal, setSuccessModal] = useState(false);
  const { info } = useSelector(currentUserSelector);
  const dispatch = useDispatch();
  const [review] = useSelector(getReviewByTypeSelector(reviewType));
  const formValues = review || {};
  const { loading: reviewLoading, loaded: reviewLoaded } = useSelector(reviewsMetaSelector);
  const { loading: schemaLoading, loaded: schemaLoaded } = useSelector(schemaMetaSelector);
  const schema = useSelector(getReviewSchema(reviewType));
  const overallRatingListeners: string[] = useSelector(
    getExpressionListenersKeys(reviewType)(ExpressionValueType.OVERALL_RATING),
  );
  const timelineReview = useSelector(getTimelineByReviewTypeSelector(reviewType));
  const readonly = [Status.WAITING_FOR_APPROVAL, Status.APPROVED].includes(timelineReview.status);

  const { helperText, title } = getContent(reviewType, t);

  const { components = [] } = schema;

  const yepSchema = components.reduce(createYupSchema, {});
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

  const updateRatingSchemaRequest = useCallback(
    (review) => {
      const permitToOverallRatingRequest = overallRatingListeners?.length
        ? overallRatingListeners?.every((listener) => review[listener])
        : false;
      if (permitToOverallRatingRequest) {
        const filteredData = Object.fromEntries(
          Object.entries(review).filter(([key]) => overallRatingListeners?.includes(key)),
        );
        dispatch(SchemaActions.updateRatingSchema({ type: reviewType, fields: filteredData }));
      }
    },
    [overallRatingListeners],
  );

  useEffect(() => {
    if (!reviewLoaded) {
      dispatch(
        ReviewsActions.getColleagueReviews({ pathParams: { colleagueUuid: info.colleagueUUID, cycleUuid: 'CURRENT' } }),
      );
    }
  }, [reviewLoaded]);

  useEffect(() => {
    if (!schemaLoaded && reviewLoaded) {
      dispatch(SchemaActions.getSchema({ colleagueUuid: info.colleagueUUID }));
    }
  }, [schemaLoaded, reviewLoaded]);

  useEffect(() => {
    if (reviewLoaded && schemaLoaded && review && !successModal) {
      updateRatingSchemaRequest(review);
      reset(review);
    }
  }, [review, reviewLoaded, schemaLoaded, successModal]);

  useEffect(() => {
    const subscription = watch((review, { name = '' }) => {
      if (overallRatingListeners.includes(name)) {
        updateRatingSchemaRequest(review);
      }
    });
    return () => subscription.unsubscribe();
  }, [watch, reviewLoaded, schemaLoaded, overallRatingListeners]);

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
        <form data-test-id={'REVIEW_FORM_MODAL'}>
          <div className={css({ padding: `0 0 ${theme.spacing.s5}` })}>
            <div className={css({ fontSize: '24px', lineHeight: '28px', color: theme.colors.tescoBlue })}>{title}</div>
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
                    <Icon graphic='information' />
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
                <MidYearHelpModal />
              </TriggerModal>
            </div>
            {components.map((component) => {
              const { id, key, text, label, description, type, validate, values = [], expression = {} } = component;
              const value = formValues[key] ? formValues[key] : '';

              // todo temporary solution. Do not have full permission requirements. might be wrapper around field
              let componentReadonly = readonly;
              if (expression?.auth?.permission?.read?.length && !value) {
                return null;
              } else if (expression?.auth?.permission?.read?.length && value) {
                componentReadonly = true;
              }
              // todo end temporary solution

              if (type === FormType.TEXT) {
                return (
                  <div style={{ padding: '10px 0' }} key={id}>
                    <div
                      className={css({
                        fontSize: '16px',
                        lineHeight: '20px',
                      })}
                    >
                      <MarkdownRenderer source={text} />
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
                    Wrapper={Item}
                    Element={validate?.maxLength > 100 ? Textarea : Input}
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
                    Wrapper={({ children, label }) => (
                      <Item withIcon={false} label={label}>
                        {children}
                      </Item>
                    )}
                    Element={Select}
                    options={values}
                    placeholder={description}
                    value={value}
                    readonly={componentReadonly}
                  />
                );
              }
            })}
          </div>
          {!readonly && (
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
                  borderTop: `${theme.border.width.b1} solid ${theme.colors.backgroundDarkest}`,
                })}
              >
                <div
                  className={css({
                    padding: mobileScreen ? theme.spacing.s7 : theme.spacing.s9,
                    display: 'flex',
                    justifyContent: 'center',
                  })}
                >
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
                    onPress={onSaveDraft}
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
                </div>
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default ReviewFormModal;

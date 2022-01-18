import React, { FC, HTMLProps, useEffect, useState } from 'react';
import { Trans, useTranslation, TFunction } from 'components/Translation';
import { Button, Icon, useBreakpoints, useStyle } from '@dex-ddl/core';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

// todo use Generic form in future. For now just not use it because of more flexibility
import { useForm } from 'react-hook-form';
import { Input, Item, Select, Textarea } from 'components/Form';
import { GenericItemField } from 'components/GenericForm';
import MarkdownRenderer from 'components/MarkdownRenderer';
import { SubmitButton } from './index';
import { ReviewType, Status } from 'config/enum';
import { useDispatch, useSelector } from 'react-redux';
import {
  currentUserSelector,
  getReviewByTypeSelector,
  getTimelineByReviewTypeSelector,
  ReviewsActions,
  reviewsMetaSelector,
} from '@pma/store';
import { createYupSchema } from 'utils/yup';
import { useReviewSchemaWithPermission } from '../../hooks/useReviewSchema';
import { TriggerModal } from 'features/Modal/components/TriggerModal';
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

const getSuccessMessage = (reviewType: ReviewType, t: TFunction) => {
  const content = {
    [ReviewType.MYR]: t('mid_year_review_sent_to_manager', 'Your mid-year review has been sent to your line manager.'),
    [ReviewType.EYR]: t('end_year_review_sent_to_manager', 'Your end-year review has been sent to your line manager.'),
  };

  return content[reviewType];
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
  const { loading: reviewLoading } = useSelector(reviewsMetaSelector);
  const timelineReview = useSelector(getTimelineByReviewTypeSelector(reviewType));
  const readonly = [Status.WAITING_FOR_APPROVAL, Status.APPROVED].includes(timelineReview.status);
  const successMessage = getSuccessMessage(timelineReview?.code, t);

  const { helperText, title } = getContent(reviewType, t);

  const [schema] = useReviewSchemaWithPermission(reviewType);
  const { components = [] } = schema;

  const yepSchema = components.reduce(createYupSchema, {});
  const methods = useForm({
    mode: 'onChange',
    resolver: yupResolver<Yup.AnyObjectSchema>(Yup.object().shape(yepSchema)),
  });

  const {
    getValues,
    handleSubmit,
    formState: { isValid },
    reset,
  } = methods;
  const formValues = getValues();

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

  useEffect(() => {
    dispatch(
      ReviewsActions.getColleagueReviews({ pathParams: { colleagueUuid: info.colleagueUUID, cycleUuid: 'CURRENT' } }),
    );
  }, []);

  useEffect(() => {
    reset(review);
  }, [review]);

  if (reviewLoading) {
    return null;
  }

  if (timelineReview?.status === Status.WAITING_FOR_APPROVAL) {
    return (
      <SuccessModal
        onClose={onClose}
        description={successMessage || 'Your review has been sent to your line manager.'}
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
        <form>
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
                title={'Writing your objectives'}
              >
                <MidYearHelpModal />
              </TriggerModal>
            </div>
            {components.map((component) => {
              const { id, key, text, label, description, type, validate, values = [] } = component;
              const value = formValues[key] ? formValues[key] : '';
              if (type === 'text') {
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
              if (type === 'textfield' && validate?.maxLength <= 100) {
                return (
                  <GenericItemField
                    key={id}
                    name={key}
                    methods={methods}
                    label={label}
                    Wrapper={Item}
                    Element={Input}
                    placeholder={description}
                    value={value}
                    readonly={readonly}
                  />
                );
              }
              if (type === 'textfield') {
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
                    readonly={readonly}
                  />
                );
              }
              if (type === 'select') {
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
                    readonly={readonly}
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

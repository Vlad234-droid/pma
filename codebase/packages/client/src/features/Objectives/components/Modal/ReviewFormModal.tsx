import React, { FC, HTMLProps, useEffect } from 'react';

import { Trans } from 'components/Translation';

import { Button, Icon, useBreakpoints, useStyle } from '@dex-ddl/core';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

// todo use Generic form in future. For now just not use it because of more flexibility
import { useForm } from 'react-hook-form';
import { Icon as IconComponent } from 'components/Icon';
import { Input, Item, Select, Textarea } from 'components/Form';
import { GenericItemField } from 'components/GenericForm';
import { SubmitButton, SuccessModal } from './index';
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
import useReviewSchema from '../../hooks/useReviewSchema';

export type ReviewFormModal = {
  reviewType: ReviewType;
  onClose: () => void;
};

type Props = HTMLProps<HTMLInputElement> & ReviewFormModal;

const ReviewFormModal: FC<Props> = ({ reviewType, onClose }) => {
  const { css, theme } = useStyle();
  const [, isBreakpoint] = useBreakpoints();
  const mobileScreen = isBreakpoint.small || isBreakpoint.xSmall;
  const { info } = useSelector(currentUserSelector);
  const [review] = useSelector(getReviewByTypeSelector(reviewType));
  const { loaded: reviewLoaded, loading: reviewLoading } = useSelector(reviewsMetaSelector);
  const timelineReview = useSelector(getTimelineByReviewTypeSelector(reviewType));

  const [schema] = useReviewSchema(reviewType);
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
  };

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(
      ReviewsActions.getReviews({
        pathParams: { colleagueUuid: info.colleagueUUID, type: ReviewType.MYR, cycleUuid: 'CURRENT' },
      }),
    );
  }, []);
  useEffect(() => {
    reset(review);
  }, [review]);

  if (reviewLoading) {
    return null;
  }
  if (reviewLoaded && timelineReview?.status === Status.WAITING_FOR_APPROVAL) {
    return <SuccessModal onClose={onClose} />;
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
        >
          <IconComponent graphic='arrowLeft' invertColors={true} />
        </span>
        <form>
          <div className={css({ padding: `0 0 ${theme.spacing.s5}` })}>
            <div className={css({ fontSize: '24px', lineHeight: '28px', color: theme.colors.tescoBlue })}>
              <Trans i18nKey='mid_year_review_main_title'>How did you do against your objectives?</Trans>
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
              <Trans i18nKey='id_year_review_help_text'>
                Please complete this form before reviewing with your manager. Add detail in the comment boxes for each
                section
              </Trans>
            </div>
            <div className={css({ padding: `0 0 ${theme.spacing.s5}`, display: 'flex' })}>
              <Icon graphic='information' />
              <span
                className={css(theme.font.fixed.f14, {
                  color: theme.colors.tescoBlue,
                  padding: `${theme.spacing.s0} ${theme.spacing.s2}`,
                })}
              >
                <Trans i18nKey='need_help_write_objectives'>Need help writing your objectives?</Trans>
              </span>
            </div>
            {components.map((component) => {
              const { id, key, text, label, description, type, validate, values = [] } = component;
              const value = formValues[key] ? formValues[key] : '';
              if (type === 'text') {
                return (
                  <div style={{ padding: '24px 0' }}>
                    <div
                      className={css({
                        fontSize: '18px',
                        lineHeight: '22px',
                        color: theme.colors.tescoBlue,
                        fontWeight: theme.font.weight.bold,
                      })}
                    >
                      {text}
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
                  />
                );
              }
              if (type === 'textfield' && validate?.maxLength > 100) {
                return (
                  <GenericItemField
                    key={id}
                    name={key}
                    methods={methods}
                    label={label}
                    Wrapper={Item}
                    Element={Textarea}
                    placeholder={description}
                    value={value}
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
        </form>
      </div>
    </div>
  );
};

export default ReviewFormModal;

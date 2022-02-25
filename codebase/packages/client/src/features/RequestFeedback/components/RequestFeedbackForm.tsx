import React, { FC, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Rule, useStyle } from '@dex-ddl/core';
import get from 'lodash.get';
import { Field, Item, Select, Textarea } from 'components/Form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { ActionButtons, ColleaguesFinder } from './';
import { createRequestFeedbackSchema } from '../config';
import { TileWrapper } from 'components/Tile';
import { colleagueUUIDSelector, FeedbackActions, getReviews } from '@pma/store';
import { IconButton } from 'components/IconButton';
import { TargetType } from '../type';
import { Tesco } from 'config/enum';
import { useTranslation, Trans } from 'components/Translation';

type Props = {
  onSubmit: (data: any) => void;
  onCancel: () => void;
  defaultValues?: any;
  setIsInfoModalOpen: () => void;
};

const RequestFeedback: FC<Props> = ({ onSubmit, onCancel, setIsInfoModalOpen }) => {
  const { t } = useTranslation();
  const { css } = useStyle();
  const dispatch = useDispatch();
  const reviews = useSelector(getReviews) || [];
  const currentColleagueUuid = useSelector(colleagueUUIDSelector);

  const AREA_OPTIONS = [
    { value: TargetType.GOAL, label: t('day_job', 'Day Job') },
    { value: TargetType.OBJECTIVE, label: t('strategic_objectives_if', 'Strategic Objectives (if applicable)') },
    {
      value: TargetType.VALUE_BEHAVIOR,
      label: t('development_goals_values_purpose', 'Yourself (development goals, values & purpose)'),
    },
    { value: TargetType.OTHER, label: t('your_impact_on_others', 'Your impact on others') },
  ];

  const methods = useForm({
    mode: 'onChange',
    resolver: yupResolver<Yup.AnyObjectSchema>(createRequestFeedbackSchema),
  });

  const {
    formState: { errors, isValid },
    getValues,
    setValue,
    handleSubmit,
    register,
  } = methods;

  const formValues = getValues();

  useEffect(() => {
    if (!reviews.length && formValues.targetType === TargetType.OBJECTIVE) {
      dispatch(FeedbackActions.getObjectiveReviews({ type: 'OBJECTIVE', colleagueUuid: currentColleagueUuid }));
    }
  }, [formValues.targetType]);

  const objectiveOptions = useMemo(() => {
    return reviews
      .map((item) => {
        const { title } = item.properties.mapJson;
        if (title) {
          return {
            value: item.uuid,
            label: title,
          };
        }
      })
      .filter(Boolean);
  }, [reviews]);

  const labelValue = AREA_OPTIONS.find((item) => item.value === formValues.targetType)?.label;

  const objectiveValue =
    reviews.find((item) => item.uuid === formValues?.targetId)?.properties?.mapJson?.title ?? Tesco.TescoBank;

  return (
    <>
      <div className={css({ paddingLeft: '40px', paddingRight: '40px', height: '100%', overflow: 'auto' })}>
        <div className={css({ fontWeight: 'bold', fontSize: '24px', lineHeight: '28px' })}>
          Ask your colleagues for feedback
        </div>
        <div className={css({ marginTop: '14px', fontSize: '18px', lineHeight: '22px' })}>
          <Trans i18nKey='select_which_colleague_you_would_like_to_ask_feedback_from'>
            Select which colleague(s) you would like to ask feedback from
          </Trans>
        </div>
        <form className={css({ marginTop: '20px' })}>
          <Item errormessage={get(errors, 'colleagues', '')}>
            <ColleaguesFinder
              onSelect={(colleagues) => setValue('colleagues', colleagues, { shouldDirty: true, shouldValidate: true })}
              selected={formValues.colleagues || []}
              error={''}
            />
          </Item>
          <div className={css(withMargin)}>
            <IconButton graphic='information' onPress={setIsInfoModalOpen}>
              <p className={css(infoHelpStyle)}>
                <Trans i18nKey='learn_more_about_how_to_request_great_feedback'>
                  Learn more about how to request great feedback
                </Trans>
              </p>
            </IconButton>
          </div>
          <div className={css({ marginTop: '18px' })}>
            <Item withIcon={false} label={t('choose_what_you_like_feedback_on', 'Choose what you`d like feedback on')}>
              <Select
                {...register('targetType')}
                options={AREA_OPTIONS}
                name={'targetType'}
                placeholder={t('choose_an_area', 'Choose an area')}
                onChange={(value) => {
                  if (get(formValues, 'targetId') && value !== TargetType.OBJECTIVE) {
                    setValue('targetId', '', { shouldValidate: false });
                  }
                  setValue('targetType', value, { shouldValidate: true });
                }}
              />
            </Item>
          </div>
          {formValues.targetType === TargetType.GOAL && (
            <TileWrapper customStyle={{ padding: '24px', border: '1px solid #E5E5E5', marginBottom: '24px' }}>
              <h3 className={css(commentStyle)}>
                {t('add_comment_to', `Add comment to ${labelValue}`, { labelValue })}
              </h3>
              <Field
                Wrapper={Item}
                Element={Textarea}
                value={formValues.comment_to_day_job}
                {...register(`comment_to_day_job`)}
                setValue={setValue}
              />
            </TileWrapper>
          )}
          {formValues.targetType === TargetType.OBJECTIVE && (
            <div className={css({ marginTop: '24px' })}>
              <Item
                withIcon={false}
                label={t('choose_an_objective_you_want_feedback_on', 'Choose an objective you want feedback on')}
              >
                <Select
                  options={[...objectiveOptions, { value: Tesco.TescoBank, label: Tesco.TescoBank }]}
                  name={'targetId'}
                  placeholder={t('choose_objective', 'Choose objective')}
                  onChange={(value) => {
                    setValue('targetId', value, { shouldValidate: true });
                  }}
                />
              </Item>
            </div>
          )}
          {formValues.targetId && (
            <TileWrapper customStyle={{ padding: '24px', border: '1px solid #E5E5E5', marginBottom: '24px' }}>
              <h3 className={css(commentStyle)}>
                {t('add_comment_to_objectiveValue', `Add comment to ${objectiveValue}`, { objectiveValue })}
              </h3>
              <Field
                Wrapper={Item}
                Element={Textarea}
                value={formValues.comment_to_your_self}
                {...register('comment_to_objective')}
                setValue={setValue}
              />
            </TileWrapper>
          )}
          {formValues.targetType === TargetType.VALUE_BEHAVIOR && (
            <TileWrapper customStyle={{ padding: '24px', border: '1px solid #E5E5E5', marginBottom: '24px' }}>
              <h3 className={css(commentStyle)}>
                {t('add_comment_to', `Add comment to ${labelValue}`, { labelValue })}
              </h3>
              <Field
                Wrapper={Item}
                Element={Textarea}
                value={formValues.comment_to_your_self}
                {...register('comment_to_your_self')}
                setValue={setValue}
              />
            </TileWrapper>
          )}
          {formValues.targetType === TargetType.OTHER && (
            <TileWrapper customStyle={{ padding: '24px', border: '1px solid #E5E5E5', marginBottom: '24px' }}>
              <h3 className={css(commentStyle)}>
                {t('add_comment_to', `Add comment to ${labelValue}`, { labelValue })}
              </h3>
              <Field
                methods={methods}
                Wrapper={Item}
                Element={Textarea}
                value={formValues.comment_to_your_impact}
                {...register('comment_to_your_impact')}
                setValue={setValue}
              />
            </TileWrapper>
          )}
          <TileWrapper customStyle={{ padding: '24px', border: '1px solid #E5E5E5', marginBottom: '50px' }}>
            <h3 className={css(commentStyle)}>
              <Trans i18nKey='add_any_other_comments_you_would_like_to_share_with_your_colleague'>
                Add any other comments you would like to share with your colleague
              </Trans>
            </h3>
            <Field
              methods={methods}
              Wrapper={Item}
              Element={Textarea}
              value={formValues.comment_to_request}
              {...register('comment_to_request')}
              setValue={setValue}
            />
          </TileWrapper>
        </form>
        <ActionButtons isValid={isValid} onCancel={onCancel} onSubmit={handleSubmit(onSubmit)} />
      </div>
    </>
  );
};

const infoHelpStyle: Rule = {
  color: '#00539F',
  fontSize: '14px',
  margin: '0px 0px 0px 8px',
};

const withMargin: Rule = {
  marginTop: '32px',
};

const commentStyle: Rule = {
  fontWeight: 'bold',
  fontSize: '16px',
  lineHeight: '20px',
  marginTop: '0px',
};

export default RequestFeedback;

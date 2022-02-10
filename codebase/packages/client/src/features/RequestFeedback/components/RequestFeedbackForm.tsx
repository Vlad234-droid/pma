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
import { Tesco } from '../../../config/enum';

const AREA_OPTIONS = [
  { value: TargetType.GOAL, label: 'Day Job' },
  { value: TargetType.OBJECTIVE, label: 'Strategic Objectives (if applicable)' },
  { value: TargetType.VALUE_BEHAVIOR, label: 'Yourself (development goals, values & purpose)' },
  { value: TargetType.OTHER, label: 'Your impact on others' },
];

type Props = {
  onSubmit: (data: any) => void;
  onCancel: () => void;
  defaultValues?: any;
};

const RequestFeedback: FC<Props> = ({ onSubmit, onCancel }) => {
  const { css } = useStyle();
  const dispatch = useDispatch();
  const reviews = useSelector(getReviews) || [];
  const currentColleagueUuid = useSelector(colleagueUUIDSelector);

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
  const objectiveValue = (uuid) =>
    reviews.find((item) => item.uuid === uuid)?.properties?.mapJson?.title ?? Tesco.TescoBank;

  return (
    <>
      <div className={css({ paddingLeft: '40px', paddingRight: '40px', height: '100%', overflow: 'auto' })}>
        <div className={css({ fontWeight: 'bold', fontSize: '24px', lineHeight: '28px' })}>
          Ask your colleagues for feedback
        </div>
        <div className={css({ marginTop: '14px', fontSize: '18px', lineHeight: '22px' })}>
          Select which colleague(s) you would like to ask feedback from
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
            <IconButton graphic='information' onPress={() => undefined}>
              <p className={css(infoHelpStyle)}>Learn more about how to request great feedback</p>
            </IconButton>
          </div>
          <div className={css({ marginTop: '18px' })}>
            <Field
              Wrapper={({ children }) => (
                <Item label='Choose what you`d like feedback on' withIcon={false}>
                  {children}
                </Item>
              )}
              Element={Select}
              options={AREA_OPTIONS}
              placeholder={'Choose an area'}
              value={formValues.targetType}
              {...register('targetType')}
              setValue={setValue}
            />
          </div>
          {formValues.targetType === TargetType.GOAL && (
            <TileWrapper customStyle={{ padding: '24px', border: '1px solid #E5E5E5', marginBottom: '24px' }}>
              <h3 className={css(commentStyle)}>Add comment to {labelValue}</h3>
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
              <Field
                Wrapper={({ children }) => (
                  <Item label='Choose an objective you want feedback on' withIcon={false}>
                    {children}
                  </Item>
                )}
                Element={Select}
                options={[...objectiveOptions, { value: Tesco.TescoBank, label: Tesco.TescoBank }]}
                placeholder='Choose objective'
                value={formValues.objective}
                {...register('targetId')}
                setValue={setValue}
              />
            </div>
          )}
          {formValues.targetId && (
            <TileWrapper customStyle={{ padding: '24px', border: '1px solid #E5E5E5', marginBottom: '24px' }}>
              <h3 className={css(commentStyle)}>Add comment to {objectiveValue(formValues.targetId)}</h3>
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
              <h3 className={css(commentStyle)}>Add comment to {labelValue}</h3>
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
              <h3 className={css(commentStyle)}>Add comment to {labelValue}</h3>
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
            <h3 className={css(commentStyle)}>Add any other comments you would like to share with your colleague</h3>
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

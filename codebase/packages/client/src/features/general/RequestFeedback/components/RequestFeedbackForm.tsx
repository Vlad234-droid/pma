import React, { FC, useEffect, useMemo } from 'react';
import { Rule, theme, useStyle } from '@pma/dex-wrapper';
import get from 'lodash.get';
import { colleagueUUIDSelector, FeedbackActions, getReviews } from '@pma/store';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';

import { Field, Item, Select, Textarea, Attention } from 'components/Form';
import { ColleaguesFinder } from './';
import { useTranslation, Trans } from 'components/Translation';
import { TileWrapper } from 'components/Tile';
import { IconButton } from 'components/IconButton';
import { ButtonsWrapper } from 'components/ButtonsWrapper';
import { ArrowLeftIcon } from 'components/ArrowLeftIcon';
import { Page } from 'pages';
import { buildPath } from '../../Routes';
import { useFormWithCloseProtection } from 'hooks/useFormWithCloseProtection';
import { InputWithDropdown } from 'components/InputWithDropdown';

import { TargetType } from '../type';
import { createRequestFeedbackSchema } from '../config';
import { SearchOption, Tesco } from 'config/enum';

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
  const navigate = useNavigate();

  const AREA_OPTIONS = [
    { value: TargetType.GOAL, label: t('day_job', 'Day Job') },
    { value: TargetType.OBJECTIVE, label: t('strategic_objectives_if', 'Strategic Objectives (if applicable)') },
    {
      value: TargetType.VALUE_BEHAVIOR,
      label: t('development_goals_values_purpose', 'Yourself (development goals, values & purpose)'),
    },
    { value: TargetType.OTHER, label: t('your_impact_on_others', 'Your impact on others') },
  ];

  const methods = useFormWithCloseProtection({
    mode: 'onChange',
    resolver: yupResolver<Yup.AnyObjectSchema>(createRequestFeedbackSchema),
  });

  const {
    formState: { errors, isValid },
    getValues,
    setValue,
    handleSubmit,
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
        const { title } = item.properties;
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
    reviews.find((item) => item.uuid === formValues?.targetId)?.properties?.title ?? Tesco.TescoBank;

  const handleSelect = (colleagues) => {
    setValue('colleagues', colleagues, { shouldDirty: true, shouldValidate: true });
  };

  const handleBlur = (fieldName: string) => {
    setValue(fieldName, getValues(fieldName), { shouldValidate: true, shouldTouch: true });
  };

  return (
    <>
      <div className={css({ paddingLeft: '40px', paddingRight: '40px', height: '100%', overflow: 'auto' })}>
        <div className={css({ fontWeight: 'bold', fontSize: '24px', lineHeight: '28px', paddingBottom: '8px' })}>
          <Trans i18nKey='ask_your_colleagues_for_feedback'>Ask your colleagues for feedback</Trans>
        </div>
        <Attention />

        <div className={css(withMargin)}>
          <IconButton graphic='information' onPress={setIsInfoModalOpen}>
            <p className={css(infoHelpStyle)}>
              <Trans i18nKey='learn_more_about_how_to_request_great_feedback'>
                Learn more about how to request great feedback
              </Trans>
            </p>
          </IconButton>
        </div>

        <div className={css(selectColleagueStyles)}>
          <Trans i18nKey='select_which_colleague_you_would_like_to_ask_feedback_from'>
            Select which colleague(s) you would like to ask feedback from
          </Trans>
        </div>

        <form className={css({ marginTop: '8px' })}>
          <InputWithDropdown
            visible={true}
            options={[
              { value: SearchOption.NAME, label: t('by_name', 'By name') },
              { value: SearchOption.EMAIL, label: t('by_email_address', 'By email address') },
            ]}
            dropDownStyles={{
              borderRadius: '0px 25px 25px 0px',
            }}
          >
            {({ active }) => (
              <ColleaguesFinder
                searchOption={active}
                onSelect={handleSelect}
                onBlur={() => handleBlur('colleagues')}
                selected={formValues.colleagues || []}
                error={errors['colleagues']?.message?.replace('colleagues', t('colleagues', 'Colleagues'))}
                customStyles={{ marginTop: '0px', width: '100%' }}
                inputStyles={{
                  borderRadius: '25px 0px 0px 25px !important',
                }}
              />
            )}
          </InputWithDropdown>
          <div className={css({ marginTop: '18px' })}>
            <Item
              withIcon={false}
              label={t('choose_what_you_like_feedback_on', 'Choose what you`d like feedback on')}
              errormessage={errors['targetType']?.message}
              labelCustomStyle={{ fontWeight: theme.font.weight.bold }}
            >
              <Select
                name={'targetType'}
                options={AREA_OPTIONS}
                placeholder={t('choose_an_area', 'Choose an area')}
                onBlur={() => handleBlur('targetType')}
                error={errors['targetType']?.message}
                //@ts-ignore
                onChange={({ target: { value } }) => {
                  if (get(formValues, 'targetId') && value !== TargetType.OBJECTIVE) {
                    setValue('targetId', '', { shouldValidate: false });
                  }
                  setValue('targetType', value, { shouldValidate: true });
                }}
              />
            </Item>
          </div>
          {formValues.targetType === TargetType.GOAL && (
            <TileWrapper customStyle={tyleCustomStyle}>
              <h3 className={css(commentStyle)}>
                {t('add_comment_to', `Add comment to ${labelValue}`, { labelValue })}
              </h3>
              <Field
                Wrapper={Item}
                Element={Textarea}
                value={formValues.comment_to_day_job}
                name={'comment_to_day_job'}
                error={errors['comment_to_day_job']?.message?.replace(
                  'comment_to_day_job',
                  t('comment_to_day_job', 'Comment to day job'),
                )}
                setValue={setValue}
              />
            </TileWrapper>
          )}
          {formValues.targetType === TargetType.OBJECTIVE && (
            <div className={css({ marginTop: '24px' })}>
              <Item
                withIcon={false}
                label={t('choose_an_objective_you_want_feedback_on', 'Choose an objective you want feedback on')}
                errormessage={errors['targetId']?.message}
              >
                <Select
                  options={[...objectiveOptions, { value: Tesco.TescoBank, label: Tesco.TescoBank }]}
                  name={'targetId'}
                  onBlur={() => handleBlur('targetId')}
                  error={errors['targetId']?.message}
                  placeholder={t('choose_objective', 'Choose objective')}
                  onChange={({ target: { value } }) => {
                    setValue('targetId', value, { shouldValidate: true });
                  }}
                />
              </Item>
            </div>
          )}
          {formValues.targetId && (
            <TileWrapper customStyle={tyleCustomStyle}>
              <h3 className={css(commentStyle)}>
                {t('add_comment_to_objectiveValue', `Add comment to ${objectiveValue}`, { objectiveValue })}
              </h3>
              <Field
                Wrapper={Item}
                Element={Textarea}
                value={formValues.comment_to_your_self}
                name={'comment_to_objective'}
                error={errors['comment_to_objective']?.message?.replace(
                  'comment_to_objective',
                  t('comment_to_objective', 'Comment to day objective'),
                )}
                setValue={setValue}
              />
            </TileWrapper>
          )}
          {formValues.targetType === TargetType.VALUE_BEHAVIOR && (
            <TileWrapper customStyle={tyleCustomStyle}>
              <h3 className={css(commentStyle)}>
                {t('add_comment_to', `Add comment to ${labelValue}`, { labelValue })}
              </h3>
              <Field
                Wrapper={Item}
                Element={Textarea}
                value={formValues.comment_to_your_self}
                name={'comment_to_your_self'}
                error={errors['comment_to_your_self']?.message?.replace(
                  'comment_to_your_self',
                  t('comment_to_your_self', 'Comment to your self'),
                )}
                setValue={setValue}
              />
            </TileWrapper>
          )}
          {formValues.targetType === TargetType.OTHER && (
            <TileWrapper customStyle={tyleCustomStyle}>
              <h3 className={css(commentStyle)}>
                {t('add_comment_to', `Add comment to ${labelValue}`, { labelValue })}
              </h3>
              <Field
                methods={methods}
                Wrapper={Item}
                Element={Textarea}
                value={formValues.comment_to_your_impact}
                name={'comment_to_your_impact'}
                error={errors['comment_to_your_impact']?.message?.replace(
                  'comment_to_your_impact',
                  t('comment_to_your_impact', 'Comment to your impact'),
                )}
                setValue={setValue}
              />
            </TileWrapper>
          )}
          <TileWrapper
            customStyle={{
              padding: '24px',
              border: `2px solid ${theme.colors.backgroundDarkest}`,
              marginTop: '16px',
              marginBottom: '50px',
            }}
          >
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
              name={'comment_to_request'}
              error={errors['comment_to_request']?.message?.replace(
                'comment_to_request',
                t('comment_to_request', 'Comment to request'),
              )}
              setValue={setValue}
            />
          </TileWrapper>
        </form>
        <ButtonsWrapper
          isValid={isValid}
          onLeftPress={onCancel}
          onRightPress={handleSubmit(onSubmit)}
          rightTextWithIcon='submit'
        />
        <ArrowLeftIcon
          onClick={() => {
            navigate(buildPath(Page.FEEDBACK));
          }}
        />
      </div>
    </>
  );
};

const selectColleagueStyles: Rule = {
  ...theme.font.fixed.f16,
  letterSpacing: '0px',
  fontWeight: '700',
  fontStyle: 'normal',
  marginTop: '32px',
};

const tyleCustomStyle: Rule = ({ theme }) => {
  return {
    padding: '24px',
    border: `2px solid ${theme.colors.backgroundDarkest}`,
    marginBottom: '24px',
  };
};

const infoHelpStyle: Rule = ({ theme }) => ({
  color: theme.colors.tescoBlue,
  ...theme.font.fixed.f14,
  letterSpacing: '0px',
  margin: '0px 0px 0px 8px',
});

const withMargin: Rule = {
  marginTop: '24px',
  marginBottom: '32px',
};

const commentStyle: Rule = ({ theme }) => ({
  fontWeight: theme.font.weight.bold,
  ...theme.font.fixed.f16,
  letterSpacing: '0px',
  marginTop: '0px',
});

export default RequestFeedback;

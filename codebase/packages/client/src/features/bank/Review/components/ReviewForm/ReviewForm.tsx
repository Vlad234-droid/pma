import React, { FC, useEffect } from 'react';

import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { CreateRule, Rule, useStyle } from '@pma/dex-wrapper';
import { TriggerModal } from 'features/general/Modal/components/TriggerModal';
import { useTranslation } from 'components/Translation';
import { Attention } from 'components/Form';
import { Icon as IconComponent } from 'components/Icon';
import { InfoBlock } from 'components/InfoBlock';
import { ReviewHelpModal } from '../ReviewHelp';
import { ReviewButtons } from '../ReviewButtons';
import { FileUpload } from '../FileUpload';

import { FileMetadata, ReviewFormType } from '../../type';

import { Review } from 'config/types';
import { ReviewType } from 'config/enum';
import { formTagComponents } from 'utils/schema';
import DynamicForm from 'components/DynamicForm';
import { reviewOverallRatingByTypeSelector, ReviewsActions } from '@pma/store';
import { createYupSchema } from 'utils/yup';
import { useFormWithCloseProtection } from 'hooks/useFormWithCloseProtection';
import { useDispatch, useSelector } from 'react-redux';

type FormPropsType = {
  onSubmit: (data: any) => void;
  onSaveDraft: (data: any) => void;
  onClose: () => void;
  reviewType: ReviewType.MYR | ReviewType.EYR;
  readonly?: boolean;
  components: any;
  review: Review;
  metadata: FileMetadata[];
  handleAddFiles: (file: File) => void;
  handleDeleteFiles: (name: string) => void;
};

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

const overallRatingListeners: string[] = ['what_rating', 'how_rating'];

const ReviewForm: FC<ReviewFormType & FormPropsType> = ({
  review,
  reviewType,
  components,
  readonly,
  onClose,
  onSubmit,
  onSaveDraft,
  metadata,
  handleDeleteFiles,
  handleAddFiles,
}) => {
  const { css, theme, matchMedia } = useStyle();
  const mobileScreen = matchMedia({ xSmall: true, small: true }) || false;
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const rating = useSelector(reviewOverallRatingByTypeSelector(reviewType));

  const yepSchema = components.reduce(createYupSchema(t), {});
  const methods = useFormWithCloseProtection({
    mode: 'onChange',
    resolver: yupResolver<Yup.AnyObjectSchema>(Yup.object().shape(yepSchema)),
    defaultValues: review?.properties || {},
  });

  const {
    getValues,
    handleSubmit,
    formState: { isValid, errors },
    watch,
    setValue,
  } = methods;

  const formValues = getValues();

  const [what_rating, how_rating] = watch(overallRatingListeners);

  useEffect(() => {
    if (!what_rating || !how_rating) return;
    dispatch(
      ReviewsActions.updateRatingReview({
        type: reviewType,
        number: 1,
        fields: {
          what_rating,
          how_rating,
        },
      }),
    );
  }, [what_rating, how_rating]);

  useEffect(() => {
    if (rating && formValues.overall_rating !== rating) {
      setValue('overall_rating', rating, { shouldValidate: true, shouldTouch: true });
    }
  }, [rating]);

  return (
    <div className={css(containerStyle)}>
      <div className={css(wrapperStyle({ mobileScreen }))}>
        <span className={css(iconLeftPositionStyle({ mobileScreen }))} onClick={onClose}>
          <IconComponent graphic='arrowLeft' invertColors={true} />
        </span>
        <form data-test-id={'REVIEW_FORM_MODAL'}>
          <div className={css(formFieldsWrapperStyle)}>
            <div className={css(formTitleStyle)}>{t(...TRANSLATION[reviewType].title, { ns: 'bank' })}</div>
            <div className={css(helperTextStyle)}>{t(...TRANSLATION[reviewType].helperText, { ns: 'bank' })}</div>
            <div className={css({ padding: `0 0 ${theme.spacing.s5}`, display: 'flex' })}>
              <TriggerModal
                triggerComponent={<InfoBlock text={t('bank_colleague_help', 'Bank Colleague Help')} />}
                title={t('completing_your_review', 'Completing your review')}
              >
                <ReviewHelpModal />
              </TriggerModal>
            </div>
            {!readonly && <Attention />}
            <DynamicForm
              components={readonly ? formTagComponents(components, theme) : components}
              errors={errors}
              formValues={formValues}
              setValue={setValue}
              onlyView={readonly}
            />
            {/*todo temporary commented*/}
            {/*<FileUpload*/}
            {/*  review={review}*/}
            {/*  metadata={metadata}*/}
            {/*  handleDeleteFiles={handleDeleteFiles}*/}
            {/*  handleAddFiles={handleAddFiles}*/}
            {/*/>*/}
          </div>
          <ReviewButtons
            isValid={isValid}
            readonly={readonly}
            onClose={onClose}
            onSaveDraft={() => onSaveDraft(getValues())}
            onSave={handleSubmit(onSubmit)}
            reviewStatus={review.status}
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

export default ReviewForm;

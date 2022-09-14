import React, { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Rule, useStyle } from '@pma/dex-wrapper';
import { reviewOverallRatingByTypeSelector, ReviewsActions } from '@pma/store';

import { ReviewType } from 'config/enum';
import { createYupSchema } from 'utils/yup';
import { useTranslation } from 'components/Translation';
import { Attention } from 'components/Form';

import DynamicForm from 'components/DynamicForm';
import { useFormWithCloseProtection } from 'hooks/useFormWithCloseProtection';
import { formTagComponents } from 'utils/schema';
import { ReviewButtons } from '../ReviewButtons';

export type Props = {
  onSubmit: (data: any) => void;
  onSaveDraft: (data: any) => void;
  onClose: () => void;
  reviewType: ReviewType.MYR | ReviewType.EYR;
  readonly?: boolean;
  components: any;
  defaultValues: any;
};

const overallRatingListeners: string[] = ['what_rating', 'how_rating'];

const ReviewForm: FC<Props> = ({ reviewType, components, defaultValues, readonly, onClose, onSubmit, onSaveDraft }) => {
  const { css, theme } = useStyle();
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const rating = useSelector(reviewOverallRatingByTypeSelector(reviewType));
  // todo hardcoded. rewrite overallRatingRequestKey after merge

  //TODO: should move form to separate component
  const yepSchema = components.reduce(createYupSchema(t), {});
  const methods = useFormWithCloseProtection({
    mode: 'onChange',
    resolver: yupResolver<Yup.AnyObjectSchema>(Yup.object().shape(yepSchema)),
    defaultValues,
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
    <form data-test-id={'REVIEW_FORM_MODAL'}>
      <div className={css(formFieldsWrapperStyle)}>
        {!readonly && <Attention />}
        <DynamicForm
          components={readonly ? formTagComponents(components, theme) : components}
          errors={errors}
          formValues={formValues}
          setValue={setValue}
          onlyView={readonly}
        />
      </div>
      <ReviewButtons
        isValid={isValid}
        readonly={readonly}
        onClose={onClose}
        onSaveDraft={() => onSaveDraft(getValues())}
        onSave={handleSubmit(onSubmit)}
      />
    </form>
  );
};

const formFieldsWrapperStyle: Rule = ({ theme }) => ({ padding: `0 0 ${theme.spacing.s5}` });

export default ReviewForm;

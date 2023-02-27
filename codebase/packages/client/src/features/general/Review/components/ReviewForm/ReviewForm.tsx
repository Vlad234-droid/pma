import React, { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { CreateRule, Rule, useStyle } from '@pma/dex-wrapper';
import { reviewOverallRatingByTypeSelector, ReviewsActions } from '@pma/store';

import { ReviewType, Status } from 'config/enum';
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
  reviewStatus: Status;
  customButtons?: (isValid?: boolean, onSubmit?: () => void, formValues?: object) => JSX.Element;
};

const overallRatingListeners: string[] = ['what_rating', 'how_rating'];

const ReviewForm: FC<Props> = ({
  reviewType,
  components,
  defaultValues,
  readonly,
  onClose,
  onSubmit,
  onSaveDraft,
  reviewStatus,
  customButtons,
}) => {
  const { css, theme, matchMedia } = useStyle();
  const { t } = useTranslation();
  const mobileScreen = matchMedia({ xSmall: true, small: true }) || false;
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
      <div className={css(containerStyle)}>
        <div className={css(wrapperStyle)}>
          <div className={css(buttonWrapperStyle({ mobileScreen }))}>
            {customButtons ? (
              customButtons(isValid, handleSubmit(onSubmit), formValues)
            ) : (
              <ReviewButtons
                isValid={isValid}
                readonly={readonly}
                onClose={onClose}
                onSaveDraft={() => onSaveDraft(getValues())}
                onSave={handleSubmit(onSubmit)}
                reviewStatus={reviewStatus}
              />
            )}
          </div>
        </div>
      </div>
    </form>
  );
};

const formFieldsWrapperStyle: Rule = ({ theme }) => ({ padding: `0 0 ${theme.spacing.s5}` });

const containerStyle: Rule = {
  position: 'absolute',
  bottom: 0,
  left: 0,
  width: '100%',
};

const wrapperStyle: Rule = ({ theme }) => ({
  position: 'relative',
  bottom: theme.spacing.s0,
  left: theme.spacing.s0,
  right: theme.spacing.s0,
  // @ts-ignore
  borderTop: `${theme.border.width.b2} solid ${theme.colors.lightGray}`,
  background: theme.colors.white,
  borderRadius: '0px 0 32px 32px',
});

const buttonWrapperStyle: CreateRule<{ mobileScreen: boolean }> =
  ({ mobileScreen }) =>
  ({ theme }) => ({
    padding: mobileScreen ? theme.spacing.s7 : theme.spacing.s9,
    display: 'flex',
    justifyContent: 'center',
  });

export default ReviewForm;

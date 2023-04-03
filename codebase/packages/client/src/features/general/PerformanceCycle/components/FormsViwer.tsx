import React, { FC, useEffect, useState } from 'react';
import { reviewOverallRatingByTypeSelector, ReviewsActions } from '@pma/store';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { Rule, useStyle } from '@pma/dex-wrapper';
import { useSelector } from 'react-redux';

import { TileWrapper } from 'components/Tile';
import { Radio } from 'components/Form';
import { useTranslation } from 'components/Translation';
import DynamicForm from 'components/DynamicForm';
import { formTagComponents } from 'utils/schema';
import { useFormWithCloseProtection } from 'hooks/useFormWithCloseProtection';
import useDispatch from 'hooks/useDispatch';
import { createYupSchema } from 'utils/yup';
import { ReviewType } from 'config/enum';

type Props = {
  forms: Array<any>;
  isActive: Boolean;
};

const formId = {
  group_a_eyr_form: ReviewType.EYR,
  standard_myr_form: ReviewType.MYR,
  standard_calibration: ReviewType.CALIBRATION,
};

const FormsViewer: FC<Props> = ({ forms, isActive }) => {
  const { css, theme } = useStyle();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [activeFormIndex, setActiveFormIndex] = useState<number | undefined>();

  const activeForm = activeFormIndex !== undefined && forms[activeFormIndex].json;

  const components = activeForm?.components || [];

  const yepSchema = components.reduce(createYupSchema(t), {});
  const methods = useFormWithCloseProtection({
    mode: 'onChange',
    resolver: yupResolver<Yup.AnyObjectSchema>(Yup.object().shape(yepSchema)),
  });

  const rating = useSelector(reviewOverallRatingByTypeSelector(formId[activeForm.id]));

  const {
    getValues,
    watch,
    setValue,
    formState: { errors },
    reset,
  } = methods;

  const formValues = getValues();

  const [what_rating, how_rating] = watch(['what_rating', 'how_rating']);

  useEffect(() => {
    if (!what_rating || !how_rating) return;
    dispatch(
      ReviewsActions.updateRatingReview({
        type: formId[activeForm.id],
        number: 1,
        fields: {
          what_rating,
          how_rating,
        },
      }),
    );
  }, [what_rating, how_rating]);

  useEffect(() => {
    if (!rating) return;
    setValue('overall_rating', rating, { shouldValidate: true, shouldTouch: true });
  }, [rating]);

  useEffect(() => {
    if (!activeFormIndex) return;
    dispatch(ReviewsActions.clearReviewData());
    reset();
    setValue('overall_rating', '', { shouldValidate: false, shouldTouch: false });
    setValue('how_rating', '', { shouldValidate: false, shouldTouch: false });
    setValue('what_rating', '', { shouldValidate: false, shouldTouch: false });
  }, [activeFormIndex]);

  return (
    <TileWrapper
      customStyle={{
        margin: '8px',
        padding: '25px',
        maxWidth: '1300px',
        ...(!isActive ? { color: '#E5E5E5' } : {}),
      }}
    >
      <div
        className={css({
          fontWeight: 'bold',
          fontSize: '20px',
        })}
      >
        4. {t('forms', 'Forms')}
      </div>
      <div className={`${isActive ? css(visibleContainerStyle) : css(containerStyle)}`}>
        <div className={css({ display: 'flex', marginTop: '8px' })}>
          {forms.filter(Boolean).map((form, idx) => {
            return (
              <div key={idx} className={css({ padding: '0px 10px' })}>
                <label
                  className={css({
                    display: 'flex',
                    alignItems: 'center',
                  })}
                >
                  <Radio
                    name='status'
                    checked={activeFormIndex === idx}
                    onChange={() => {
                      setActiveFormIndex(idx);
                    }}
                  />
                  <span
                    className={css({
                      fontSize: '16px',
                      lineHeight: '20px',
                      padding: '0px 5px',
                    })}
                  >
                    {form?.code}
                  </span>
                </label>
              </div>
            );
          })}
        </div>
      </div>
      {activeFormIndex !== undefined && (
        <DynamicForm
          components={formTagComponents(activeForm?.components || [], theme)}
          formValues={formValues}
          onlyView={false}
          errors={errors}
          setValue={setValue}
        />
      )}
    </TileWrapper>
  );
};

export default FormsViewer;

const containerStyle: Rule = {
  flexWrap: 'wrap',
  gap: '16px 8px',
  alignItems: 'center',
  display: 'none',
};

const visibleContainerStyle: Rule = () => ({
  display: 'inline-flex',
  flexWrap: 'wrap',
  gap: '16px 8px',
});

import React, { FC, useEffect, useMemo } from 'react';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useTranslation } from 'components/Translation';
import { ButtonsWrapper } from 'components/ButtonsWrapper';
import { useFormWithCloseProtection } from 'hooks/useFormWithCloseProtection';
import DynamicForm from 'components/DynamicForm';
import useOverallRating from 'hooks/useOverallRating';

import { createYupSchema } from 'utils/yup';

const overallRatingListeners: string[] = ['what_rating', 'how_rating'];

type Props = {
  components: Array<any>;
  onSubmit: (data: any) => void;
  onCancel: () => void;
  defaultValues: any;
};
const RatingForm: FC<Props> = ({ onSubmit, onCancel, components, defaultValues }) => {
  const { t } = useTranslation();

  const schema = Yup.object().shape(components.reduce(createYupSchema(t), {}));
  const methods = useFormWithCloseProtection({
    mode: 'onChange',
    resolver: yupResolver<Yup.AnyObjectSchema>(schema),
    defaultValues,
  });
  const {
    getValues,
    handleSubmit,
    setValue,
    formState: { errors, isValid },
    watch,
  } = methods;
  const values = getValues();

  const [what_rating, how_rating] = watch(overallRatingListeners);

  const params = useMemo(
    () => (what_rating && how_rating ? { what_rating, how_rating } : null),
    [what_rating, how_rating],
  );

  const { overall_rating } = useOverallRating(params);

  console.log({ params, overall_rating });

  useEffect(() => {
    if (overall_rating && overall_rating !== values.overall_rating) {
      console.log(overall_rating);
      setValue('overall_rating', overall_rating);
    }
  }, [overall_rating]);

  return (
    <div>
      <DynamicForm components={components} formValues={values} errors={errors} setValue={setValue} />
      <ButtonsWrapper
        isValid={isValid}
        onLeftPress={onCancel}
        rightIcon={false}
        rightTextNotIcon={'submit'}
        onRightPress={handleSubmit(onSubmit)}
      />
    </div>
  );
};

export default RatingForm;

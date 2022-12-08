import React, { FC, useEffect, useMemo } from 'react';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useTranslation } from 'components/Translation';
import { ButtonsWrapper } from 'components/ButtonsWrapper';
import { useFormWithCloseProtection } from 'hooks/useFormWithCloseProtection';
import DynamicForm from 'components/DynamicForm';
import useOverallRating from 'hooks/useOverallRating';
import { Mode } from 'config/types';

import { createYupSchema } from 'utils/yup';

const overallRatingListeners: string[] = ['what_rating', 'how_rating'];

type Props = {
  components: Array<any>;
  onSubmit: (data: any) => void;
  onCancel: () => void;
  defaultValues: any;
  mode: Omit<Mode, Mode.SAVE>;
};

const RatingForm: FC<Props> = ({ onSubmit, onCancel, components, defaultValues, mode }) => {
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

  useEffect(() => {
    if (overall_rating && overall_rating !== values.overall_rating) {
      setValue('overall_rating', overall_rating, { shouldValidate: true, shouldTouch: true });
    }
  }, [overall_rating]);

  return (
    <div>
      <DynamicForm components={components} formValues={values} errors={errors} setValue={setValue} />
      <ButtonsWrapper
        isValid={isValid}
        isLeftDisabled={!Object.keys(values).length}
        onLeftPress={mode === Mode.CREATE ? () => onSubmit({ ...values, status: 'DRAFT' }) : onCancel}
        rightIcon={false}
        rightTextNotIcon={'submit'}
        leftText={mode === Mode.CREATE ? 'save_as_draft' : 'cancel'}
        onRightPress={handleSubmit((data) => onSubmit({ ...data, status: 'WAITING_FOR_APPROVAL' }))}
      />
    </div>
  );
};

export default RatingForm;

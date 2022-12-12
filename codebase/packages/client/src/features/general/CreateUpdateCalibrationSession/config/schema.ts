import * as Yup from 'yup';
import { TFunction } from 'components/Translation';

export const createSchema = (t: TFunction) =>
  Yup.object().shape({
    title: Yup.string()
      .max(
        100,
        t('field_must_be_less_than_number_characters', `Field must be less than 100 characters`, { value: 100 }),
      )
      .required(t('field_is_required')),
    startTime: Yup.string().required(t('field_is_required')),
    description: Yup.string().max(
      100,
      t('field_must_be_less_than_number_characters', `Field must be less than 100 characters`, { value: 100 }),
    ),
  });

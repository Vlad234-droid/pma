import * as Yup from 'yup';
import { TFunction } from 'components/Translation';

export const createSchema = (t: TFunction) =>
  Yup.object().shape({
    title: Yup.string()
      .max(100, t('must_be_at_most_number_characters', `Must be at most 100 characters`, { value: 100 }))
      .required(t('field_is_required')),
    startTime: Yup.string().required(t('field_is_required')),
    colleaguesAdd: Yup.array().when('filter', {
      is: (filters) => {
        return Object.keys(filters).length < 1;
      },
      then: (validator) =>
        validator.test({
          message: 'You must add at least one colleague before saving the session',
          test: (v) => {
            return !!v && v.length > 0;
          },
        }),
    }),
    description: Yup.string().max(
      100,
      t('must_be_at_most_number_characters', `Must be at most 100 characters`, { value: 100 }),
    ),
  });

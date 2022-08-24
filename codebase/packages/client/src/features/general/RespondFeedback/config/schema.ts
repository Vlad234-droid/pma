import * as Yup from 'yup';
import { FeedbackShema } from 'config/enum';

export const validateRequired = (value, { options, parent }) => {
  if (parent.length - 1 > options.index) {
    return Yup.string().required().isValidSync(value);
  }
  return true;
};

export const validateMax = (value) => {
  if (value) {
    return Yup.string().max(FeedbackShema.MAX_LENGTH).isValidSync(value);
  }
  return true;
};

export const validateMin = (value) => {
  if (value) {
    return Yup.string().min(FeedbackShema.MIN_LENGTH).isValidSync(value);
  }
  return true;
};

export const createRespondFeedbackSchema = (t) =>
  Yup.object().shape({
    feedbackItems: Yup.array().of(
      Yup.string()
        .test({
          message: `${t('field_is_required')}`,
          test: validateRequired,
        })
        .test({
          message: t(
            'field_must_be_at_least_number_characters',
            `Field must be at least ${FeedbackShema.MIN_LENGTH} characters`,
            { value: FeedbackShema.MIN_LENGTH },
          ),
          test: validateMin,
        })
        .test({
          message: t(
            'field_must_be_less_than_number_characters',
            `Field must be less than ${FeedbackShema.MAX_LENGTH} characters`,
            { value: FeedbackShema.MAX_LENGTH },
          ),
          test: validateMax,
        }),
    ),
    targetColleagueUuid: Yup.string().min(36).required(),
  });

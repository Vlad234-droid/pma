import * as Yup from 'yup';

export const validateAllExceptLastElement = (value) => {
  const stringValidationSchema = Yup.object().shape({
    field: Yup.string().required().max(500).min(2),
  });
  for (let i = 0; i < value.length - 1; i++) {
    if (!stringValidationSchema.isValidSync(value[i])) {
      return false;
    }
  }
  return true;
};

export const createGiveFeedbackSchema = Yup.object().shape({
  feedback: Yup.array().test(validateAllExceptLastElement),
});

export const validate = (value) => {
  const stringValidationSchema = Yup.object().shape({
    content: Yup.string().required().min(3).max(500),
  });
  for (let i = 0; i < value.length - 1; i++) {
    if (!stringValidationSchema.isValidSync(value[i])) {
      return false;
    }
  }
  return true;
};

export const createGiveFeedbackNewSchema = Yup.object().shape({
  feedbackItems: Yup.array().test(validate),
  targetColleagueUuid: Yup.string().min(36).required(),
});

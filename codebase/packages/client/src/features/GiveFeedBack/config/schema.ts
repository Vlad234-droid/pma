import * as Yup from 'yup';

export const createObjectivesSchema = Yup.object().shape({
  treatment_options: Yup.string().required(),
});

export const createObjectivesSearchPeopleSchema = Yup.object().shape({
  search_option: Yup.string().required(),
});

export const validateRequired = (value, { options, parent }) => {
  if (parent.length - 1 > options.index) {
    return Yup.string().required().isValidSync(value);
  }
  return true;
};

export const validateMax = (value) => {
  if (value) {
    return Yup.string().max(500).isValidSync(value);
  }
  return true;
};

export const validateMin = (value) => {
  if (value) {
    return Yup.string().min(10).isValidSync(value);
  }
  return true;
};

export const createGiveFeedbackSchema = Yup.object().shape({
  feedbackItems: Yup.array().of(
    Yup.string()
      .test({
        message: 'Field is required',
        test: validateRequired,
      })
      .test({
        message: 'Field must be at least 10 characters',
        test: validateMin,
      })
      .test({
        message: 'Field must be less than 500 characters',
        test: validateMax,
      }),
  ),
  targetColleagueUuid: Yup.string().min(36).required(),
});

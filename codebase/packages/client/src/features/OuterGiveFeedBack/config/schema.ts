import * as Yup from 'yup';

export const createObjectivesSchema = Yup.object().shape({
  treatment_options: Yup.string().required(),
});
export const createObjectivesSearchPeopleSchema = Yup.object().shape({
  search_option: Yup.string().required(),
});

export const createGiveFeedbackSchema = Yup.object().shape({
  feedback: Yup.array().of(
    Yup.object().shape({
      field: Yup.string().required().max(500),
    }),
  ),
});

import * as Yup from 'yup';

export const createObjectivesSchema = Yup.object().shape({
  treatment_options: Yup.string().required(),
});
export const createObjectivesSearchPeopleSchema = Yup.object().shape({
  search_option: Yup.string().required(),
});

import * as Yup from 'yup';

export const createRequestFeedbackSchema = Yup.object().shape({
  search_option: Yup.string().required(),
  area_options: Yup.string().required(),
  objective_options: Yup.string().required(),
  tile_else: Yup.string().required(),
});
import * as Yup from 'yup';

export const createRequestFeedbackSchema = Yup.object().shape({
  search_option: Yup.string().notRequired(),
  area_options: Yup.string().required(),
  objective_options: Yup.string()
    .notRequired()
    .when('area_options', {
      is: (val) => val === 'id_2',
      then: Yup.string().required(),
    }),
  comment_to_request: Yup.string().notRequired(),
  comment_to_day_job: Yup.string()
    .notRequired()
    .when('area_options', { is: (val) => val === 'id_1', then: Yup.string().required() }),
  comment_to_your_self: Yup.string()
    .notRequired()
    .when('area_options', { is: (val) => val === 'id_3', then: Yup.string().required() }),
  comment_to_your_impact: Yup.string()
    .notRequired()
    .when('area_options', { is: (val) => val === 'id_4', then: Yup.string().required() }),
});

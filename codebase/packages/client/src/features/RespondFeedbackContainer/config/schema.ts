import * as Yup from 'yup';

export const createGiveFeedbackSchema = Yup.object().shape({
  feedback: Yup.array()
    .of(
      Yup.object().shape({
        field: Yup.string().required(),
      }),
    )
    .required(),
});

import * as Yup from 'yup';

export const yupRatingSchema = Yup.object().shape({
  what: Yup.string().required(),
  how: Yup.string().required(),
  longTerm: Yup.string().notRequired(),
  absent: Yup.string()
    .notRequired()
    .when('longTerm', {
      is: (val) => val,
      then: Yup.string().required(),
    }),
});

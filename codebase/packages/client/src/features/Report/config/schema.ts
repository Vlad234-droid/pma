import * as Yup from 'yup';

export const createYearSchema = Yup.object().shape({
  year_options: Yup.string().required(),
});

export const reportByYearSchema = Yup.object().shape({
  year: Yup.string().required(),
})

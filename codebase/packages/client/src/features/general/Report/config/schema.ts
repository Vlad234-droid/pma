import * as Yup from 'yup';

export const reportByYearSchema = Yup.object().shape({
  year: Yup.string().required(),
});

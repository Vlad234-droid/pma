import * as Yup from 'yup';

export const createSchema = Yup.object().shape({
  title: Yup.string().min(10).max(50).required(),
  startTime: Yup.string().min(10).max(50).required(),
  description: Yup.string().max(250),
});

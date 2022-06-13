import * as Yup from 'yup';

export const createPDPSchema = Yup.object().shape({
  treatment_options: Yup.string().required(),
});

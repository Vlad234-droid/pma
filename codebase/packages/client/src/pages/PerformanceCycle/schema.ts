import * as Yup from 'yup';

export const createPMCycleSchema = Yup.object().shape({
  name: Yup.string().required(),
  level1: Yup.string().required(),
  level2: Yup.string().required(),
  level3: Yup.string().required(),
  entryConfigKey: Yup.string().required(),
});

export const chooseTemplateSchema = Yup.object().shape({
  template_search: Yup.string(),
});

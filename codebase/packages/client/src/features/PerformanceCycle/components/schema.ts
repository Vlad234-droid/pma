import * as Yup from 'yup';

export const createPMCycleSchema = Yup.object().shape({
  name: Yup.string().required(),
  entryConfigKey: Yup.string().required(),
  metadata: Yup.object()
    .shape({
      cycle: Yup.object()
        .shape({
          properties: Yup.object().required('Cycle details is a required'),
          timelinePoints: Yup.array().of(Yup.object()).required('Cycle reviews is a required'),
        })
        .required(),
    })
    .required(),
});

export const chooseTemplateSchema = Yup.object().shape({
  template_search: Yup.string(),
});

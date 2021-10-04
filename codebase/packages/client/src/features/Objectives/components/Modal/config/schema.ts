import * as Yup from 'yup';

export const createObjectivesSchema = Yup.object().shape({
  objectiveTitle: Yup.string().required(),
  objectiveDescription: Yup.string().required(),
  meetObjective: Yup.string().required(),
  exceedObjective: Yup.string().required(),
});

export const editObjectivesSchema = createObjectivesSchema.concat(
  Yup.object().shape({
    objectiveTitle: Yup.string().required(),
    objectiveDescription: Yup.string().required(),
    meetObjective: Yup.string().required(),
    exceedObjective: Yup.string().required(),
  }),
);

export const reviewFormSchema = Yup.object().shape({
  objective: Yup.array()
    .of(
      Yup.object().shape({
        field: Yup.array().of(
          Yup.object().shape({
            value: Yup.string().required(),
          }),
        ),
      }),
    )
    .required(),
});

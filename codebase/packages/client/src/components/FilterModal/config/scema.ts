import * as Yup from 'yup';

export const schema = (initialValues) =>
  Yup.object()
    .shape(
      initialValues.reduce(
        (acc: Yup.AnyObjectSchema, { type }) => ({
          ...acc,
          [type]: Yup.array().of(
            Yup.object().shape({
              description: Yup.string(),
              id: Yup.string().notRequired(),
              checked: Yup.boolean(),
            }),
          ),
        }),
        {},
      ),
    )
    .test('selected checkbox', 'min 1', function () {
      //@ts-ignore
      const { from } = this;
      return (
        //@ts-ignore
        Object.values(from[0].value)
          //@ts-ignore
          .reduce((acc, item) => [...acc, ...item], [])
          //@ts-ignore
          .some(({ checked }) => checked)
      );
    });

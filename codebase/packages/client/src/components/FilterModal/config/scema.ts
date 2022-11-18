import * as Yup from 'yup';

export const schema = (initialValues) =>
  Yup.object()
    .shape(
      Object.keys(initialValues).reduce(
        (acc, item) => ({
          ...acc,
          [item]: Yup.array().of(
            Yup.object().shape({
              name: Yup.string(),
              id: Yup.string().notRequired(),
              checked: Yup.boolean(),
              uuid: Yup.string().notRequired(),
              code: Yup.string().notRequired(),
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

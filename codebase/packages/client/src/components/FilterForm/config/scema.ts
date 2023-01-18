import * as Yup from 'yup';

export const schema = Yup.object().test('selected checkbox', 'min 1', function () {
  //@ts-ignore
  const { from } = this;
  return (
    //@ts-ignore
    Object.values(from[0]?.value)
      //@ts-ignore
      .reduce((acc, item) => [...acc, ...Object.values(item)], [])
      .some((checked) => checked)
  );
});

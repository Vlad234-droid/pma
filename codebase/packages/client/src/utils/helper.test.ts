import { upperCaseFirstLetter } from './helper';

test('it should render string with upperCase of first letter', () => {
  const text = upperCaseFirstLetter('text');
  expect(text).toBe('Text');
});

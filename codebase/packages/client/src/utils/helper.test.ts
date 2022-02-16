import { lowerCaseFirstLetter } from './helper';

test('it should render string with lowerCase of first letter', () => {
  const text = lowerCaseFirstLetter('Text');
  expect(text).toBe('text');
});

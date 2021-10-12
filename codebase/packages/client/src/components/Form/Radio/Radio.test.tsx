import React from 'react';
import { renderWithTheme as render } from 'utils/test';
import '@testing-library/jest-dom/extend-expect';

import { Radio } from '../Radio';

it('render item with placeholder', async () => {
  const result = render(<Radio id='radio' />);
  const radioElement = result.container.querySelector('#radio');

  expect(radioElement).toBeInTheDocument();
});

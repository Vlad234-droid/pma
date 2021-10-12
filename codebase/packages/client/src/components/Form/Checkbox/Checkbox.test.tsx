import React from 'react';
import { renderWithTheme as render } from 'utils/test';
import '@testing-library/jest-dom/extend-expect';

import { Checkbox } from '../Checkbox';

it('render item with placeholder', async () => {
  const result = render(<Checkbox id='checkbox' />);
  const radioElement = result.container.querySelector('#checkbox');

  expect(radioElement).toBeInTheDocument();
});

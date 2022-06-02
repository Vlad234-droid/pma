import React from 'react';
import '@testing-library/jest-dom';
import '@testing-library/jest-dom/extend-expect';
import { renderWithTheme as render } from 'utils/test';
import { Line } from './Line';

it('render Line component', () => {
  const props = {
    testId: 'line',
  };
  const { getByTestId } = render(<Line {...props} />);
  const line = getByTestId(props.testId);
  expect(line).toBeInTheDocument();
});

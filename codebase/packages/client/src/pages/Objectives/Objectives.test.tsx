import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import Objectives, { TEST_ID } from './Objectives';
import { renderWithTheme as render } from 'utils/test';

it('CareerPerformance', async () => {
  const { getByTestId } = render(<Objectives />);
  const wrapper = getByTestId(TEST_ID);

  expect(wrapper).toBeInTheDocument();
});

import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import Objectives, { TEST_ID } from './Objectives';
import { render } from 'styles/test-theme-provider';

it('CareerPerformance', async () => {
  const { getByTestId } = render(<Objectives />);
  const wrapper = getByTestId(TEST_ID);

  expect(wrapper).toBeInTheDocument();
});

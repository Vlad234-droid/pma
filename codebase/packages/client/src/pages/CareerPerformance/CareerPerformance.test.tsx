import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import CareerPerformance from './CareerPerformance';
import { render, screen } from 'styles/test-theme-provider';

it('CareerPerformance', async () => {
  render(<CareerPerformance />);
  const wrapper = screen.queryByTestId('timeline');

  expect(wrapper).toBeInTheDocument();
});

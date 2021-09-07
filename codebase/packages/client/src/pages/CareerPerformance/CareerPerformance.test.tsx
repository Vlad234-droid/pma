import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import CareerPerformance from './CareerPerformance';
import { renderWithTheme } from 'utils/test';

it('CareerPerformance', async () => {
  const { getByTestId } = renderWithTheme(<CareerPerformance />);
  const timeline = getByTestId('timeline');

  expect(timeline).toBeInTheDocument();
});

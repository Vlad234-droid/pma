import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { StepIndicator } from './StepIndicator';
import { render, screen } from 'styles/test-theme-provider';

it('StepIndicator', async () => {
  render(
    <StepIndicator
      currentStatus={'pending'}
      currentStep={0}
      titles={['Set objectives', 'Mid-year review', 'End year review']}
      descriptions={['April 2021', 'September 2022', 'March 2022']}
    />,
  );
  const wrapper = screen.queryByText('March 2022');
  expect(wrapper).toBeInTheDocument();
});

it('StepIndicator no props', async () => {
  render(<StepIndicator titles={['Set objectives', 'Mid-year review']} />);
  const wrapper = screen.queryByText('Mid-year review');
  expect(wrapper).toBeInTheDocument();
});

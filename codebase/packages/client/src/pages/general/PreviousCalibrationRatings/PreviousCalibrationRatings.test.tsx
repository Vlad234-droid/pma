import React from 'react';
import '@testing-library/jest-dom';
import '@testing-library/jest-dom/extend-expect';
import { renderWithTheme as render } from 'utils/test';
import { BrowserRouter } from 'react-router-dom';
import PreviousCalibrationRatings, { PROFILE_WRAPPER } from './PreviousCalibrationRatings';
import { TEST_ID } from 'components/Backward/Backward';

it('it should render profile wrapper', async () => {
  const { getByTestId } = render(
    <BrowserRouter>
      <PreviousCalibrationRatings />
    </BrowserRouter>,
  );
  const wrapper = getByTestId(PROFILE_WRAPPER);
  expect(wrapper).toBeInTheDocument();
});
it('it should render backwardLink icon', async () => {
  const { getByTestId } = render(
    <BrowserRouter>
      <PreviousCalibrationRatings />
    </BrowserRouter>,
  );
  const icon = getByTestId(TEST_ID);
  expect(icon).toBeInTheDocument();
});

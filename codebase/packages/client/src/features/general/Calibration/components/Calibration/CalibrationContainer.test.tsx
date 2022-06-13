import React from 'react';
import '@testing-library/jest-dom/extend-expect';
// @ts-ignore
import { renderWithTheme as render } from 'utils/test';
import CalibrationContainer from './CalibrationContainer';
import * as redux from 'react-redux';
import { CALIBRATION_TEST_ID } from './Calibration';
import { BrowserRouter } from 'react-router-dom';

describe('CalibrationContainer', () => {
  const spy = jest.spyOn(redux, 'useSelector');
  spy.mockReturnValue({ loaded: true });

  it('CalibrationContainer should render', async () => {
    const { getByTestId } = render(
      <BrowserRouter>
        <CalibrationContainer />
      </BrowserRouter>,
    );

    expect(getByTestId(CALIBRATION_TEST_ID)).toBeInTheDocument();
  });
});

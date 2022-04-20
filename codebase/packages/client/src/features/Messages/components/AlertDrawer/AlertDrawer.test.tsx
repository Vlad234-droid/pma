import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import '@testing-library/jest-dom';
import { renderWithTheme as render } from 'utils/test';
import AlertDrawer, { ALERT_DRAWER_WRAPPER, ALERT_DRAWER_CLOSE_BTN } from './AlertDrawer';
import { fireEvent, waitFor } from '@testing-library/react';

jest.mock('react-router-dom', () => ({
  ...(jest.requireActual('react-router-dom') as any),
  useNavigate: () => ({
    navigate: jest.fn(),
  }),
}));

describe('Alert drawer', () => {
  const state = {};

  const props = {
    onClose: jest.fn(),
  };

  it('should render alert drawer', async () => {
    const { getByTestId } = render(<AlertDrawer {...props} />, { ...state });
    const wrapper = getByTestId(ALERT_DRAWER_WRAPPER);
    expect(wrapper).toBeInTheDocument();
  });

  // it('should close alert drawer', async () => {
  //   const { getByTestId } = render(<AlertDrawer {...props} />, { ...state });
  //   const wrapper = getByTestId(ALERT_DRAWER_WRAPPER);
  //   expect(wrapper).toBeInTheDocument();
  //   expect(getByTestId(ALERT_DRAWER_CLOSE_BTN)).toBeInTheDocument();

  //   fireEvent.click(getByTestId(ALERT_DRAWER_CLOSE_BTN));

  //   await waitFor(() => expect(props.onClose).toHaveBeenCalled());
  // });
});

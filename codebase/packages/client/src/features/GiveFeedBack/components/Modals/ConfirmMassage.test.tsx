import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { fireEvent } from '@testing-library/react';
import { renderWithTheme as render } from 'utils/test';
import ConfirmMessage, { CONFIRM_WRAPPER } from './ConfirmMessage';

describe('Confirm message', () => {
  const onConfirm = jest.fn();
  const goBack = jest.fn();
  const props = {
    onConfirm,
    goBack,
  };

  it('it should render confirm wrapper', () => {
    const { getByTestId } = render(<ConfirmMessage {...props} />);
    const wrapper = getByTestId(CONFIRM_WRAPPER);
    expect(wrapper).toBeInTheDocument();
  });
  it('it should call goBack handler', () => {
    const { getByText } = render(<ConfirmMessage {...props} />);
    const button = getByText(/Go back/i);
    fireEvent.click(button);
    expect(goBack).toHaveBeenCalledTimes(1);
  });
  it('it should call onConfirm handler', () => {
    const { getByText } = render(<ConfirmMessage {...props} />);
    const button = getByText(/Confirm/i);
    fireEvent.click(button);
    expect(onConfirm).toHaveBeenCalledTimes(1);
  });
});

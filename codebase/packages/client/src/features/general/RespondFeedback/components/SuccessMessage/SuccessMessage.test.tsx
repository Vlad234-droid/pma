import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { renderWithTheme as render } from 'utils/test';
import SuccessMessage, { SUCCESS_MODAL_WRAPPER } from './SuccessMessage';
import { fireEvent, waitFor } from '@testing-library/react';

describe('Success modal', () => {
  const handler = jest.fn();
  const props = {
    targetColleagueProfile: {},
    onSuccess: handler,
  };

  it('it should render success modal', () => {
    const { getByTestId } = render(<SuccessMessage {...props} />);
    const wrapper = getByTestId(SUCCESS_MODAL_WRAPPER);
    expect(wrapper).toBeInTheDocument();
  });
  it('it should close message modal', async () => {
    const { getByText, queryByTestId } = render(<SuccessMessage {...props} />);
    const okBtn = getByText(/Okay/i);
    fireEvent.click(okBtn);
    const wrapper = queryByTestId(SUCCESS_MODAL_WRAPPER);
    await waitFor(() => expect(wrapper).toBeInTheDocument());
    await waitFor(() => expect(handler).toHaveBeenCalledTimes(1));
  });
});

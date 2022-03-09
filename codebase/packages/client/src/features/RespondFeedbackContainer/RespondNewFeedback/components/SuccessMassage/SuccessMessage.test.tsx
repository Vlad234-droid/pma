import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { renderWithTheme as render } from 'utils/test';
import SuccessMassage from './SuccessMassage';
import { fireEvent, waitFor } from '@testing-library/react';
import { SUCCESS_MODAL_WRAPPER, OK_BTN } from 'features/NotesActions/components/Modals/SuccessModal';

describe('Success modal', () => {
  const handler = jest.fn();
  const props = {
    targetColleagueProfile: {},
    onSuccess: handler,
  };

  it('it should render success modal', () => {
    const { getByTestId } = render(<SuccessMassage {...props} />);
    const wrapper = getByTestId(SUCCESS_MODAL_WRAPPER);
    expect(wrapper).toBeInTheDocument();
  });
  it('it should close message modal', async () => {
    const { getByTestId, queryByTestId } = render(<SuccessMassage {...props} />);
    const okBtn = getByTestId(OK_BTN);
    fireEvent.click(okBtn);
    const wrapper = queryByTestId(SUCCESS_MODAL_WRAPPER);
    await waitFor(() => expect(wrapper).toBeInTheDocument());
    await waitFor(() => expect(handler).toHaveBeenCalledTimes(1));
  });
});

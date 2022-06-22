import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import '@testing-library/jest-dom';
import { fireEvent, waitFor } from '@testing-library/react';

import SuccessModal, { SUCCESS_MODAL_WRAPPER, OK_BTN } from './SuccessModal';
import { renderWithTheme as render } from 'utils/test';

describe('Success modal', () => {
  const cancelModal = jest.fn();
  const props = {
    folder: 'New folder',
    onOk: cancelModal,
  };

  it('it should render success wrapper', async () => {
    const { queryByTestId } = render(<SuccessModal {...props} />);
    const modalWrapper = queryByTestId(SUCCESS_MODAL_WRAPPER);
    expect(modalWrapper).toBeInTheDocument();
  });
  it('it should call cancelModal', async () => {
    const { getByTestId } = render(<SuccessModal {...props} />);
    const okBtn = getByTestId(OK_BTN);
    fireEvent.click(okBtn);
    await waitFor(() => expect(cancelModal).toHaveBeenCalled());
  });
  it('it should show create folder', async () => {
    const { getByText } = render(<SuccessModal {...props} />);
    const text = getByText(/Your note has been added into/i);
    expect(text).toBeInTheDocument();
  });
  it('it should show the created folder', async () => {
    const { getByText } = render(<SuccessModal onOk={cancelModal} />);
    const text = getByText(/Your folder has been added/i);
    expect(text).toBeInTheDocument();
  });
});

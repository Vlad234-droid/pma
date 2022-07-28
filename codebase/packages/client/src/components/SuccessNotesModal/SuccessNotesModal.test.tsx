import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import '@testing-library/jest-dom';
import { fireEvent, waitFor } from '@testing-library/react';

import SuccessNotesModal, { SUCCESS_MODAL_WRAPPER, OK_BTN } from './SuccessNotesModal';
import { renderWithTheme as render } from 'utils/test';

describe('Success modal', () => {
  const cancelModal = jest.fn();
  const props = {
    folder: 'New folder',
    onOk: cancelModal,
  };

  it('it should render success wrapper', async () => {
    const { queryByTestId } = render(<SuccessNotesModal {...props} />);
    const modalWrapper = queryByTestId(SUCCESS_MODAL_WRAPPER);
    expect(modalWrapper).toBeInTheDocument();
  });
  it('it should call cancelModal', async () => {
    const { getByTestId } = render(<SuccessNotesModal {...props} />);
    const okBtn = getByTestId(OK_BTN);
    fireEvent.click(okBtn);
    await waitFor(() => expect(cancelModal).toHaveBeenCalled());
  });
  it('it should show create folder', async () => {
    const { getByText } = render(<SuccessNotesModal {...props} />);
    const text = getByText(/Your note has been added into/i);
    expect(text).toBeInTheDocument();
  });
  it('it should show the created folder', async () => {
    const { getByText } = render(<SuccessNotesModal onOk={cancelModal} />);
    const text = getByText(/Your folder has been added/i);
    expect(text).toBeInTheDocument();
  });
});

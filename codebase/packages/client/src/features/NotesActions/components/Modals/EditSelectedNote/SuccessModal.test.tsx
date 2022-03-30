import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import '@testing-library/jest-dom';
import { fireEvent, waitFor } from '@testing-library/react';

import SuccessModal, { MODAL_WRAPPER } from './SuccessModal';
import { renderWithTheme as render } from 'utils/test';
import { useForm } from 'react-hook-form';

jest.mock('react-hook-form', () => ({
  ...jest.requireActual('react-hook-form'),
  useForm: () => ({
    handleSubmit: () => jest.fn(),
    getValues: () => jest.fn(),
    trigger: () => jest.fn(),
    register: () => jest.fn(),
    setValue: () => jest.fn(),
    formState: { isValid: false, errors: {} },
    reset: () => jest.fn(),
  }),
}));

describe('Success modal', () => {
  const setSuccessSelectedNoteToEdit = jest.fn();
  const setSelectedNoteToEdit = jest.fn();
  const setSelectedFolder = jest.fn();
  const methods = useForm();
  const props = {
    setSuccessSelectedNoteToEdit,
    setSelectedNoteToEdit,
    setSelectedFolder,
    methods,
  };

  it('it should render success wrapper', async () => {
    const { getByTestId } = render(<SuccessModal {...props} />);
    const modalWrappper = getByTestId(MODAL_WRAPPER);
    expect(modalWrappper).toBeInTheDocument();
  });
  it('it should call handlers', async () => {
    const { getByText } = render(<SuccessModal {...props} />);
    const okBtn = getByText(/Okay/i);
    fireEvent.click(okBtn);

    expect(setSuccessSelectedNoteToEdit).toHaveBeenCalled();
    expect(setSelectedNoteToEdit).toHaveBeenCalled();
    expect(setSelectedFolder).toHaveBeenCalled();
  });
});

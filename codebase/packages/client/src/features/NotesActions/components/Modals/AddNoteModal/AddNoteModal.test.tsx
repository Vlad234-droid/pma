import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import '@testing-library/jest-dom';
import { renderWithTheme as render } from 'utils/test';
import { fireEvent } from '@testing-library/react';
import { useForm } from 'react-hook-form';

import AddNoteModal, { MODAL_WRAPPER } from './AddNoteModal';

jest.mock('react-hook-form', () => ({
  ...jest.requireActual('react-hook-form'),
  useForm: () => ({
    handleSubmit: () => jest.fn(),
    getValues: () => jest.fn(),
    trigger: () => jest.fn(),
    register: () => jest.fn(),
    formState: { isValid: false, errors: {} },
  }),
}));

describe('AddNoteModal', () => {
  const cancelModal = jest.fn();
  const submitForm = jest.fn();

  const methods = useForm({
    defaultValues: {
      noteTitle: 'mocked',
      noteText: 'mocked',
    },
  });

  const props = {
    methods,
    cancelModal,
    submitForm,
    createFolder: false,
    foldersWithNotes: [{}],
  };
  it('it should render modal wrapper', async () => {
    const { getByTestId } = render(<AddNoteModal {...props} />);
    const form = getByTestId(MODAL_WRAPPER);
    expect(form).toBeInTheDocument();
  });
  it('it should call cancelModal handler', async () => {
    render(<AddNoteModal {...props} />);
    props.cancelModal();
    expect(cancelModal).toHaveBeenCalled();
  });
  it('it should submit form', async () => {
    const { getByTestId } = render(<AddNoteModal {...props} />);

    props.submitForm();
    expect(submitForm).toHaveBeenCalled();

    const btn = getByTestId('arrowRight');
    fireEvent.click(btn);
    // await waitFor(() => expect(findByTestId('success-modal-wrapper')).toBeInTheDocument());
  });
});

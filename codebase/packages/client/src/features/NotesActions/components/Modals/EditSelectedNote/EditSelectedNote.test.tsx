import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import '@testing-library/jest-dom';
import { renderWithTheme as render } from 'utils/test';
import { fireEvent } from '@testing-library/react';
import { useForm } from 'react-hook-form';

import EditSelectedNote, { MODAL_WRAPPER } from './EditSelectedNote';

jest.mock('react-hook-form', () => ({
  ...jest.requireActual('react-hook-form'),
  useForm: () => ({
    handleSubmit: () => jest.fn(),
    getValues: () => jest.fn(),
    trigger: () => jest.fn(),
    register: () => jest.fn(),
    setValue: () => jest.fn(),
    formState: { isValid: false, errors: {} },
  }),
}));

describe('EditSelectedNote', () => {
  const cancelSelectedNoteModal = jest.fn();
  const setSelectedNoteToEdit = jest.fn();
  const setSelectedFolder = jest.fn();
  const submitForm = jest.fn();
  const setSelectedFolderDynamic = jest.fn();

  const methods = useForm();

  const props = {
    foldersWithNotes: [{}],
    methods,
    cancelSelectedNoteModal,
    submitForm,
    setSelectedNoteToEdit,
    selectedNoteToEdit: {},
    setSelectedFolder,
    definePropperEditMode: null,
    setSelectedFolderDynamic,
  };
  it('it should render modal wrapper', async () => {
    const { getByTestId } = render(<EditSelectedNote {...props} />);
    const wrapper = getByTestId(MODAL_WRAPPER);
    expect(wrapper).toBeInTheDocument();
  });
  it('it should render confirm modal to delete note', async () => {
    const { getByTestId } = render(<EditSelectedNote {...props} />);
    const button = getByTestId('delete');
    fireEvent.click(button);
    const modal = getByTestId('confirm-modal');
    expect(modal).toBeInTheDocument();
  });
  it('it should render edit mode', async () => {
    const { getByTestId } = render(<EditSelectedNote {...props} />);
    const button = getByTestId('edit');
    fireEvent.click(button);
    const title = getByTestId('input-noteTitle');
    const text = getByTestId('textarea-noteText');
    expect(title).toBeInTheDocument();
    expect(text).toBeInTheDocument();
  });
  it('it should call props handlers', async () => {
    render(<EditSelectedNote {...props} />);
    props.cancelSelectedNoteModal();
    props.setSelectedNoteToEdit();
    props.setSelectedFolder();
    props.submitForm();
    expect(cancelSelectedNoteModal).toHaveBeenCalled();
    expect(setSelectedNoteToEdit).toHaveBeenCalled();
    expect(setSelectedFolder).toHaveBeenCalled();
    expect(submitForm).toHaveBeenCalled();
  });
});

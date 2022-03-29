import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import '@testing-library/jest-dom';
import { renderWithTheme as render } from 'utils/test';
import { fireEvent } from '@testing-library/react';
import { useForm } from 'react-hook-form';

import AddTeamNoteModal, { MODAL_WRAPPER } from './AddTeamNoteModal';

jest.mock('react-hook-form', () => ({
  ...jest.requireActual('react-hook-form'),
  useForm: () => ({
    handleSubmit: () => jest.fn(),
    getValues: () => jest.fn(),
    trigger: () => jest.fn(),
    register: () => jest.fn(),
    formState: { isValid: true, errors: {} },
  }),
}));

describe('AddTeamNoteModal', () => {
  const cancelTEAMModal = jest.fn();
  const setSelectedPerson = jest.fn();
  const setSearchValue = jest.fn();
  const handleTEAMSubmit = jest.fn();

  const teamMethods = useForm({
    defaultValues: {
      search_option: 'mocked',
      noteTitle: 'mocked',
      noteText: 'mocked',
    },
  });

  const props = {
    teamMethods,
    searchValue: '',
    setSearchValue,
    selectedPerson: {},
    setSelectedPerson,
    foldersWithNotesTEAM: [{ id: 1 }],
    cancelTEAMModal,
    handleTEAMSubmit,
    createFolder: false,
  };
  it('it should render modal wrapper', async () => {
    const { getByTestId } = render(<AddTeamNoteModal {...props} />);
    const form = getByTestId(MODAL_WRAPPER);
    expect(form).toBeInTheDocument();
  });
  it('it should submit from', async () => {
    const { getByTestId } = render(<AddTeamNoteModal {...props} />);
    const arrow = getByTestId('arrowRight');
    fireEvent.click(arrow);
    expect(handleTEAMSubmit).toHaveBeenCalled();
  });
  it('it should show success modal', async () => {
    const { getByTestId } = render(<AddTeamNoteModal {...props} />);
    const arrow = getByTestId('arrowRight');
    fireEvent.click(arrow);
    expect(getByTestId('modal-wrapper')).toBeInTheDocument();
  });
  it('it should got back to notes', async () => {
    const { getByTestId } = render(<AddTeamNoteModal {...props} selectedPerson={null} />);
    const goBack = getByTestId('go-back');
    fireEvent.click(goBack);
    expect(cancelTEAMModal).toHaveBeenCalled();
  });
});

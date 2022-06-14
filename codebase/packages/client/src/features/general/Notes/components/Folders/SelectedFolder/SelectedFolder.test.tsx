import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { renderWithTheme as render } from 'utils/test';
import '@testing-library/jest-dom';
import { fireEvent } from '@testing-library/react';
import SelectedFolder, { FOLDER_WRAPPER } from './SelectedFolder';
import { NotesContext } from 'features/general/Notes/contexts/notesContext';

describe('Selected folder', () => {
  const setFoldersWithNotes = jest.fn();
  const setSelectedFolder = jest.fn();
  const setSelectedNoteToEdit = jest.fn();
  const setSelectedTEAMNoteToEdit = jest.fn();
  const actionTEAMModal = jest.fn();
  const setConfirmTEAMModal = jest.fn();
  const setConfirmModal = jest.fn();
  const setArchiveMode = jest.fn();

  const selectedFolder = { notes: [{ isInSearch: false, id: 1, referenceColleagueUuid: true }] };
  const archiveMode = { user: false, team: false };

  const value = {
    selectedFolder,
    setFoldersWithNotes,
    setSelectedFolder,
    setSelectedNoteToEdit,
    setSelectedTEAMNoteToEdit,
    setArchiveMode,
    archiveMode,
  };

  const props = {
    setConfirmModal,
    setConfirmTEAMModal,
    actionModal: { current: 'archive' },
    userActions: { folderId: 'id' },
    actionTEAMModal: { current: 'archive' },
    testId: 'test',
    teamActions: { folderUuid: 'uuid', noteId: 'id' },
  };

  const initialState = { notes: { folders: [{}] } };
  it('render selected folder wrapper', async () => {
    const { getByTestId } = render(
      <NotesContext.Provider value={value}>
        <SelectedFolder {...props} />
      </NotesContext.Provider>,
      initialState,
    );

    expect(getByTestId(FOLDER_WRAPPER)).toBeInTheDocument();
  });
  it('it should call setSelectedFolder handler', async () => {
    render(
      <NotesContext.Provider value={value}>
        <SelectedFolder {...props} />
      </NotesContext.Provider>,
      initialState,
    );
    value.setSelectedFolder();
    expect(setSelectedFolder).toHaveBeenCalled();
  });
  it('it should call dots handler', async () => {
    const { getByTestId } = render(
      <NotesContext.Provider value={value}>
        <SelectedFolder {...props} />
      </NotesContext.Provider>,
      initialState,
    );
    const dots = getByTestId('dots');
    fireEvent.click(dots);
    expect(setSelectedFolder).toHaveBeenCalled();
  });
  it('it should call dots buttons', async () => {
    const { getByTestId } = render(
      <NotesContext.Provider
        value={{
          ...value,
          selectedFolder: { notes: [{ isInSearch: false, id: 1, referenceColleagueUuid: true, selected: true }] },
        }}
      >
        <SelectedFolder {...props} />
      </NotesContext.Provider>,
      initialState,
    );

    fireEvent.click(getByTestId('backdrop-archive'));
    fireEvent.click(getByTestId('backdrop-folder'));
    fireEvent.click(getByTestId('backdrop-delete'));
    fireEvent.click(getByTestId('backdrop-archive-icon'));
    fireEvent.click(getByTestId('backdrop-folder-icon'));
    fireEvent.click(getByTestId('backdrop-delete-icon'));

    expect(setConfirmTEAMModal).toHaveBeenCalled();

    expect(getByTestId('button-dots')).toBeInTheDocument();
  });
  it('it should call setConfirmModal', async () => {
    const { getByTestId } = render(
      <NotesContext.Provider
        value={{
          ...value,
          selectedFolder: { notes: [{ isInSearch: false, id: 1, referenceColleagueUuid: true, selected: true }] },
        }}
      >
        <SelectedFolder {...props} />
      </NotesContext.Provider>,
      initialState,
    );

    fireEvent.click(getByTestId('backdrop-archive'));

    props.setConfirmModal();
    expect(setConfirmModal).toHaveBeenCalled();

    expect(getByTestId('button-dots')).toBeInTheDocument();
  });
});

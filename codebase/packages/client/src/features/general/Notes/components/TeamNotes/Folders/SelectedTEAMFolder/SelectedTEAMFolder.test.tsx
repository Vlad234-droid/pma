import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { renderWithTheme as render } from 'utils/test';
import '@testing-library/jest-dom';
import { fireEvent } from '@testing-library/react';
import SelectedTEAMFolder, { TEAM_WRAPPER } from './SelectedTEAMFolder';
import { NotesContext } from 'features/general/Notes/contexts/notesContext';

// TODO: after change need update this test
describe('Selected team folder', () => {
  const setFoldersWithNotesTEAM = jest.fn();
  const actionTEAMModal = jest.fn();
  const setSelectedTEAMFolder = jest.fn();
  const setSelectedNoteToEdit = jest.fn();
  const setSelectedTEAMNoteToEdit = jest.fn();
  const setConfirmTEAMModal = jest.fn();
  const setArchiveMode = jest.fn();

  const teamActions = jest.spyOn(React, 'useRef').mockReturnValueOnce({ current: null });

  const selectedTEAMFolder = { notes: [{ isInSearch: false, id: 1, referenceColleagueUuid: true }] };
  const foldersWithNotesTEAM = [{ notes: [{}] }];

  const initialState = { notes: { folders: [{}] } };
  const archiveMode = { user: false, team: false };

  const props = {
    setConfirmTEAMModal,
    actionTEAMModal,
    teamActions,
  };

  const value = {
    selectedTEAMFolder,
    setSelectedTEAMFolder,
    setFoldersWithNotesTEAM,
    setSelectedNoteToEdit,
    setSelectedTEAMNoteToEdit,
    archiveMode,
    setArchiveMode,
    foldersWithNotesTEAM,
  };

  it.skip('render selected folder wrapper', async () => {
    const { getByTestId } = render(
      <NotesContext.Provider value={value}>
        <SelectedTEAMFolder {...props} />
      </NotesContext.Provider>,
      initialState,
    );

    expect(getByTestId(TEAM_WRAPPER)).toBeInTheDocument();
  });
  it.skip('it should call setSelectedFolder handler', async () => {
    render(
      <NotesContext.Provider value={value}>
        <SelectedTEAMFolder {...props} />
      </NotesContext.Provider>,
      initialState,
    );
    value.setSelectedTEAMFolder();
    expect(setSelectedTEAMFolder).toHaveBeenCalled();
  });
  it.skip('it should call dots handler', async () => {
    const { getByTestId } = render(
      <NotesContext.Provider value={value}>
        <SelectedTEAMFolder {...props} />
      </NotesContext.Provider>,
      initialState,
    );
    const dots = getByTestId('dots');
    fireEvent.click(dots);
    expect(setSelectedTEAMFolder).toHaveBeenCalled();
  });

  it.skip('it should call setConfirmModal', async () => {
    const { getByTestId } = render(
      <NotesContext.Provider
        value={{ ...value, selectedTEAMFolder: { notes: [{ isInSearch: false, id: 1, selected: true }] } }}
      >
        <SelectedTEAMFolder {...props} />
      </NotesContext.Provider>,
      initialState,
    );

    fireEvent.click(getByTestId('backdrop-archive'));
    fireEvent.click(getByTestId('backdrop-folder'));
    fireEvent.click(getByTestId('backdrop-delete'));
    fireEvent.click(getByTestId('backdrop-archive-icon'));

    expect(setConfirmTEAMModal).toHaveBeenCalled();

    expect(getByTestId('button-dots')).toBeInTheDocument();
  });
});

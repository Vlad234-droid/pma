import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { renderWithTheme } from 'utils/test';
import '@testing-library/jest-dom';
import { fireEvent } from '@testing-library/react';
import PersonalsTeamFolders, { TEAM_FOLDER_WRAPPER, CHANGE_TEAM_MODE } from './PersonalsTeamFolders';
import { NotesContext } from 'features/NotesActions/contexts/notesContext';

describe('it should render team folders & archived folders', () => {
  const handleTEAMSelected = jest.fn();
  const setConfirmTEAMModal = jest.fn();
  const teamsActions = jest.spyOn(React, 'useRef').mockReturnValueOnce({ current: null });
  const actionTEAMModal = jest.spyOn(React, 'useRef').mockReturnValueOnce({ current: null });
  const setFoldersWithNotesTEAM = jest.fn();
  const setFoldersWithNotes = jest.fn();
  const setSelectedFolder = jest.fn();
  const setArchiveMode = jest.fn();
  const setSelectedTEAMFolder = jest.fn();

  const foldersWithNotesTEAM = [{ id: 1, notes: [{}] }];
  const selectedFolder = { id: 1 };
  const archiveMode = { user: false, team: false };

  const value = {
    foldersWithNotesTEAM,
    selectedFolder,
    setFoldersWithNotesTEAM,
    setFoldersWithNotes,
    setSelectedFolder,
    archiveMode,
    setArchiveMode,
    setSelectedTEAMFolder,
  };

  const props = {
    handleTEAMSelected,
    setConfirmTEAMModal,
    actionTEAMModal,
    teamsActions,
  };

  it('it should render Archived Folders', async () => {
    const { getByText } = renderWithTheme(
      <NotesContext.Provider value={value}>
        <PersonalsTeamFolders {...props} />
      </NotesContext.Provider>,
    );
    const title = getByText(/Archived Folders/i);
    expect(title).toBeInTheDocument();
  });
  it('it should render wrapper', async () => {
    const { getByTestId } = renderWithTheme(<PersonalsTeamFolders {...props} />);
    const personalFolderWrapper = getByTestId(TEAM_FOLDER_WRAPPER);
    expect(personalFolderWrapper).toBeInTheDocument();
  });
  it('it should render archived folder', async () => {
    const { getByText, getByTestId } = renderWithTheme(
      <NotesContext.Provider value={value}>
        <PersonalsTeamFolders {...props} />
      </NotesContext.Provider>,
    );
    const changeModeBtn = getByTestId(CHANGE_TEAM_MODE);
    fireEvent.click(changeModeBtn);
    const archivedTitle = getByText('Archived Folders');
    expect(archivedTitle).toBeInTheDocument();
  });
  it('it should call handleSelected handler', async () => {
    renderWithTheme(
      <NotesContext.Provider value={value}>
        <PersonalsTeamFolders {...props} />
      </NotesContext.Provider>,
    );
    value.setFoldersWithNotes();
    props.handleTEAMSelected();

    expect(setFoldersWithNotes).toHaveBeenCalled();
    expect(handleTEAMSelected).toHaveBeenCalled();
  });

  it('it should call setIsUserArchived, setSelectedFolder handlers', async () => {
    const { getByTestId } = renderWithTheme(
      <NotesContext.Provider value={value}>
        <PersonalsTeamFolders {...props} />
      </NotesContext.Provider>,
    );
    const mode = getByTestId(CHANGE_TEAM_MODE);
    fireEvent.click(mode);
    expect(setArchiveMode).toHaveBeenCalled();
    expect(setSelectedTEAMFolder).toHaveBeenCalled();
  });

  it('it should call setSelectedFolder, setFoldersWithNotes handlers', async () => {
    renderWithTheme(
      <NotesContext.Provider value={value}>
        <PersonalsTeamFolders {...props} />
      </NotesContext.Provider>,
    );
    value.setSelectedFolder();
    value.setFoldersWithNotesTEAM();

    expect(setSelectedFolder).toHaveBeenCalled();
    expect(setFoldersWithNotesTEAM).toHaveBeenCalled();
  });
});

import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { renderWithTheme } from 'utils/test';
import '@testing-library/jest-dom';
import { fireEvent } from '@testing-library/react';
import PersonalsTeamFolders, { TEAM_FOLDER_WRAPPER, CHANGE_TEAM_MODE, FOLDER_TITLE } from './PersonalsTeamFolders';

describe('it should render team folders & archived folders', () => {
  const handleTEAMSelected = jest.fn();
  const setConfirmTEAMModal = jest.fn();
  const selectedTEAMFolderId = jest.spyOn(React, 'useRef').mockReturnValueOnce({ current: null });
  const selectedTEAMNoteId = jest.spyOn(React, 'useRef').mockReturnValueOnce({ current: null });
  const setFoldersWithNotesTEAM = jest.fn();
  const setFoldersWithNotes = jest.fn();
  const setSelectedFolder = jest.fn();
  const actionTEAMModal = jest.fn();
  const setTeamArchivedMode = jest.fn();
  const setSelectedTEAMFolder = jest.fn();

  const props = {
    handleTEAMSelected,
    setConfirmTEAMModal,
    selectedTEAMFolderId,
    setSelectedFolder,
    selectedFolder: { id: 1 },
    foldersWithNotesTEAM: [{ id: 1, notes: [{}] }],
    selectedTEAMNoteId,
    setFoldersWithNotesTEAM,
    setFoldersWithNotes,
    actionTEAMModal,
    teamArchivedMode: true,
    setTeamArchivedMode,
    setSelectedTEAMFolder,
  };

  it('it should render personal folder', async () => {
    const { getByText } = renderWithTheme(<PersonalsTeamFolders {...props} />);
    const title = getByText(/Personal Folders/i);
    expect(title).toBeInTheDocument();
  });
  it('it should render wrapper', async () => {
    const { getByTestId } = renderWithTheme(<PersonalsTeamFolders {...props} />);
    const personalFolderWrapper = getByTestId(TEAM_FOLDER_WRAPPER);
    expect(personalFolderWrapper).toBeInTheDocument();
  });
  it('it should render archived folder', async () => {
    const { getByTestId, getByText } = renderWithTheme(<PersonalsTeamFolders {...props} teamArchivedMode={false} />);
    const changeModeBtn = getByTestId(CHANGE_TEAM_MODE);
    fireEvent.click(changeModeBtn);
    const archivedTitle = getByText('Archived Folders');
    expect(archivedTitle).toBeInTheDocument();
  });
  it('it should call handleSelected handler', async () => {
    const { getByTestId } = renderWithTheme(<PersonalsTeamFolders {...props} />);
    const folderItem = getByTestId('folder-item');
    fireEvent.click(folderItem);
    expect(setFoldersWithNotes).toHaveBeenCalled();
    expect(handleTEAMSelected).toHaveBeenCalled();
  });

  it('it should call setIsUserArchived, setSelectedFolder handlers', async () => {
    const { getByTestId } = renderWithTheme(<PersonalsTeamFolders {...props} />);
    const mode = getByTestId(CHANGE_TEAM_MODE);
    fireEvent.click(mode);
    expect(setTeamArchivedMode).toHaveBeenCalled();
    expect(setSelectedTEAMFolder).toHaveBeenCalled();
  });
  it('it should call setSelectedFolder, setFoldersWithNotes handlers', async () => {
    const { getByTestId } = renderWithTheme(<PersonalsTeamFolders {...props} />);
    const dots = getByTestId('dots-items');
    fireEvent.click(dots);
    expect(setSelectedFolder).toHaveBeenCalled();
    expect(setFoldersWithNotesTEAM).toHaveBeenCalled();
  });
});

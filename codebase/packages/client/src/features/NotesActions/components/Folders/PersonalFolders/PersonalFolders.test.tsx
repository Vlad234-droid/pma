import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { renderWithTheme } from 'utils/test';
import '@testing-library/jest-dom';
import { fireEvent } from '@testing-library/react';
import PersonalFolders, { PERSONAL_FOLDER_WRAPPER, CHANGE_USER_MODE } from './PersonalFolders';

describe('it should render folders & archived folders', () => {
  const handleSelected = jest.fn();
  const setConfirmModal = jest.fn();
  const setSelectedTEAMFolder = jest.fn();
  const setFoldersWithNotesTEAM = jest.fn();
  const setFoldersWithNotes = jest.fn();
  const setSelectedFolder = jest.fn();
  const setIsUserArchived = jest.fn();

  const useRefSpy = jest.spyOn(React, 'useRef').mockReturnValueOnce({ current: null });

  const props = {
    handleSelected,
    setConfirmModal,
    setSelectedTEAMFolder,
    selectedTEAMFolder: {},
    setFoldersWithNotesTEAM,
    actionModal: null,
    selectedFolderId: null,
    foldersWithNotes: [{ id: 1, notes: [] }],
    setFoldersWithNotes,
    selectedFolder: {},
    setSelectedFolder,
    selectedNoteId: useRefSpy,
    setIsUserArchived,
    isUserArchived: false,
  };

  it('it should render personal folder', async () => {
    const { getByText } = renderWithTheme(<PersonalFolders {...props} />);
    const title = getByText(/Personal Folders/i);
    expect(title).toBeInTheDocument();
  });
  it('it should render wrapper', async () => {
    const { getByTestId } = renderWithTheme(<PersonalFolders {...props} />);
    const personalFolderWrapper = getByTestId(PERSONAL_FOLDER_WRAPPER);
    expect(personalFolderWrapper).toBeInTheDocument();
  });
  it('it should render archived folder', async () => {
    const { getByTestId, getByText } = renderWithTheme(<PersonalFolders {...props} />);
    const changeModeBtn = getByTestId(CHANGE_USER_MODE);
    const title = getByText(/Personal Folders/i);
    expect(title).toBeInTheDocument();
    fireEvent.click(changeModeBtn);
    const archivedTitle = getByText('Archived Folders');
    expect(archivedTitle).toBeInTheDocument();
  });
  it('it should call handleSelected handler', async () => {
    const { getByTestId } = renderWithTheme(<PersonalFolders {...props} />);
    const folderItem = getByTestId('folder-item');
    fireEvent.click(folderItem);
    expect(handleSelected).toHaveBeenCalled();
  });
  it('it should call setIsUserArchived, setSelectedFolder handlers', async () => {
    const { getByTestId } = renderWithTheme(<PersonalFolders {...props} />);
    const mode = getByTestId(CHANGE_USER_MODE);
    fireEvent.click(mode);
    expect(setIsUserArchived).toHaveBeenCalled();
    expect(setSelectedFolder).toHaveBeenCalled();
  });
  it('it should call setSelectedFolder, setFoldersWithNotes handlers', async () => {
    const { getByTestId } = renderWithTheme(<PersonalFolders {...props} />);
    const dots = getByTestId('dots-items');
    fireEvent.click(dots);
    expect(setSelectedFolder).toHaveBeenCalled();
    expect(setFoldersWithNotes).toHaveBeenCalled();
  });
});

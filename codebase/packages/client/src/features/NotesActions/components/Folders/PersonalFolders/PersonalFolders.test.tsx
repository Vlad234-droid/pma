import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { renderWithTheme } from 'utils/test';
import '@testing-library/jest-dom';
import { fireEvent } from '@testing-library/react';
import PersonalFolders, { PERSONAL_FOLDER_WRAPPER, CHANGE_USER_MODE } from './PersonalFolders';
import { NotesContext } from 'features/NotesActions/contexts/notesContext';

describe('it should render folders & archived folders', () => {
  const handleSelected = jest.fn();
  const setConfirmModal = jest.fn();

  const foldersWithNotes = [
    {
      id: '1ad116f4-1c42-4e61-bbf0-b371e6223cf0',
      notes: [],
      ownerColleagueUuid: '15818570-cd6b-4957-8a82-3d34dcb0b077',
      parentFolderUuid: '4eb0c40f-8e7a-43e3-8096-2a431b5c9ba1',
      quantity: 0,
      selected: false,
      selectedDots: false,
      title: 'mocked_title',
    },
  ];
  const archiveMode = {
    user: false,
    team: false,
  };

  const setArchiveMode = jest.fn();
  const setSelectedTEAMFolder = jest.fn();
  const setSelectedFolder = jest.fn();

  const props = {
    handleSelected,
    setConfirmModal,
    actionModal: { current: 'archive' },
    userActions: { folderId: 'id' },
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
  it('it should call handleSelected', async () => {
    const { getByTestId } = renderWithTheme(
      <NotesContext.Provider value={{ foldersWithNotes, setArchiveMode, archiveMode, setSelectedTEAMFolder }}>
        <PersonalFolders {...props} />
      </NotesContext.Provider>,
    );
    const folderItem = getByTestId('folder-item');
    fireEvent.click(folderItem);
    expect(handleSelected).toHaveBeenCalled();
  });
  it('it should call setSelectedFolder handler', async () => {
    const { getByTestId } = renderWithTheme(
      <NotesContext.Provider
        value={{ foldersWithNotes, setArchiveMode, archiveMode, setSelectedTEAMFolder, setSelectedFolder }}
      >
        <PersonalFolders {...props} />
      </NotesContext.Provider>,
    );
    const mode = getByTestId(CHANGE_USER_MODE);
    fireEvent.click(mode);
    expect(setSelectedFolder).toHaveBeenCalled();
  });
  it('it should call setSelectedFolder, setFoldersWithNotes handlers', async () => {
    const setFoldersWithNotes = jest.fn();
    const { getByTestId } = renderWithTheme(
      <NotesContext.Provider
        value={{
          foldersWithNotes,
          setArchiveMode,
          archiveMode,
          setSelectedTEAMFolder,
          setSelectedFolder,
          setFoldersWithNotes,
        }}
      >
        <PersonalFolders {...props} />
      </NotesContext.Provider>,
    );
    const dots = getByTestId('dots-items');
    expect(dots).toBeInTheDocument();
    fireEvent.click(dots);
    expect(setSelectedFolder).toHaveBeenCalled();
    expect(setFoldersWithNotes).toHaveBeenCalled();
  });
});

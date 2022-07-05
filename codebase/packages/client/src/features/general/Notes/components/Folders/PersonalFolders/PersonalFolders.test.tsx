import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { renderWithTheme } from 'utils/test';
import '@testing-library/jest-dom';
import { fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

import PersonalFolders, { PERSONAL_FOLDER_WRAPPER, CHANGE_USER_MODE } from './PersonalFolders';
import { NotesContext } from 'features/general/Notes/contexts/notesContext';

jest.mock('react-router-dom', () => {
  return {
    ...jest.requireActual('react-router-dom'),

    useSearchParams: () => [new URLSearchParams(), jest.fn()],
  };
});

describe('it should render folders & archived folders', () => {
  const setConfirmModal = jest.fn();
  const setArchiveMode = jest.fn();
  const actionModal = jest.spyOn(React, 'useRef').mockReturnValueOnce({ current: null });
  const userActions = jest.spyOn(React, 'useRef').mockReturnValueOnce({
    current: {
      folderId: null,
      noteId: null,
      folderUuid: null,
    },
  });

  const archiveMode = {
    user: false,
    team: false,
  };

  const props = {
    setConfirmModal,
    actionModal,
    userActions,
  };

  const notes = [
    {
      content: 'mocked_content',
      folderUuid: 'mocked_folderUuid',
      id: 'mocked_id',
      ownerColleagueUuid: 'mocked_ownerColleagueUuid',
      status: 'CREATED',
      title: 'mocked_title',
      updateTime: 'mocked_updateTime',
      selected: false,
    },
  ];

  const foldersWithNotes = [
    {
      id: '1ad116f4-1c42-4e61-bbf0-b371e6223cf0',
      notes,
      ownerColleagueUuid: '15818570-cd6b-4957-8a82-3d34dcb0b077',
      parentFolderUuid: '4eb0c40f-8e7a-43e3-8096-2a431b5c9ba1',
      quantity: 0,
      selectedDots: false,
      title: 'mocked_title',
    },
  ];

  it('it should render personal folder', async () => {
    const { getByText } = renderWithTheme(
      <BrowserRouter>
        <PersonalFolders {...props} />
      </BrowserRouter>,
    );
    const title = getByText(/Personal Folders/i);
    expect(title).toBeInTheDocument();
  });
  it('it should render wrapper', async () => {
    const { getByTestId } = renderWithTheme(
      <BrowserRouter>
        <PersonalFolders {...props} />
      </BrowserRouter>,
    );
    const personalFolderWrapper = getByTestId(PERSONAL_FOLDER_WRAPPER);
    expect(personalFolderWrapper).toBeInTheDocument();
  });

  it('it should render archived folder', async () => {
    const { getByTestId, getByText } = renderWithTheme(
      <BrowserRouter>
        <NotesContext.Provider value={{ setArchiveMode, archiveMode }}>
          <PersonalFolders {...props} />
        </NotesContext.Provider>
      </BrowserRouter>,
    );
    const changeModeBtn = getByTestId(CHANGE_USER_MODE);
    const title = getByText(/Personal Folders/i);
    expect(title).toBeInTheDocument();
    fireEvent.click(changeModeBtn);
    expect(setArchiveMode).toHaveBeenCalledTimes(1);
    const archivedTitle = getByText('Archived Folders');
    expect(archivedTitle).toBeInTheDocument();
  });
  it('it should call handleSelected', async () => {
    const setSearchValue = jest.fn();
    const { getByTestId } = renderWithTheme(
      <NotesContext.Provider value={{ foldersWithNotes, setArchiveMode, archiveMode, setSearchValue }}>
        <PersonalFolders {...props} />
      </NotesContext.Provider>,
    );
    const folderItem = getByTestId('1ad116f4-1c42-4e61-bbf0-b371e6223cf0');
    fireEvent.click(folderItem);
    expect(setSearchValue).toHaveBeenCalledTimes(1);
  });
});

import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { renderWithTheme } from '../../../utils/test';
import '@testing-library/jest-dom';
import { fireEvent } from '@testing-library/react';
import PersonalFolders, { PERSONAL_FOLDER_WRAPPER, CHANGE_USER_MODE } from './PersonalFolders';

describe('it should render folders & archived folders', () => {
  const testHandler = jest.fn();

  const props = {
    handleSelected: testHandler,
    setConfirmModal: testHandler,
    setSelectedTEAMFolder: testHandler,
    selectedTEAMFolder: {},
    setFoldersWithNotesTEAM: testHandler,
    actionModal: null,
    selectedFolderId: null,
    foldersWithNotes: [],
    setFoldersWithNotes: testHandler,
    selectedFolder: {},
    setSelectedFolder: testHandler,
    selectedNoteId: null,
    setIsUserArchived: testHandler,
    isUserArchived: false,
  };

  it('render personal folder', async () => {
    const { getByTestId, getByText } = renderWithTheme(<PersonalFolders {...props} />);
    const personalFolderWrapper = getByTestId(PERSONAL_FOLDER_WRAPPER);
    const title = getByText('Personal Folders');
    expect(personalFolderWrapper).toBeInTheDocument();
    expect(title).toBeInTheDocument();
  });
  it('render archived folder', async () => {
    const { getByTestId, getByText } = renderWithTheme(<PersonalFolders {...props} />);
    const changeModeBtn = getByTestId(CHANGE_USER_MODE);
    const title = getByText('Personal Folders');
    expect(title).toBeInTheDocument();
    fireEvent.click(changeModeBtn);
    const archivedTitle = getByText('Archived Folders');
    expect(archivedTitle).toBeInTheDocument();
  });
});

import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { renderWithTheme } from '../../../utils/test';
import '@testing-library/jest-dom';
import { fireEvent } from '@testing-library/react';
import PersonalFolders, { PERSONAL_FOLDER_WRAPPER, CHANGE_USER_MODE } from './PersonalFolders';

it('render personal folder', async () => {
  const testHandler = jest.fn();
  const { getByTestId, getByText } = renderWithTheme(
    <PersonalFolders
      handleSelected={testHandler}
      setConfirmModal={testHandler}
      setSelectedTEAMFolder={testHandler}
      selectedTEAMFolder={{}}
      setFoldersWithNotesTEAM={testHandler}
      actionModal={null}
      selectedFolderId={null}
      foldersWithNotes={[]}
      setFoldersWithNotes={testHandler}
      selectedFolder={{}}
      setSelectedFolder={testHandler}
      selectedNoteId={null}
      setUserArchivedMode={testHandler}
      userArchivedMode={false}
    />,
  );

  const personalFolderWrapper = getByTestId(PERSONAL_FOLDER_WRAPPER);
  const changeModeBtn = getByTestId(CHANGE_USER_MODE);
  const title = getByText('Personal Folders');
  expect(personalFolderWrapper).toBeInTheDocument();
  expect(title).toBeInTheDocument();
  fireEvent.click(changeModeBtn);
  const archivedTitle = getByText('Archived Folders');
  expect(archivedTitle).toBeInTheDocument();
});

import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { renderWithTheme } from 'utils/test';
import '@testing-library/jest-dom';
import { fireEvent } from '@testing-library/react';
import PersonalsTeamFolders, { TEAM_FOLDER_WRAPPER, CHANGE_TEAM_MODE, FOLDER_TITLE } from './PersonalsTeamFolders';

it('render team folder', async () => {
  const testHandler = jest.fn();
  const { getByTestId } = renderWithTheme(
    <PersonalsTeamFolders
      handleTEAMSelected={testHandler}
      setConfirmTEAMModal={testHandler}
      selectedTEAMFolderId={null}
      actionTEAMModal={null}
      setSelectedFolder={testHandler}
      selectedFolder={{}}
      foldersWithNotesTEAM={[]}
      selectedTEAMNoteId={null}
      setFoldersWithNotesTEAM={testHandler}
      setFoldersWithNotes={testHandler}
      setTeamArchivedMode={testHandler}
      teamArchivedMode={false}
      setSelectedTEAMFolder={testHandler}
    />,
  );

  const personalFolderWrapper = getByTestId(TEAM_FOLDER_WRAPPER);
  const changeModeBtn = getByTestId(CHANGE_TEAM_MODE);
  const title = getByTestId(FOLDER_TITLE);
  expect(personalFolderWrapper).toBeInTheDocument();
  expect(title).toBeInTheDocument();
  fireEvent.click(changeModeBtn);
});

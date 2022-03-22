import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import '@testing-library/jest-dom';
import { renderWithTheme as render } from 'utils/test';

import MainFolders, { MAIN_FOLDERS_ID } from './MainFolders';

describe('Main Folders', () => {
  const testHandler = jest.fn();

  const props = {
    setSelectedFolder: testHandler,
    setSelectedNoteToEdit: testHandler,
    setSelectedTEAMNoteToEdit: testHandler,
    selectedFolder: {},
    foldersWithNotes: [],
    setFoldersWithNotes: testHandler,
    TEAM: false,
    selectedTEAMFolder: {},
    setSelectedTEAMFolder: testHandler,
    setFoldersWithNotesTEAM: testHandler,
    setIsUserArchived: testHandler,
    setTeamArchivedMode: testHandler,
    foldersWithNotesTEAM: [],
    isUserArchived: false,
    teamArchivedMode: false,
  };

  it('it should render personal folder wrapper', async () => {
    const { getByTestId } = render(<MainFolders {...props} />);
    const wrapper = getByTestId(MAIN_FOLDERS_ID);
    expect(wrapper).toBeInTheDocument();
  });
});

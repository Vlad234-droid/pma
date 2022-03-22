import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { renderWithTheme } from 'utils/test';
import '@testing-library/jest-dom';
import { fireEvent } from '@testing-library/react';
import PersonalsTeamFolders from '../PersonalsTeamFolders';

describe('it should render selected folder', () => {
  const testHandler = jest.fn();

  const personalFolderProps = {
    handleTEAMSelected: testHandler,
    setConfirmTEAMModal: testHandler,
    selectedTEAMFolderId: '',
    actionTEAMModal: '',
    setSelectedFolder: testHandler,
    selectedFolder: {},
    foldersWithNotesTEAM: [
      {
        id: '10000000-0000-0000-0000-10000000000',
        notes: [],
        ownerColleagueUuid: '15818570-cd6b-4957-8a82-3d34dcb0b077',
        quantity: 0,
        selected: false,
        selectedDots: false,
        title: 'All notes',
      },
    ],
    selectedTEAMNoteId: null,
    setFoldersWithNotesTEAM: testHandler,
    setFoldersWithNotes: testHandler,
    setTeamArchivedMode: testHandler,
    teamArchivedMode: false,
    setSelectedTEAMFolder: testHandler,
  };

  it('render selected folder', async () => {
    const { getByText, queryByText } = renderWithTheme(<PersonalsTeamFolders {...personalFolderProps} />);
    const allNotes = getByText('All notes');
    fireEvent.click(allNotes);
    expect(queryByText('mocked_ratings_modal')).not.toBeInTheDocument();
    expect(allNotes).toBeInTheDocument();
  });
});

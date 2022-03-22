import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { renderWithTheme } from 'utils/test';
import '@testing-library/jest-dom';
import { fireEvent } from '@testing-library/react';
import PersonalFolders from '../PersonalFolders';

jest.mock('./SelectedFolder.tsx', () => {
  return {
    __esModule: true,
    default: () => {
      return <div>mocked_ratings_modal</div>;
    },
  };
});

describe('it should render selected folder', () => {
  const testHandler = jest.fn();

  const personalFolderProps = {
    handleSelected: testHandler,
    setConfirmModal: testHandler,
    setSelectedTEAMFolder: testHandler,
    selectedTEAMFolder: {},
    setFoldersWithNotesTEAM: testHandler,
    actionModal: null,
    selectedFolderId: null,
    foldersWithNotes: [
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
    setFoldersWithNotes: testHandler,
    selectedFolder: {},
    setSelectedFolder: testHandler,
    selectedNoteId: null,
    setIsUserArchived: testHandler,
    isUserArchived: false,
  };

  it('render selected folder', async () => {
    const { getByText, queryByText } = renderWithTheme(<PersonalFolders {...personalFolderProps} />);
    const allNotes = getByText('All notes');
    fireEvent.click(allNotes);
    expect(queryByText('mocked_ratings_modal')).not.toBeInTheDocument();
    expect(allNotes).toBeInTheDocument();
  });
});

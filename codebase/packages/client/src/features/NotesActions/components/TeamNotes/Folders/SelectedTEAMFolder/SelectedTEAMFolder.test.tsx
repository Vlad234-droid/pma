import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { renderWithTheme as render } from 'utils/test';
import '@testing-library/jest-dom';
import { fireEvent } from '@testing-library/react';
import SelectedTEAMFolder, { TEAM_WRAPPER } from './SelectedTEAMFolder';

describe('Selected team folder', () => {
  const setFoldersWithNotesTEAM = jest.fn();
  const actionTEAMModal = jest.fn();
  const setSelectedTEAMFolder = jest.fn();
  const setSelectedNoteToEdit = jest.fn();
  const setSelectedTEAMNoteToEdit = jest.fn();
  const setConfirmTEAMModal = jest.fn();
  const setConfirmModal = jest.fn();

  const selectedTEAMNoteId = jest.spyOn(React, 'useRef').mockReturnValueOnce({ current: null });
  const selectedFolderId = jest.spyOn(React, 'useRef').mockReturnValueOnce({ current: null });
  const selectedTEAMFolderId = jest.spyOn(React, 'useRef').mockReturnValueOnce({ current: null });
  const noteTEAMFolderUuid = jest.spyOn(React, 'useRef').mockReturnValueOnce({ current: null });

  const props = {
    selectedTEAMFolder: { notes: [{ isInSearch: false, id: 1, referenceColleagueUuid: true }] },
    setConfirmTEAMModal,
    selectedTEAMNoteId,
    actionTEAMModal,
    setSelectedTEAMFolder,
    foldersWithNotesTEAM: [{ notes: [{}] }],
    setFoldersWithNotesTEAM,
    selectedFolderId,
    noteTEAMFolderUuid,
    setSelectedNoteToEdit,
    isUserArchived: false,
    setSelectedTEAMNoteToEdit,
    teamArchivedMode: false,
    selectedTEAMFolderId,
  };

  it('render selected folder wrapper', async () => {
    const { getByTestId } = render(<SelectedTEAMFolder {...props} />, { notes: { folders: [{}] } });

    expect(getByTestId(TEAM_WRAPPER)).toBeInTheDocument();
  });
  it('it should call setSelectedFolder handler', async () => {
    render(<SelectedTEAMFolder {...props} />, { notes: { folders: [{}] } });
    props.setSelectedTEAMFolder();
    expect(setSelectedTEAMFolder).toHaveBeenCalled();
  });
  it('it should call dots handler', async () => {
    const { getByTestId } = render(<SelectedTEAMFolder {...props} />, { notes: { folders: [{}] } });
    const dots = getByTestId('dots');
    fireEvent.click(dots);
    expect(setSelectedTEAMFolder).toHaveBeenCalled();
    props.setSelectedTEAMNoteToEdit();
    expect(setSelectedTEAMNoteToEdit).toHaveBeenCalled();
  });

  it('it should call setConfirmModal', async () => {
    const { getByTestId } = render(
      <SelectedTEAMFolder {...props} selectedTEAMFolder={{ notes: [{ isInSearch: false, id: 1, selected: true }] }} />,
      { notes: { folders: [{}] } },
    );

    fireEvent.click(getByTestId('backdrop-archive'));
    fireEvent.click(getByTestId('backdrop-folder'));
    fireEvent.click(getByTestId('backdrop-delete'));
    fireEvent.click(getByTestId('backdrop-archive-icon'));

    expect(setConfirmTEAMModal).toHaveBeenCalled();

    expect(getByTestId('button-dots')).toBeInTheDocument();
  });
});

import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { renderWithTheme as render } from 'utils/test';
import '@testing-library/jest-dom';
import { fireEvent } from '@testing-library/react';
import SelectedFolder, { FOLDER_WRAPPER } from './SelectedFolder';

describe('Selected folder', () => {
  const setFoldersWithNotes = jest.fn();
  const actionModal = jest.fn();
  const setSelectedFolder = jest.fn();
  const setSelectedNoteToEdit = jest.fn();
  const setSelectedTEAMNoteToEdit = jest.fn();
  const actionTEAMModal = jest.fn();
  const setConfirmTEAMModal = jest.fn();
  const setConfirmModal = jest.fn();

  const selectedNoteId = jest.spyOn(React, 'useRef').mockReturnValueOnce({ current: null });
  const selectedFolderId = jest.spyOn(React, 'useRef').mockReturnValueOnce({ current: null });
  const noteFolderUuid = jest.spyOn(React, 'useRef').mockReturnValueOnce({ current: null });
  const selectedTEAMNoteId = jest.spyOn(React, 'useRef').mockReturnValueOnce({ current: null });
  const noteTEAMFolderUuid = jest.spyOn(React, 'useRef').mockReturnValueOnce({ current: null });

  const props = {
    selectedFolder: { notes: [{ isInSearch: false, id: 1, referenceColleagueUuid: true }] },
    setConfirmModal,
    selectedNoteId,
    actionModal,
    setSelectedFolder,
    foldersWithNotes: [{ notes: [{}] }],
    setFoldersWithNotes,
    selectedFolderId,
    noteFolderUuid,
    setSelectedNoteToEdit,
    isUserArchived: false,
    setSelectedTEAMNoteToEdit,
    selectedTEAMNoteId,
    actionTEAMModal,
    setConfirmTEAMModal,
    noteTEAMFolderUuid,
  };

  it('render selected folder wrapper', async () => {
    const { getByTestId } = render(<SelectedFolder {...props} />, { notes: { folders: [{}] } });

    expect(getByTestId(FOLDER_WRAPPER)).toBeInTheDocument();
  });
  it('it should call setSelectedFolder handler', async () => {
    render(<SelectedFolder {...props} />, { notes: { folders: [{}] } });
    props.setSelectedFolder();
    expect(setSelectedFolder).toHaveBeenCalled();
  });
  it('it should call dots handler', async () => {
    const { getByTestId } = render(<SelectedFolder {...props} />, { notes: { folders: [{}] } });
    const dots = getByTestId('dots');
    fireEvent.click(dots);
    expect(setSelectedFolder).toHaveBeenCalled();
    props.setSelectedTEAMNoteToEdit();
    expect(setSelectedTEAMNoteToEdit).toHaveBeenCalled();
  });
  it('it should call dots buttons', async () => {
    const { getByTestId } = render(
      <SelectedFolder
        {...props}
        selectedFolder={{ notes: [{ isInSearch: false, id: 1, referenceColleagueUuid: true, selected: true }] }}
      />,
      { notes: { folders: [{}] } },
    );

    fireEvent.click(getByTestId('backdrop-archive'));
    fireEvent.click(getByTestId('backdrop-folder'));
    fireEvent.click(getByTestId('backdrop-delete'));
    fireEvent.click(getByTestId('backdrop-archive-icon'));
    fireEvent.click(getByTestId('backdrop-folder-icon'));
    fireEvent.click(getByTestId('backdrop-delete-icon'));

    expect(setConfirmTEAMModal).toHaveBeenCalled();

    expect(getByTestId('button-dots')).toBeInTheDocument();
  });
  it('it should call setConfirmModal', async () => {
    const { getByTestId } = render(
      <SelectedFolder
        {...props}
        selectedFolder={{ notes: [{ isInSearch: false, id: 1, referenceColleagueUuid: false, selected: true }] }}
      />,
      { notes: { folders: [{}] } },
    );

    fireEvent.click(getByTestId('backdrop-archive'));
    fireEvent.click(getByTestId('backdrop-folder'));
    fireEvent.click(getByTestId('backdrop-delete'));
    fireEvent.click(getByTestId('backdrop-archive-icon'));
    fireEvent.click(getByTestId('backdrop-folder-icon'));
    fireEvent.click(getByTestId('backdrop-delete-icon'));

    expect(setConfirmModal).toHaveBeenCalled();

    expect(getByTestId('button-dots')).toBeInTheDocument();
  });
});

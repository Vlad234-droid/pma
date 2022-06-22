import { AllNotesFolderId, AllNotesFolderIdTEAM, filterNotesHandler } from 'utils/note';
import { NotesActions as NotesActionsToDispatch } from '@pma/store';

export const prepareData = (folders, notesSelect, setFoldersWithNotes, notesFolderColleagueData) => {
  if (folders !== null && notesSelect !== null) {
    setFoldersWithNotes(() => notesFolderColleagueData);
  }
};

export const actionsInitialState = {
  folderId: null,
  noteId: null,
  folderUuid: null,
};

export const isActiveSearchBar = (
  searchValueFilterOption,
  archiveMode,
  setArchiveMode,
  setSelectedTEAMFolder,
  setSelectedFolder,
  foldersWithNotes,
  setFoldersWithNotes,
  foldersWithNotesTEAM,
  setFoldersWithNotesTEAM,
  notesSelect,
) => {
  if (searchValueFilterOption.length > 2) {
    if (archiveMode.user) setArchiveMode((prev) => ({ ...prev, user: false }));
    if (archiveMode.team) setArchiveMode((prev) => ({ ...prev, team: false }));

    const obj = filterNotesHandler(
      setSelectedTEAMFolder,
      setSelectedFolder,
      foldersWithNotes,
      setFoldersWithNotes,
      foldersWithNotesTEAM,
      setFoldersWithNotesTEAM,
      notesSelect,
      searchValueFilterOption,
    );

    setSelectedFolder(() => obj);
  }
};

export const submitSelectedNote = (dispatch, data, selectedNoteToEdit, setSelectedFolder) => {
  const { noteTitle, noteText, folder } = data;

  if (selectedNoteToEdit !== null) {
    const payload = {
      ...selectedNoteToEdit,
      title: noteTitle,
      content: noteText,
      ...(folder && {
        folderUuid: folder === AllNotesFolderId ? null : folder,
      }),
    };

    dispatch(NotesActionsToDispatch.updateNote(payload));
    setSelectedFolder(() => null);
  }
};

export const submitTeamSelectedNote = (dispatch, data, selectedTEAMNoteToEdit, setSelectedFolder) => {
  const { noteTitle, noteText, folder } = data;
  if (selectedTEAMNoteToEdit !== null) {
    const payload = {
      ...selectedTEAMNoteToEdit,
      title: noteTitle,
      content: noteText,
      ...(folder && {
        folderUuid: folder === AllNotesFolderIdTEAM ? null : folder,
      }),
    };

    dispatch(NotesActionsToDispatch.updateNote(payload));
    setSelectedFolder(() => null);
  }
};

export const getOptions = (isLineManager: boolean) => {
  return [
    { value: 'PERSONAL_NOTE_CREATE', label: 'Personal note' },
    { value: 'PERSONAL_NOTE_FOLDER_CREATE', label: 'Personal folder' },
    { value: 'TEAM_NOTE_CREATE', label: 'Team note' },
    { value: 'TEAM_NOTE_FOLDER_CREATE', label: 'Team folder' },
  ].slice(0, isLineManager ? 4 : 2);
};

export const updateFolder = (data, id) => {
  if (!data) return data;
  return {
    ...data,
    notes: data.notes.filter((item) => item.id !== id),
  };
};

export const disableFolder = (data) => {
  if (!data) return data;
  return {
    ...data,
    notes: data.notes.map((item) => ({ ...item, selected: false })),
  };
};
